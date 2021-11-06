import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { dataAtualFormatada, formatCpf, formatPhone } from 'src/app/shared/helpers/format';

export interface Auth {
  token: string;
  profile: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://sistema-barbertoo.herokuapp.com';

  token: string;

  constructor(
    private http: HttpClient, private route: Router,
    private cookieService: CookieService
  ) { }

  login(payload: {email: string, password: string}, save: boolean) {
    const newPayload = {
      login: payload.email,
      password: payload.password
    }
    console.log(newPayload);
    this.http.post<Auth>(`${this.api}/login`, newPayload).subscribe({
      next: (res) => {
        this.token = res.token;
        sessionStorage.setItem('jwtLogin', JSON.stringify(res));
        // if(save) {
        //   this.cookieService.set('jwtLogin', JSON.stringify(res));
        // }
        this.route.navigate(["/dashboard"]);
      },
      error: error => {
        alert('Erro ao fazer login!')
      }
    })
  }

  register(payload: {nome: string, email: string, password: string, cpf: string, phone: string, date: string}) {
    dataAtualFormatada(payload.date);
    const newPayloadDate = dataAtualFormatada(payload.date);
    const cpfFormatado = formatCpf(payload.cpf);
    const telefoneFormatado = formatPhone(payload.phone);

    const newPayload = {
      nm_Cliente: payload.nome,
      ds_Email: payload.email,
      cd_Cpf: cpfFormatado ,
      dt_BirthDate: newPayloadDate ,
      cd_TelefoneFixo: telefoneFormatado ,
      cd_Celular: telefoneFormatado ,
      cd_Password: payload.password ,
    }
    console.log(newPayload);
    this.http.post<any>(`${this.api}/cliente/create`, newPayload).subscribe({
      next: (res) => {
        console.log(res);
        this.route.navigate(['/']);
      },
      error: error => {
        console.log(error);
      }
    })
  }
}
