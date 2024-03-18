import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLoggedIn = false;
  user : any = null;
  constructor(public login:LoginService){}

  ngOnInit(): void{
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();
    this.login.loginStatusSubject.asObservable().subscribe({
      next : (data:any)=>{
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
      }
      // ,
      // error : (e) =>{

      // }

    })
  }

  public logout(){
    this.login.logout();
    //window.location.reload();
    this.login.loginStatusSubject.next(false);
  }
}
