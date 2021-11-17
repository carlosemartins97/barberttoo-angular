import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CrudSerivce } from './services.service';

export interface Agendamento {
  id: number;
  dt_Agendamento: string;
  funcionario: {
    id: number;
    nm_Funcionario: string;
    ds_Email: string;
    cd_Celular: string;
  };
  servico: CrudSerivce;
  cliente: {
    id: number;
    nm_Cliente: string;
    ds_Email: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  token: string;
  role: string;

  constructor(private http: HttpClient ,private auth: AuthService) {
    var dataToken = sessionStorage.getItem('jwtLogin');
    dataToken ? this.token = JSON.parse(dataToken).token : null;
    dataToken ? this.role = JSON.parse(dataToken).profile : null;
  }

  api = this.auth.api;

  getAgendamentos() {
    return this.http.get<Agendamento[]>(`${this.api}/agendamento/partial`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  createAgendamento(payload: {}) {
    this.http.post<Agendamento>(`${this.api}/agendamento/create`, payload, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: res => {
        console.log(res);
      }, error: error => {
        console.log(error);
      }
    })
  }

  deleteAgendamento(id: number) {
    this.http.delete<any>(`${this.api}/agendamento/${id}`, { 
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: res => {
        console.log('deletado');
      },
      error: error => {
        console.log(error);
      }
    })
  }


}
