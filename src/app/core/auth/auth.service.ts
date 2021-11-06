import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Auth {
  token: string;
  profile: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = 'https://sistema-barbertoo.herokuapp.com';

  token = '';

  constructor(private http: HttpClient, private route: Router) { }

  login(payload: {email: string, password: string}, save: boolean) {
    const newPayload = {
      login: payload.email,
      password: payload.password
    }
    console.log(newPayload);
    this.http.post<Auth>(`${this.api}/login`, newPayload).subscribe({
      next: (res) => {
        this.token = res.token;
        if(save) {
          //salvar dados
        }
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
    
    const cpfFormatado = payload.cpf[0] + payload.cpf[1]+ payload.cpf[2] + '.'
     + payload.cpf[3] + payload.cpf[4]+ payload.cpf[5] + '.' 
     + payload.cpf[6] + payload.cpf[7]+ payload.cpf[8] + '-' 
     + payload.cpf[9] + payload.cpf[10];

     const telefoneFormatado = '(' +payload.phone[0]+payload.phone[1]+') ' 
     + payload.phone[2]+payload.phone[3]+payload.phone[4]+payload.phone[5]+payload.phone[6]+'-'
     +payload.phone[7]+payload.phone[8]+payload.phone[9]+payload.phone[10];

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

function dataAtualFormatada(date: any){
  var data = new Date(date),
      dia  = data.getDate().toString(),
      diaF = (dia.length == 1) ? '0'+dia : dia,
      mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
      mesF = (mes.length == 1) ? '0'+mes : mes,
      anoF = data.getFullYear();
  return diaF+"/"+mesF+"/"+anoF;
}
