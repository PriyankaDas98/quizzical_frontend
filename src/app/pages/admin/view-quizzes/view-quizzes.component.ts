import { Component, OnInit } from '@angular/core';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [
    {
      qid: '',
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: '',
    },
  ];
  constructor(private _quiz: QuizServiceService) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Something Went Wrong');
      }
    );
  }
  deleteQuiz_(qid: any) {
    //asking admin that he is sure to delete quiz
    Swal.fire({
      icon: 'question',
      title: 'Are You Sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(qid).subscribe(
          (success) => {
            //filter quiz which is deleted,and quizzes is there in quizzzes already
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qid);
            Swal.fire('Success', 'Quiz Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Something Went Wrong', 'error');
          }
        );
      }
    });
  }
}
