import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from './helper';
import { Users } from '../model/User';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}
  //add user
  public addUser(user: any) {
    console.log(user);
    return this._http.post(`${baseUrl}/user/`, user);
  }

  //get users
  public getUsers(): Observable<Users[]> {
    return this._http.get<Users[]>(`${baseUrl}/user/getUsers`);
  }

  //delete users
  public deleteUser(userid: any) {
    return this._http.delete(`${baseUrl}/user/${userid}`);
  }

  //update user
  public updateUser(user: any) {
    return this._http.put(`${baseUrl}/user/updateUser`, user);
  }

  //get attempts and results
  public getResult(userId: any) {
    return this._http.get(`${baseUrl}/result/${userId}`);
  }
}
