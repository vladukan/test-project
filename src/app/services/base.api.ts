import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class BaseApi {

  private BaseUrl = environment.api;

  constructor(
    public http: HttpClient,
  ) {}

  private getUrl(url: string = ''): string {
    return this.BaseUrl + url;
  }

  public get(url: string = ''): Observable<any>{
    return this.http.get(this.getUrl(url));
  }
  public getURL(url: string = ''): Observable<any>{
    return this.http.get(url);
  }

}
