import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };
  ngOnInit(): void {}
  formSubmit() {
    console.log(this.user);
    // if(this.user.username == '' || this.user.username == null){
    //   //alert('user is required !!');
    //   this._snackBar.open('username is required !!',"ok",{
    //     duration:3000,
    //     verticalPosition:'top',
    //     horizontalPosition:'right'
    //   });
    //   return;
    // }
    if (this.validation()) {
      //addUser: userservice
      this.userService.addUser(this.user).subscribe({
        next: (data: any) => {
          //console.log(this.user);alert("Registered Successfully!")
          Swal.fire('Success !', 'user id is : ' + data.id, 'success');
        },
        error: (e: any) => {
          console.error(e);
          this._snackBar.open(
            'User Already Exists in DB !! Try With Another one',
            'ok',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  validation(): boolean {
    if (!this.user.username || !/^[a-zA-Z0-9]+$/.test(this.user.username)) {
      this._snackBar.open(
        'Username is required and must contain only letters and numbers!',
        'OK',
        {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        }
      );
      return false;
    }

    if (
      !this.user.password ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        this.user.password
      )
    ) {
      this._snackBar.open(
        'Password is required and must be at least 8 characters long, containing at least one lowercase letter, one uppercase letter, one number, and one special character!',
        'OK',
        {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        }
      );
      return false;
    }

    if (!this.user.firstName || !/^[a-zA-Z]+$/.test(this.user.firstName)) {
      this._snackBar.open(
        'First Name is required and must contain only letters!',
        'OK',
        {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        }
      );
      return false;
    }

    if (!this.user.lastName || !/^[a-zA-Z]+$/.test(this.user.lastName)) {
      this._snackBar.open(
        'Last Name is required and must contain only letters!',
        'OK',
        {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
        }
      );
      return false;
    }

    if (!this.user.email || !/^\S+@\S+\.\S+$/.test(this.user.email)) {
      this._snackBar.open('Valid Email is required!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return false;
    }

    if (this.user.phone && !/^[0-9]+$/.test(this.user.phone)) {
      this._snackBar.open('Phone must contain only numbers!', 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
      });
      return false;
    }

    return true; // If all validations pass
  }
}
