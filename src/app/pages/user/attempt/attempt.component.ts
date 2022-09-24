import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-attempt',
  templateUrl: './attempt.component.html',
  styleUrls: ['./attempt.component.css'],
})
export class AttemptComponent implements OnInit {
  userId: any;
  result: any;
  quiz: any;
  category: any;

  constructor(
    private user: UserService,

    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this._route.snapshot.params['userId'];
    console.log(this.userId);
    this.user.getResult(this.userId).subscribe(
      (data: any) => {
        this.result = data;
        // this.category = data.
        console.log(this.result[0]['quiz']['category'].title);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
