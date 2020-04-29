import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from "rxjs";

export interface User {
  id: number
  surname: string
  name: string
  patronymic: string
  login: string
  email: string
  tel: string
  photo: string
  cv: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  uri = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient,private router: Router) { }

  login(email: string, password: string) {
    localStorage.removeItem('auth_token');
    this.http.post<{token:  string}>('https://127.0.0.1:8000/authentication_token', {'email': email, 'password': password}).subscribe(data=> {
      localStorage.setItem('auth_token', data.token);
    })
  }

  getLoggedInUser(): Observable<any> {
    const token = localStorage.getItem("auth_token");
    const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post('https://127.0.0.1:8000/api/fetch_user', [], {headers:myHeaders});
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }

  save(user: User) {
    if (this.logIn) {

      const token = localStorage.getItem("auth_token");
      const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const body = JSON.stringify(user);

      return this.http.post('https://127.0.0.1:8000/api/update_user', body, {headers:myHeaders}).subscribe();
    }
  }

  uploadPhoto(photo: File): Observable<any> {
    if (this.logIn) {
      const fd = new FormData()
      fd.append('file', photo, photo.name)
      const token = localStorage.getItem("auth_token")
      const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`)

      return this.http.post('https://127.0.0.1:8000/api/upload/photo', fd, {headers:myHeaders})
    }
  }

  uploadCv(cv: File): Observable<any> {
    if (this.logIn) {
      const fd = new FormData()
      fd.append('file', cv, cv.name)
      const token = localStorage.getItem("auth_token")
      const myHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`)

      return this.http.post('https://127.0.0.1:8000/api/upload/cv', fd, {headers:myHeaders})
    }
  }
}
