import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: {login: string, password: string}) {
    // this.http.post('url', payload);
    console.log(payload);
  }
}
