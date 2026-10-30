import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const candidateId = sessionStorage.getItem('candidateId');

  if (candidateId) {
    req = req.clone({
      setHeaders: {
        'Candidate-Id': candidateId
      }
    });
  }

  return next(req);
};