import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css'],
})
export class UsernavComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  curuser = null;
  userId = null;
  constructor(public login: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.login.isLoggedIn();
    this.user = this.login.getUser();

    this.login.loginStatusSubject.asObservable().subscribe((data: any) => {
      this.isLoggedIn = this.login.isLoggedIn();
      this.user = this.login.getUser();
    });
  }

  public logout() {
    this.login.logout();
    this.isLoggedIn = false;
    this.user = null;
    this.router.navigate(['']);
    // window.location.reload();
    // window.location.href="/login"
  }
}
