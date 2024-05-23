import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLoggedIn = false;
  user : any = null;
  userRole : string ='';
  constructor(public login:LoginService,private _toastr : ToastrService){}

  ngOnInit(): void{
    // this.isLoggedIn = this.login.isLoggedIn();
    // this.user = this.login.getUser();
    // this.userRole = this.login.getUserRole();
    // console.log(this.userRole);
    this.login.loginStatusSubject.asObservable().subscribe({
      next : (data:any)=>{
        this.isLoggedIn = this.login.isLoggedIn();
        this.user = this.login.getUser();
        this.userRole = this.login.getUserRole();

      }
      // ,
      // error : (e) =>{

      // }

    })
  }

  public logout(){
    this.login.logout();
    //window.location.reload();
    this._toastr.info("Logged Out");
    this.login.loginStatusSubject.next(false);
  }
}
