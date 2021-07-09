import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // x:any = 5;
  constructor(private _HttpClient:HttpClient) {}

  register(formData:any):Observable<any>
  {
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/sign-up',formData);
  }


  // signIn(data:any):Observable<any>
  // {
  //   return this._HttpClient.post(this.baseURL+'signin',data);
  // }

}
