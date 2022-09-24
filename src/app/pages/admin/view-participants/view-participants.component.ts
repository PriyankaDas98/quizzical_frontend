import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-participants',
  templateUrl: './view-participants.component.html',
  styleUrls: ['./view-participants.component.css'],
})
export class ViewParticipantsComponent implements OnInit {
  result: any;
  qid: any;

  constructor(
    private quiz: QuizServiceService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];
    this.quiz.getUsersByQuiz(this.qid).subscribe(
      (data: any) => {
        //css
        this.result = data;
      },

      (error) => {
        //
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }
}
