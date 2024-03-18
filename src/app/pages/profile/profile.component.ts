import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user : any = null;
  constructor(private login:LoginService,private snack:MatSnackBar) {}

  ngOnInit(): void {
    this.user=this.login.getUser();
    // this.login.getCurrentUser().subscribe({
    //   next : (user:any) =>{
    //     this.user=user;
    //   },
    //     error : (e:any) =>{
    //       this.snack.open('error','ok',{
    //         duration:3000
    //       })
    //     }
    // })
  }
}
