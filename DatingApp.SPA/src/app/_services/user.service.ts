import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { catchError } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
constructor(private http: HttpClient) {
}
getUsers(): Observable<User[]> {
  return this.http.get<User[]>(this.baseUrl + 'users');
}
getUser(id: string): Observable<User> {
  return this.http.get<User>(this.baseUrl + 'users/' + id).pipe();
}
updateUser(id: string, user: User): Observable<void> {
  return this.http.put<void>(this.baseUrl + 'users/' + id, user).pipe();
}
}
