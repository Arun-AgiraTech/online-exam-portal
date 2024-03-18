import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit {
  categories : any=[]
  quizData : any = {
    title : '',
    description : '',
    maxMarks : '',
    numberOfQuestions : '',
    active : true,
    category : {
      cid : '',
    },
  }
  constructor(private _cat:CategoryService,private _snack:MatSnackBar,private _quiz : QuizService){}
  ngOnInit(): void {
    this._cat.categories().subscribe({
      next : (data : any) => {
        //categories load
        this.categories = data;
        console.log(this.categories);
      },
      error : (e) =>{
        console.log(e)
        Swal.fire('Error!!','error in loading data from server','error')
      }
    })
  }
  //
  addQuiz(){
    console.log(this.quizData);
    if(this.quizData.title.trim()==''||this.quizData.title == null){
      this._snack.open('Title Required !!','',{
        duration : 3000,
      });
      return;
    }
    //validation ...

    //call server
    this._quiz.addQuiz(this.quizData).subscribe({
      next : (data : any) => {
        Swal.fire('Success','quiz is added','success');
        this.quizData = {
          title : '',
          description : '',
          maxMarks : '',
          noOfQuestions : '',
          active : true,
          category : {
            cid : '',
          },
        }
      },
      error(e){
        Swal.fire('Error !!','Error While Adding quiz','error')
        console.log(e);
      }
    })
  }

}
