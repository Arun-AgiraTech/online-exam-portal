import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit {
  catId : any;
  quizzes : any;
  constructor(
    private _route : ActivatedRoute,
    private _quiz : QuizService,
    private _snack : MatSnackBar
  ){}
  ngOnInit(): void {
    this._route.params.subscribe({
      next : (params : any) => {
        this.catId = params.catId;
        console.log(params);
        // console.log(this.catId);
    if(this.catId==0){
      console.log('load all the quiz');
      this._quiz.getActiveQuizzes().subscribe({
        next : (data:any) => {
          this.quizzes = data;
        },
        error : (e) => {
          console.log(e);
          this._snack.open('Error in loading all the quizzes','ok');
        }
      })
    }else{
      console.log('load specific quiz');

      this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe({
        next : (data : any) => {
          this.quizzes=data;
        },
         error : (e) => {
          alert('error in loading quiz data ')
         }
      })
    }
      } ,
      error : (e) => {
        alert('error')
      }
    })
    
  }

}
