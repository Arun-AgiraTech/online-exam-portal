import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  constructor(private userService:UserService,private _snackBar:MatSnackBar) {}
  public user = {
    username : '',
    password : '',
    firstName : '',
    lastName : '',
    email : '',
    phone : '',
  };
  ngOnInit(): void{}
  formSubmit(){
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null){
      //alert('user is required !!');
      this._snackBar.open('username is required !!',"ok",{
        duration:3000,
        verticalPosition:'top',
        horizontalPosition:'right'
      });
      return;
    }
  //addUser: userservice
  this.userService.addUser(this.user).subscribe({
    next: (data:any) => {
      //console.log(this.user);alert("Registered Successfully!")
      Swal.fire('Success !','user id is : '+data.id,'success')
    },
    error: (e:any) => {
      console.error(e);
      this._snackBar.open('User Already Exists in DB !! Try With Another one','ok',{
        duration : 3000
      })
    }
  }
  )

}

}