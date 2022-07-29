import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;

  // qid: any;
  // qTitle: any;
  // question = {
  //   quiz: {},
  //   content: '',
  //   option1: '',
  //   option2: '',
  //   option3: '',
  //   option4: '',
  //   answer: '',
  // };

  // constructor(
  //   private _route: ActivatedRoute,
  //   private _question: QuestionService
  // ) {}

  // ngOnInit(): void {
  //   this.qid = this._route.snapshot.params['qid'];
  //   this.qTitle = this._route.snapshot.params['title'];
  //   this._question.quiz = this.qid;
  // }

  // formSubmit() {
  //   if (this.question.content.trim() == '' || this.question.content == null) {
  //     return;
  //   }

  //   if (this.question.option1.trim() == '' || this.question.option1 == null) {
  //     return;
  //   }
  //   if (this.question.option2.trim() == '' || this.question.option2 == null) {
  //     return;
  //   }
  //   if (this.question.answer.trim() == '' || this.question.answer == null) {
  //     return;
  //   }

  //   //form submit
  //   this._question.addQuestion(this.question).subscribe(
  //     (data: any) => {

  //       Swal.fire('Success ', 'Question Added. Add Another one', 'success');
  //       this.question.content = '';
  //       this.question.option1 = '';
  //       this.question.option2 = '';
  //       this.question.option3 = '';
  //       this.question.option4 = '';
  //       this.question.answer = '';
  //     },
  //     (error) => {
  //       Swal.fire('Error', 'Error in adding question', 'error');
  //     }
  //   );
  // }
  qId: any;
  qTitle: any;
  //to hold question recieved from form
  question = {
    quiz: {
      qid: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: '',
  };
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    //here is bracket qid used is from backend variable qid in quiz
    //this is assigning value to qid in quiz
    this.question.quiz['qid'] = this.qId;
  }
  formSubmit() {
    if (this.question.content.trim() == '' || this.question.content == null) {
      Swal.fire('Missing', 'Content Required', 'info');
      return;
    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() == '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() == '' || this.question.answer == null) {
      return;
    }
    this._question.addQuestion(this.question).subscribe(
      (success) => {
        Swal.fire('Successfull', 'Question Added', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/admin/quizzes');
          }
        });
        this.question = {
          quiz: {
            qid: '',
          },
          content: '',
          option1: '',
          option2: '',
          option3: '',
          option4: '',
          answer: '',
        };
      },
      (error) => {
        Swal.fire('UnsuccessFull', 'Something Went Wrong', 'error');
      }
    );
  }
}
