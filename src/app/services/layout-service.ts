import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidatePayload } from '../Models/candidate-payload';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private apiUrl = 'http://localhost:5207/api';
  /**
   *
   */
  constructor(private http: HttpClient) {}

  getLayoutById(id: number): Observable<LayoutResponse> {
    return this.http.get<LayoutResponse>(`${this.apiUrl}/layout/${id}`);
  }

  deleteFile(fileUrl: string) {
    return this.http.post(`${this.apiUrl}/Candidate/delete-file`, {
      fileUrl: fileUrl,
    });
  }

  uploadFile(formData: FormData) {
    return this.http.post(`${this.apiUrl}/Candidate/upload`, formData);
  }

  submitCandidate(payload: CandidatePayload) {
    return this.http.post(`${this.apiUrl}/Candidate/submit`, payload);
  }

  loginCandidate(data: any) {
    return this.http.post(`${this.apiUrl}/Candidate/login`, data);
  }
}
