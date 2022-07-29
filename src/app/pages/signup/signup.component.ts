import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterEvent, RouterLink } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private router: Router
  ) {}
  // should match backend model
  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };

  ngOnInit(): void {}
  // formSubmit() {
  //   if (this.user.userName == '' || this.user.userName == null) {
  //     this.snack.open('Oops!! User-Name Required', 'Cancel', {
  //       duration: 2000,
  //       verticalPosition: 'top',
  //       horizontalPosition: 'left',
  //     });

  //     return;
  //   }
  //   //addUser : userService
  //   this.userService.addUser(this.user).subscribe(
  //     (data) => {
  //       //success
  //       console.log(data);
  //       this.snack.open('Registration Successfull', 'Cancel', {
  //         duration: 2000,
  //         verticalPosition: 'top',
  //         horizontalPosition: 'left',
  //       });
  //     },
  //     (error) => {
  //       //fail
  //       console.log(error);
  //       this.snack.open('something went wrong', 'Cancel', {
  //         duration: 2000,
  //         verticalPosition: 'top',
  //         horizontalPosition: 'left',
  //       });
  //     }
  //   );
  // }
  formSubmit() {
    if (this.user.username == '' || this.user.username == null) {
      this.snack.open('Oops!! User-Name Required', 'Cancel', {
        duration: 2000,
        verticalPosition: 'bottom',
        // horizontalPosition: 'left',
      });

      return;
    }

    //addUser : userService
    this.userService.addUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        // this.snack.open('Registration Successfull', 'Cancel', {
        //   duration: 2000,
        //   verticalPosition: 'top',
        //   horizontalPosition: 'left',
        // });
        Swal.fire(
          'Registration Successfull',
          'You are a new member',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/login');
          }
        });
      },
      (error) => {
        console.log(error.error);
        if (error.error['username'] != null) {
          this.snack.open(error.error['username'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
        if (error.error['firstname'] != null) {
          this.snack.open(error.error['firstname'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
        if (error.error['lastname'] != null) {
          this.snack.open(error.error['lastname'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
        if (error.error['password'] != null) {
          this.snack.open(error.error['password'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
        if (error.error['email'] != null) {
          this.snack.open(error.error['email'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
        if (error.error['phone'] != null) {
          this.snack.open(error.error['phone'], 'Cancel', {
            duration: 3000,
          });
          return;
        }
        //error
        // console.log(error);
        // alert(error.error.text);
        this.snack.open(error.error.text, '', {
          duration: 3000,
        });
      }
    );
  }
}
