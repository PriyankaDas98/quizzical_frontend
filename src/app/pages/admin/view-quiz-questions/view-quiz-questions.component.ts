import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css'],
})
export class ViewQuizQuestionsComponent implements OnInit {
  qId: any;
  qTitle: any;
  questions = [
    {
      quesId: '',
      content: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _snake: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    //fetch Questions
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        // console.log(data);
      },
      (error) => {
        Swal.fire('Error', 'Something Went Wrong', 'error');
        console.log(error);
      }
    );
  }
  deleteQuestion(qid: any) {
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure?',
    }).then((e) => {
      if (e.isConfirmed) {
        this._question.deleteQuestion(qid).subscribe(
          (success) => {
            this._snake.open('Question Deleted Successfully', 'Cancel', {
              duration: 2000,
            });
            this.questions = this.questions.filter((q) => q.quesId != qid);
          },
          (error) => {
            Swal.fire('Error', 'Something Went Wrong', 'error');
          }
        );
      }
    });
  }
}
