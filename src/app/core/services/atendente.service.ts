import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AtendenteInterface } from 'src/app/modules/home/components/card-atendentes/card-atendentes.component';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AtendenteService {

  constructor(private http: HttpClient, private auth: AuthService, private route: Router) {
   }

  api = this.auth.api;

  getAtendentes() {
    const token = this.auth.getUserInfo().token;
    console.log(token);
    const role = this.auth.getUserInfo().profile;
    if(role !== 'ROLE_ADM' && role !== 'ROLE_ATEND') {
      return this.http.get<AtendenteInterface[]>(`${this.api}/funcionario/lista`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      return this.http.get<AtendenteInterface[]>(`${this.api}/funcionario`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  }

  getAtendenteById(id: number) {
    const token = this.auth.getUserInfo().token;
    return this.http.get<AtendenteInterface>(`${this.api}/funcionario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }


  updateAtendente(
    payload: {
      address: string,
      cep: string,
      city: string,
      cpf: string,
      date: string,
      email: string,
      nome: string,
      phone: string,
      role: string,
      uf: string
    },
    id: number) {
    const token = this.auth.getUserInfo().token;
    const newPayload: AtendenteInterface = {
      id,
      authority: payload.role,
      cd_Celular: payload.phone,
      cd_Cep: payload.cep,
      cd_Cpf: payload.cpf,
      ds_Cidade: payload.city,
      ds_Email: payload.email,
      ds_Endereco: payload.address,
      dt_BirthDate: payload.date,
      nm_Funcionario: payload.nome,
      sg_Uf: payload.uf
    }
    console.log(newPayload);  

    this.http.put<AtendenteInterface>(`${this.api}/funcionario/`, newPayload ,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: res => {
        this.route.navigate(['/app/atendentes']);
      }, error: error => {
        console.log(error);
      }
    })
  }

  deleteAtendente(id: number) {
    const token = this.auth.getUserInfo().token;
    return this.http.delete<any>(`${this.api}/funcionario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
