import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  placeHolder!: string;
  quesId : any;
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
    private _question:QuestionService,
    private _router:Router,
    private _location:LocationStrategy
  ){}
  ngOnInit(): void {
    this.qId =  this._route.snapshot.params['qid'];
    // console.log(this.qId);
    this.qTitle = this._route.snapshot.params['title']
    this.quesId =  this._route.snapshot.params['quesid'];
    console.log(this.quesId);
    this.loadQuestion();
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
    this._question.updateQuestion(this.question).subscribe({
      next:(data : any) =>{
        Swal.fire('Success','Question Updated','success');
        // this._router.navigate([`/view-questions/${this.qId}/${this.qTitle}`]);
        this._location.back()
      },
      error : (e)=>{
        console.log(e);
        Swal.fire('Error','Error in Updating question','error');
      }
    })
    }
    loadQuestion() {
      this._question.getSingleQuestion(this.quesId).subscribe({
        next : (data : any) => {
          this.question = data;
        },
        error : (e) => {
          Swal.fire('Error','Error getting question from server','error')
        }
      })
    }


}

