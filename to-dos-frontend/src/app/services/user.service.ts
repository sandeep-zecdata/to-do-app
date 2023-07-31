import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../global';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }


  userSignup(data:any){
   
    return this.httpclient.post<any[]>(`${GlobalConstants.CONNECT_BASE_URL_LOCAL}/user_signup`,data);
  }

  userLogin(data:any){
    return this.httpclient.post<any>(`${GlobalConstants.CONNECT_BASE_URL_LOCAL}/user_login`,data);
  }

}
