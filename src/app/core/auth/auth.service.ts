import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { dataAtualFormatada, formatCep, formatCpf, formatPhone } from 'src/app/shared/helpers/format';
import { ServicesService } from '../services/services.service';

export interface Auth {
  token: string;
  profile: string;
  username: string;
  id: number;
  name: string;
}

export interface RegisterInterface {
  nome: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  date: string;
  cep?: string;
  uf?: string;
  city?: string;
  address?: string;
  role?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://sistema-barbertoo.herokuapp.com';

  constructor(
    private http: HttpClient, private route: Router
  ) { }

  getUserInfo() {
    var dataToken = sessionStorage.getItem('jwtLogin');
    return JSON.parse(dataToken!);
  }

  login(payload: {email: string, password: string}, save: boolean) {
    const newPayload = {
      login: payload.email,
      password: payload.password
    }
    this.http.post<Auth>(`${this.api}/login`, newPayload).subscribe({
      next: (res) => {
        sessionStorage.setItem('jwtLogin', JSON.stringify(res));
        // if(save) {
        //   this.cookieService.set('jwtLogin', JSON.stringify(res));
        // }
        this.route.navigate(["/app"]);
      },
      error: error => {
        alert('Erro ao fazer login!')
      }
    })
  }

  register(payload: any, mode: string) {
    const cpfFormatado = formatCpf(payload.cpf);
    const telefoneFormatado = formatPhone(payload.phone);

    if(mode === 'atendente') {
      console.log(payload.cep![8]);
      const cepFormatado = formatCep(payload.cep!);
      const newPayload = {
        nm_Funcionario: payload.nome,
        ds_Email: payload.email,
        cd_Cpf: cpfFormatado ,
        dt_BirthDate: payload.date ,
        cd_Celular: telefoneFormatado ,
        cd_Password: payload.password ,
        ds_Endereco: payload.address,
        ds_Cidade: payload.city,
        sg_Uf: payload.uf,
        cd_Cep: cepFormatado,
        authority: payload.role
      }
      this.http.post<any>(`${this.api}/funcionario/create`, newPayload).subscribe({
        next: (res) => {
          console.log(res);
          this.route.navigate(['/app/atendente'])
        },
        error: error => {
          console.log(error);
        }
      })

    } else {
      const newPayload = {
        nm_Cliente: payload.nome,
        ds_Email: payload.email,
        cd_Cpf: cpfFormatado ,
        dt_BirthDate: payload.date ,
        cd_Celular: telefoneFormatado ,
        cd_Password: payload.password ,
      }
      this.http.post<any>(`${this.api}/cliente/create`, newPayload).subscribe({
        next: (res) => {
          alert('Cadastro realizado com sucesso!')
          this.route.navigate(['/']);
        },
        error: error => {
          console.log(error);
        }
      })
    }
  }

  logout() {
    sessionStorage.removeItem('jwtLogin');
    this.route.navigate(['/']);
  }
}
