import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout-service';
import { CandidatePayload } from '../Models/candidate-payload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-portal',
  standalone: false,
  templateUrl: './my-portal.html',
  styleUrls: ['./my-portal.css'],
})
export class MyPortal implements OnInit {
  layout: any[] = [];
  formName: string = '';

  constructor(
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    private router:Router
  ) {}

  ngOnInit() {
    this.getLayout();
  }

  getLayout() {
    this.layoutService.getLayoutById(3).subscribe({
      next: (res) => {
        this.formName = res.layoutName;

        // Try both cases
        this.layout =
          typeof res.layoutJson === 'string' ? JSON.parse(res.layoutJson) : res.layoutJson;
        this.cdr.detectChanges();
        console.log('Layout:', this.layout);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  formData: any = {};

  // CONDITIONAL DISPLAY
  shouldShowField(field: any) {
    if (!field.conditionField) return true;

    const value = this.formData[field.conditionField];

    if (field.conditionType === 'multiple') {
      if (Array.isArray(value)) {
        return field.conditionValues?.some((v: any) => value.includes(v));
      }
      return field.conditionValues?.includes(value);
    }

    if (Array.isArray(value)) {
      return value.includes(field.conditionValue);
    }

    if (typeof value === 'boolean') {
      return value === field.conditionValue;
    }

    return value == field.conditionValue;
  }

  onCheckboxChange(fieldId: any, value: any, event: any) {
    if (!this.formData[fieldId]) this.formData[fieldId] = [];

    if (event.target.checked) {
      this.formData[fieldId].push(value);
    } else {
      this.formData[fieldId] = this.formData[fieldId].filter((x: any) => x !== value);
    }
  }

  onFileChange(event: any, fieldId: any) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);

    this.layoutService.uploadFile(formData).subscribe((res: any) => {
      this.formData[fieldId] = res.fileUrl; // preview will show automatically
    });
  }

  onMultipleFileChange(event: any, fieldId: any) {
    const files = event.target.files;

    if (!this.formData[fieldId]) {
      this.formData[fieldId] = [];
    }

    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);

      this.layoutService.uploadFile(formData).subscribe((res: any) => {
        this.formData[fieldId].push(res.fileUrl);
      });
    }
  }

  deleteImage(fieldId: any, index: number, url: string) {
    // remove from UI
    this.formData[fieldId].splice(index, 1);

    // call API to delete file
    this.layoutService.deleteFile(url).subscribe();
  }

  validateForm() {
    for (let section of this.layout) {
      for (let field of section.fields) {
        if (!this.shouldShowField(field)) continue;

        const value = this.formData[field.id];

        if (field.required && (value === null || value === undefined || value === '')) {
          alert(field.label + ' is required');
          return false;
        }

        if (field.minLength && value?.length < field.minLength) {
          alert(field.label + ' min length ' + field.minLength);
          return false;
        }

        if (field.maxLength && value?.length > field.maxLength) {
          alert(field.label + ' max length ' + field.maxLength);
          return false;
        }

        if (field.regex) {
          const reg = new RegExp(field.regex);
          if (!reg.test(value)) {
            alert(field.label + ' invalid format');
            return false;
          }
        }
      }
    }
    return true;
  }

  submitForm() {
    if (!this.validateForm()) return;

    const payload: CandidatePayload = {
      fields: [] as { fieldId: string; value: any }[],
    };

    for (let key in this.formData) {
      let value = this.formData[key];

      if (value === undefined || value === null) continue;

      if (Array.isArray(value)) {
        value = JSON.stringify(value);
      }

      if (value instanceof File) {
        continue;
      }

      payload.fields.push({
        fieldId: key, // includes name, email, and dynamic ids
        value: value,
      });
    }

    this.layoutService.submitCandidate(payload).subscribe({
      next: () => {
        alert('Form Submitted Successfully');

        this.router.navigate(['/candidate-print'], {
          state: {
            layout: this.layout,
            formData: this.formData,
          },
        });

        this.formData = {};
        this.resetForm();
      },
      error: (err) => {
        console.error('Submit error:', err);
      },
    });
  }

  getValueByLabel(label: string) {
    for (let section of this.layout) {
      for (let field of section.fields) {
        if (field.label === label) {
          return this.formData[field.id];
        }
      }
    }
    return null;
  }

  fileInputs: { [key: string]: any } = {};

  resetForm() {
    for (let section of this.layout) {
      for (let field of section.fields) {
        const key = field.id;

        switch (field.type) {
          case 'checkbox':
            this.formData[key] = false;
            break;

          case 'checkboxList':
            this.formData[key] = [];
            break;

          case 'image':
          case 'file':
            this.formData[key] = null;

            if (this.fileInputs[key]) {
              this.fileInputs[key].value = '';
            }
            break;

          default:
            this.formData[key] = '';
            break;
        }
      }
    }
  }
}
