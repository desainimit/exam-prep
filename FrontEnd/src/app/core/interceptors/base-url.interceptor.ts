import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject, InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

export const BaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = inject(API_URL);

  const haveToAppendApiUrl = (url: string) =>
    !(apiUrl && url.startsWith(apiUrl));

  const prependBaseUrl = (url: string) => {
    const cleanUrl = url.replace(/^\.?\//, '');
    return `${apiUrl?.replace(/\/$/, '')}/${cleanUrl}`;
  };

  const headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  if (haveToAppendApiUrl(req.url)) {
    const modifiedReq = req.clone({
      url: prependBaseUrl(req.url),
      headers: headers,
    });

    return next(modifiedReq);
  }
  return next(req);
};
