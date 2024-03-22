import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { QuestionService } from '../../../services/question.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css'
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  placeHolder : string = "Question content"
  qId : any;
  qTitle : any;
  question : any = {
    quiz : {

    },
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:''
  };
  constructor(
    private _route:ActivatedRoute,
    private _question:QuestionService
  ){}
  ngOnInit(): void {

    this.qId =  this._route.snapshot.params['qid'];
    // console.log(this.qId);
    this.qTitle = this._route.snapshot.params['title']
    this.question.quiz['qid'] = this.qId;
  }
  formSubmit() {
    console.log(this.question);
    if(this.question.content.trim()==''||this.question.content==null){
      return;
    }

    if(this.question.option1.trim()==''||this.question.option1==null){
      return;
    }
    if(this.question.option2.trim()==''||this.question.option2==null){
      return;
    }
    if(this.question.answer.trim()==''||this.question.answer==null){
      return;
    }
    //form submit
    this._question.addQuestion(this.question).subscribe({
      next:(data : any) =>{
        Swal.fire('Success','Question added','success');
        this.question.content='';
        this.question.option1='';
        this.question.option2='';
        this.question.option3='';
        this.question.option4='';
        this.question.answer='';
      },
      error : (e)=>{
        console.log(e);
        Swal.fire('Error','Error in adding question','error');
      }
    })
    }

}
