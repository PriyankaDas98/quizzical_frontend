import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  user = null;
  curuser = null;
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
    Swal.fire({
      icon: 'question',
      title: 'Are You sure you want to logout?',
      confirmButtonText: 'Logout',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.login.logout();
        this.isLoggedIn = false;
        this.user = null;
        this.router.navigate(['']);
      }
    });
    // this.login.logout();
    // this.isLoggedIn = false;
    // this.user = null;
    // this.router.navigate(['']);
    // window.location.reload();
    // window.location.href="/login"
  }
}
