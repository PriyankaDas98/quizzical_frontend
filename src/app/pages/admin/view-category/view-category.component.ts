import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  categories: any;

  constructor(private _category: CategoryService, private _router: Router) {}

  ngOnInit(): void {
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
  // deleteCategory(cid: any) {
  //   Swal.fire({
  //     icon: 'question',
  //     title: 'Are You Sure you want to delete?',
  //     confirmButtonText: 'Delete',
  //     showCancelButton: true,
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this._category.deleteCategory(cid).subscribe(
  //         (data: any) => {
  //           this._category = this.categories.filter(
  //             (cat: { cid: any }) => cat.cid != cid
  //           );
  //           Swal.fire('Success !!', 'Category Deleted', 'success').then();
  //         },
  //         (error: any) => {
  //           Swal.fire('Error', 'error in deleting category', 'error');
  //           console.log(error);
  //         }
  //       );
  //     }
  //   });
  // }
  deleteCategory(cid: any) {
    Swal.fire({
      icon: 'question',
      title: 'Are You Sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._category.deleteCategory(cid).subscribe(
          (success) => {
            this.categories = this.categories.filter(
              (cat: any) => cat.cid != cid
            );
            Swal.fire('Success', 'Category Deleted', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Something Went Wrong', 'error');
          }
        );
      }
    });
  }
}
