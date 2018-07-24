import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import {Observable, of} from 'rxjs';

@Injectable()
export class Http extends HttpClient {

  constructor(handler: HttpHandler, private toastr: ToastrService) {
    super(handler);
  }

  static getBaseUrl() {
    return window.location.origin;
  }

  static getFullUrl(url: string): string {
    return Http.getBaseUrl() + url;
  }

  static requestOptions(options?) {
    if (options == null) {
      options = {
        headers: new HttpHeaders()
      };
    }
    if (options.headers == null) {
      options.headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
    return options;
  }

  getCall(url: string, showToast?: boolean, toastMessage?: string, options?): Observable<any> {
    this.beforeRequest();
    return super.get(Http.getFullUrl(url), Http.requestOptions(options))
      .pipe(
        tap(res => {
          if (showToast) {
            this.onSuccess(toastMessage);
          }
        }),
        catchError(this.handleError(-1))
      );
  }

  postCall(url: string, body, showToast?: boolean, toastMessage?: string, options?): Observable<any> {
    this.beforeRequest();
    return super.post(Http.getFullUrl(url), body, Http.requestOptions(options))
      .pipe(
        tap(res => {
          if (showToast) {
            this.onSuccess(toastMessage);
          }
        }),
        catchError(this.handleError(-1))
      );
  }

  putCall(url: string, body, showToast?: boolean, toastMessage?: string, options?): Observable<any> {
    this.beforeRequest();
    return super.put(Http.getFullUrl(url), body, Http.requestOptions(options))
      .pipe(
        tap(res => {
          if (showToast) {
            this.onSuccess(toastMessage);
          }
        }),
        catchError(this.handleError(-1))
      );
  }

  deleteCall(url: string, showToast?: boolean, toastMessage?: string, options?): Observable<any> {
    this.beforeRequest();
    return super.delete(Http.getFullUrl(url), Http.requestOptions(options))
      .pipe(
        tap(res => {
          if (showToast) {
            this.onSuccess(toastMessage);
          }
        }),
        catchError(this.handleError(-1))
      );
  }

  private onSuccess(toastMessage: string): void {
    this.toastr.success(toastMessage, 'انجام شد');
  }

  private onFinally(): void {
    this.afterRequest();
  }

  private beforeRequest(): void {
  }

  private afterRequest(): void {
  }

  private handleError<T>(result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      if (error != null) {
        if (error.status === 504) {
          this.toastr.error('سرور در دسترس نیست', 'خطا');
        } else {
          this.toastr.error(error.error.message, 'خطا');
          console.log(error.status);
        }
      } else {
        this.toastr.error('خطای ناشناخته‌ای رخ داده‌است', 'خطا');
      }
      return of(result as T);
    };
  }
}
