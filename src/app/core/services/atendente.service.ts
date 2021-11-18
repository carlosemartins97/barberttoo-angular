import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtendenteInterface } from 'src/app/modules/home/components/card-atendentes/card-atendentes.component';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AtendenteService {

  constructor(private http: HttpClient, private auth: AuthService) {
   }

  api = this.auth.api;

  getAtendentes() {
    const token = this.auth.getUserInfo().token;
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

  deleteAtendente(id: number) {
    const token = this.auth.getUserInfo().token;
    return this.http.delete<any>(`${this.api}/funcionario/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
