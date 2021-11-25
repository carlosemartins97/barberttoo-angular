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
    cd_Celular: string;
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

  constructor(private http: HttpClient ,private auth: AuthService, private route: Router) {
  }

  api = this.auth.api;

  getAgendamentos() {
    const token = this.auth.getUserInfo().token;
    const id = this.auth.getUserInfo().id;
    return this.http.get<Agendamento[]>(`${this.api}/agendamento/cliente/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  getAgendamentoById(id: number) {
    const token = this.auth.getUserInfo().token;
    return this.http.get<Agendamento>(`${this.api}/agendamento/parcial/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  createAgendamento(payload: {date: string,funcionario: string,hora: string, service: string}) {
    const token = this.auth.getUserInfo().token;
    const id = this.auth.getUserInfo().id;
    const newPayload:AgendamentoCurto  = {
      cliente: Number(id),
      funcionario: Number(payload.funcionario),
      servico: Number(payload.service),
      dt_Agendamento: formatDateAndHour(payload.hora, payload.date)
    }
    this.http.post<AgendamentoCurto>(`${this.api}/agendamento/create`, newPayload, {
      headers: {
        Authorization: `Bearer ${token}`
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
    const token = this.auth.getUserInfo().token;
    return this.http.delete<any>(`${this.api}/agendamento/${id}`, { 
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  getAgendamentoByAtendente(id: number) {
    const token = this.auth.getUserInfo().token;
    return this.http.get<Agendamento[]>(`${this.api}/agendamento/funcionario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }


}
