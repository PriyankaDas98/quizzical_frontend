import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  constructor(
    private snake: MatSnackBar,
    private login: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  formSubmit() {
    console.log('login done');
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snake.open('Username Required', 'Cancel', { duration: 2000 });
      return;
    } else if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snake.open('Password Required', 'Cancel', { duration: 2000 });
      return;
    }
    this.login.generateToken(this.loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login...
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect if admin
          //redirect if normal
          if (this.login.getUserRole() == 'ADMIN') {
            //adimin dashboard
            // window.location.href="/admin"

            this.router.navigate(['/admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            console.log('normal');
            //normal user
            // window.location.href="/user-dashboard"

            this.login.loginStatusSubject.next(true);
            this.router.navigate(['user-dashboard/0']);
            // this.router.navigate(['/signup']);
            // this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error: any) => {
        console.log('error');
        console.log(error);
        this.snake.open('Invalid Details', 'Cancel', { duration: 2000 });
      }
    );
  }
}
