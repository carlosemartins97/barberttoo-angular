import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: {login: string, password: string}, save: boolean) {
    // this.http.post('url', payload);
    console.log(payload, save);
  }

  register(payload: {nome: string, email: string, password: string, cpf: string, phone: string, date: string}) {
    console.log(payload);
  }
}
