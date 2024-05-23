import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  categories: any;
  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this._cat.categories().subscribe({
      next: (data: any) => {
        this.categories = data;
      },
      error: (e) => {
        this._snack.open('Error in loading categories from server', '', {
          duration: 3000,
        });
        // this._toastr.error('Error in loading categories from server','Error')
      },
    });
  }
}
