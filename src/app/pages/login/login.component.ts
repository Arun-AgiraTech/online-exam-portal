import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  logindata = {
    username: '',
    password: '',
  };

  constructor(private snack: MatSnackBar,private login:LoginService,private router:Router) {}

  ngOnInit(): void {}

  formSubmit() {
    console.log('login btn clicked');
    if (
      this.logindata.username.trim() == '' ||
      this.logindata.username == null
    ) {
      this.snack.open('username is required!!', 'ok', {
        duration: 3000,
      });
      return;
    }
    if(this.logindata.password.trim()==''||
    this.logindata.password==null){
      this.snack.open('password is required!!','ok',{
        duration : 3000,
      });
      return;
    }
    //request to server to generate token
    this.login.generateToken(this.logindata).subscribe({
      next : (data : any) =>{
        Swal.fire('welcome ! '+this.logindata.username,'success');
        console.log('success');
        console.log(data);
        //login..

        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
          {
            next : (user : any) => {
              this.login.setUser(user);
              console.log(user);
              //redirect : ..ADMIN : admin-dashboard
              if(this.login.getUserRole() == 'ADMIN'){
                //admin dashboard
                //window.location.href='/admin';
                this.router.navigate(['admin'])
                this.login.loginStatusSubject.next(true);
              }else if(this.login.getUserRole() == 'NORMAL'){
                //redirect : ..NORMAL : normal-dashboard
                //window.location.href='/user-dashboard';
                this.router.navigate(['user-dashboard/0'])
                this.login.loginStatusSubject.next(true);
              }else{
                this.login.logout();
              }
            }
          }
        );
      },
      error: (e:any) => {
        console.error(e);
        console.log(e);
        this.snack.open('Invalid details!! try again','ok',{
          duration : 3000
        })
    }
  });
}
}
