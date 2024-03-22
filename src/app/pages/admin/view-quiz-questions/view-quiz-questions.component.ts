import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId:any;
  qTitle:any;
  questions:any= [];
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService,
    private _snack : MatSnackBar 
  ){}
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
   this.qTitle = this._route.snapshot.params['title'];
   console.log(this.qId);
   console.log(this.qTitle);
   this._question.getQuestionsOfQuiz(this.qId).subscribe({
    next : (data:any) =>{
      this.questions = data;
    },
    error : (e) => {
      console.log(e);
    }
   });
  }

  //delete question 
  deleteQuestion(qid:number){
    // alert(qid);
    Swal.fire({
      icon:'warning',
      showCancelButton:true,
      confirmButtonText:'Delete',
      title:'Are you sure , want to delete this question?'
    }).then((result:any)=>{
      // alert('testing')
      if(result.isConfirmed)
      {
        //confirmed
        this._question.deleteQuestion(qid).subscribe({
          next : (data:any)=>{
            this._snack.open('question Deleted ','',{
              duration : 3000
            });
            this.questions = this.questions.filter((q:any)=>q.quesId!=qid)
          },
          error : (e) =>{
            console.log(e)
            this._snack.open('Error in deleting questions','',{
              duration : 3000
            })
          }
        })
      }
    })
  }

}
