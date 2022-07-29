import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css'],
})
export class ViewUserComponent implements OnInit {
  user: any;
  public dataSource: any = [];
  displayedColumns: string[] = [
    'username',
    'firstname',
    'lastname',
    'phone',
    'email',
    'actions',
  ];
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  searchKey!: string;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data: any) => {
      this.user = data;
      this.dataSource = new MatTableDataSource(this.user);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      console.log(data);
      (error: any) => alert('Error getting user data!!');
    });
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  deleteUser(id: any) {
    Swal.fire({
      icon: 'question',
      title: 'Are You Sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(id).subscribe(
          (success) => {
            this.user = this.user.filter((u: any) => u.id != id);
            this.dataSource = new MatTableDataSource(this.user);
            Swal.fire('Success', 'User Deleted', 'success');
          },
          (error: any) => {
            Swal.fire('Error', 'Something Went Wrong', 'error');
          }
        );
      }
    });
  }
}
