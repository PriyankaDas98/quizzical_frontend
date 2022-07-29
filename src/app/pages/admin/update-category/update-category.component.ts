import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {
  constructor(
    private _route: ActivatedRoute,
    private _category: CategoryService,
    private _router: Router
  ) {}

  cId = 0;
  title: any;
  description: any;
  category: any;

  ngOnInit(): void {
    this.cId = this._route.snapshot.params['cid'];
    this._category.getCategory(this.cId).subscribe(
      (data: any) => {
        this.category = data;
      },
      (error: any) => {
        alert('error in loading categories');
      }
    );
  }
  updateCategory() {
    this._category.updateCategory(this.category).subscribe(
      (data: any) => {
        Swal.fire('Success !!', 'category updated', 'success').then(
          (e: any) => {
            this._router.navigate(['/admin/categories']);
          }
        );
      },
      (error: any) => {
        Swal.fire('Error', 'error in updating category', 'error');
        console.log(error);
      }
    );
  }
}
