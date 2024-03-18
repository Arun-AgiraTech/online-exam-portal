import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css',
})
export class ViewQuizzesComponent implements OnInit {

  quizzes: any = [];
  qid: any;

  constructor(private _quiz: QuizService) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe({
      next: (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      error:(e)=> {
        console.log(e);
        Swal.fire('Error!!','Error in loading data !','error')
      },
    });
  }
  //delete quiz
  deleteQuiz(qid:any) {
    Swal.fire({
      icon : 'warning',
      title : 'Are you sure ?',
      confirmButtonText : 'Delete',
      showCancelButton : true,
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qid).subscribe({
          next : (data : any) => {
            this.quizzes = this.quizzes.filter((quiz : any)=>quiz.qid!=qid);
            Swal.fire('Success','quiz deleted successfully','success');
          },
          error : (e) =>{
            Swal.fire('Error','Error in deleting quiz','error');
          }
        })
      }
    });
    }
}
