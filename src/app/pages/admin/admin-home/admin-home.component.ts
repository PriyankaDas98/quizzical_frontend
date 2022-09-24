import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { QuizServiceService } from 'src/app/services/quiz-service.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  user: any;
  quizzes: any;
  categories: any;

  constructor(
    private userService: UserService,
    private _quiz: QuizServiceService,
    private _category: CategoryService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.user = data;

      (error: any) => alert('Error getting user data!!');
    });

    this._quiz.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        console.log(error);
        Swal.fire('Error!!', 'Something Went Wrong');
      }
    );

    this._category.categories().subscribe(
      (data: any) => {
        //css
        this.categories = data;
        console.log(this.categories);
      },

      (error) => {
        //
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }
}
