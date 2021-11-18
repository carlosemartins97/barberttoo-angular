import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { formatDateAndHour } from 'src/app/shared/helpers/format';
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

export interface AgendamentoCurto {
  funcionario: number;
  servico: number;
  cliente: number;
  dt_Agendamento: string;
}

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  token: string;
  role: string;
  id: string;

  constructor(private http: HttpClient ,private auth: AuthService, private route: Router) {
    var dataToken = sessionStorage.getItem('jwtLogin');
    dataToken ? this.token = JSON.parse(dataToken).token : null;
    dataToken ? this.role = JSON.parse(dataToken).profile : null;
    dataToken ? this.id = JSON.parse(dataToken).id : null;
  }

  api = this.auth.api;

  getAgendamentos() {
    return this.http.get<Agendamento[]>(`${this.api}/agendamento/cliente/${this.id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  createAgendamento(payload: {date: string,funcionario: string,hora: string, service: string}) {
    const newPayload:AgendamentoCurto  = {
      cliente: Number(this.id),
      funcionario: Number(payload.funcionario),
      servico: Number(payload.service),
      dt_Agendamento: formatDateAndHour(payload.hora, payload.date)
    }
    this.http.post<AgendamentoCurto>(`${this.api}/agendamento/create`, newPayload, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: res => {
        this.route.navigate(['/app/agendamentos'])
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
