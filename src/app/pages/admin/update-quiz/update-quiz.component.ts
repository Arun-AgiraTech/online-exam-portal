import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css',
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _cat: CategoryService
  ) {}

  qid = 0;
  quiz: any ;
  categories: any;

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    //alert(this.qid)
    this._quiz.getQuiz(this.qid).subscribe({
      next: (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      error: (e) => {
        console.log(e);
      },
    });
    this._cat.categories().subscribe({
      next : (data:any) => {
        this.categories = data;
      },
      error : (e) => {
        alert('error in loading categories')
      }
    });
  }
  //update form submit 
  public updateData(){
    //Validate data

  this._quiz.updateQuiz(this.quiz).subscribe({
    next: (data:any) =>{
      Swal.fire('Success !!','quiz updated','success');
    },
    error : (e) => {
      Swal.fire('Error','error in updating quiz','error');
      console.log(e);
    }
  })
  }
}
