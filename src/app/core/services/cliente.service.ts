import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

interface Cliente {
  id: number;
  nm_Cliente: string;
  ds_Email: string;
  cd_Cpf: string;
  dt_BirthDate: string;
  cd_Celular: string;
  enabled?: boolean;
  authority?: string;
  cd_Password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private auth: AuthService, private route: Router) { }

  api = this.auth.api;

  getClienteById(id: number) {
    const token = this.auth.getUserInfo().token;
    return this.http.get<Cliente>(`${this.api}/cliente/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  updateCliente(
    payload: {
      cpf: string;
      date: string;
      email: string;
      nome: string;
      password: string;
      phone: string;
    }, id: number) {
      const token = this.auth.getUserInfo().token;
      const newPayload: Cliente = {
        id,
        cd_Celular: payload.phone,
        cd_Cpf: payload.cpf,
        ds_Email: payload.email,
        dt_BirthDate: payload.date,
        nm_Cliente: payload.nome,
      }

      this.http.put<Cliente>(`${this.api}/cliente`, newPayload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: res => {
          const userData = this.auth.getUserInfo();
          const newUserData = {
            ...userData,
            nome: res.nm_Cliente,
            username: res.ds_Email
          }
          this.auth.setUserInfo(newUserData);

          alert('Dados realizados com sucesso!');
          this.route.navigate(['/app/agendamentos']);
          
        }, error: error => {
          alert('Não foi possível atualizar seus dados. Verifique novamente mais tarde!')
          console.log(error);
        }
      })
  }
}
