import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';



const httpOption = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) {
}
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users', httpOption);
}
getUser(id: string): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id, httpOption).pipe();
}
}
