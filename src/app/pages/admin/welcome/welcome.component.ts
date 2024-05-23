import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  constructor (private _login : LoginService) {}
  user : any;
  ngOnInit(): void {
    this.user = this._login.getUser();
  }
  
}
