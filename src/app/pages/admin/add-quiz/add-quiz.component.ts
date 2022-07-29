import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css'],
})
export class AddQuizComponent implements OnInit {
  categories: any;

  quizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
    },
  };

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._cat.categories().subscribe(
      (data: any) => {
        //categories load
        this.categories = data;
        // console.log(this.categories);
      },

      (error: any) => {
        console.log(error);
        Swal.fire('Error!!', 'error in loading data from server', 'error');
      }
    );
  }
  //
  addQuiz() {
    if (this.quizData.title.trim() == '' || this.quizData.title == null) {
      this._snack.open('Title Required !!', '', {
        duration: 3000,
      });
      return;
    }

    //validation...

    //call server
    this._quiz.addQuiz(this.quizData).subscribe(
      (data: any) => {
        Swal.fire('Success', 'quiz is added', 'success').then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/admin/quizzes');
          }
        });
        this.quizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: {
            cid: '',
          },
        };
      },

      (error: any) => {
        console.log(error.error);
        if (error.error['title'] != null) {
          this._snack.open(error.error['title'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
        if (error.error['maxMarks'] != null) {
          this._snack.open(error.error['maxMarks'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
        if (error.error['numberOfQuestions'] != null) {
          this._snack.open(error.error['numberOfQuestions'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
      }
    );
  }
}
