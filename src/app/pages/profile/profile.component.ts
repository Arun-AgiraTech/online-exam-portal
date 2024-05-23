import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCropperComponent } from '../../components/image-cropper/image-cropper.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  file: string = '';
  dialog: any;
  onFileChange(event: any) {
    const files = event.target.files as FileList;

    if (files.length > 0) {
      const _file = URL.createObjectURL(files[0]);
      this.resetInput();
      this.openAvatarEditor(_file)
       .subscribe(
         (result) => {
           if(result){
             this.file = result;
           }
         }
       )
    }

  }

 openAvatarEditor(image: string): Observable<any> {
    const dialogRef = this.dialog.open(ImageCropperComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: image,
    });

    return dialogRef.afterClosed();
  }
  resetInput() {
    const input = document.getElementById('avatar-input-file') as HTMLInputElement;
    if(input){
      input.value = "";
    }
  }
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
