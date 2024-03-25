import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent implements OnInit {

  qid: any;
  questions: any;
  marksGot: any = 0;
  correctAnswers: any = 0;
  attempted: any = 0;
  isSubmit: boolean = false;
  timer: any;
  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}
  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe({
      next: (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;

        console.log(this.questions);
        this.startTimer();
      },
      error: (e) => {
        console.log(e);
        Swal.fire('Error', 'Error in loading questions of quiz', 'error');
      },
    });
  }
  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'warning',
    }).then((e) => {
      if (e.isConfirmed) {
        //calculation
        this.evalQuiz();
      }
    });
  }
  //timer implimentation
  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
        console.log(this.timer);
      } else {
        this.timer--;
      }
    }, 1000);
  }
  getFormattedTime() {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
   evalQuiz() 
   { 
    // call to server 
    this._question.evalQuiz(this.questions).subscribe({
      next : (data : any) => {
        console.log(data);
        this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
        this.correctAnswers = data.correctAnswers;
        this.attempted = data.attempted;
        this.isSubmit = true;
      },
      error : (e)=>{
        console.log(e);
      }
    })
  //   this.isSubmit = true;
  //         this.questions.forEach((q: any) => {
  //           if (q.givenAnswer == q.answer) {
  //             this.correctAnswers++;
  //             let marksSingle =
  //               this.questions[0].quiz.maxMarks / this.questions.length;
  //             this.marksGot += marksSingle;
  //           }
  //           if (q.givenAnswer && q.givenAnswer.trim() != '') {
  //             this.attempted++;
  //           }
  //         });
  //         console.log('Correct Answers : ' + this.correctAnswers);
  //         console.log('Marks got : ' + this.marksGot);
  //         console.log('Attempted : ' + this.attempted);
  }
  printPage() {
    window.print(); 
  }
}


