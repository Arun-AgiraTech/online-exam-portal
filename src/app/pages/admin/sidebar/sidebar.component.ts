import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  constructor(private _login:LoginService,private _toastr:ToastrService){}
logout() {
  this._login.logout();
  this._toastr.info("Logged Out");
}
  ngOnInit(): void {

  }
}
