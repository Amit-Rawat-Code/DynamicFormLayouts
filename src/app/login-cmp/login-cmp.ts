import { Component } from '@angular/core';
import { LayoutService } from '../services/layout-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-cmp',
  standalone: false,
  templateUrl: './login-cmp.html',
  styleUrl: './login-cmp.css',
})
export class LoginCmp {
  loginData = {
  name: '',
  email: ''
};

constructor(private layoutService: LayoutService, private router: Router) {}

login() {
  this.layoutService.loginCandidate(this.loginData).subscribe({
    next: (res: any) => {

      alert('Login Successful');

      sessionStorage.setItem('candidateId', res.candidateId);

      this.router.navigate(['/load-form']);

    },
    error: (err) => {
      alert(err.error);
    }
  });
}
}
