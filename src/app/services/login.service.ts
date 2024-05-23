import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //getting current user from backend
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token from backend
  public generateToken(logindata:any){
    return this.http.post(`${baseUrl}/generate-token`,logindata);
  }

  //login user : set token in local storage
  public loginUser(token:any){
    sessionStorage.setItem('token',token);
  }

  //isLogin: user  is logged in or not
  public isLoggedIn(){
    let tokenStr = sessionStorage.getItem('token');
    if(tokenStr==undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }
  //logout : remove token from local storage 
  public logout(){
    //if(this.isLoggedIn()){
     sessionStorage.removeItem('token');
     sessionStorage.removeItem('user');
    return true;
  }

  //get token 
  public getToken(){
    return sessionStorage.getItem('token');
  }

  //set userDetail
  public setUser(user : any){
    sessionStorage.setItem('user',JSON.stringify(user));
  }

  //getUser
  public getUser(){
    console.log(sessionStorage);
    let userStr = sessionStorage.getItem('user');
    if(userStr!=null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
