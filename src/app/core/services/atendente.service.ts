import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtendenteInterface } from 'src/app/modules/home/components/card-atendentes/card-atendentes.component';
import { AuthService, RegisterInterface } from '../auth/auth.service';
import { ServicesService } from './services.service';

@Injectable({
  providedIn: 'root'
})
export class AtendenteService {

  token: string;
  role: string;

  constructor(private http: HttpClient, private auth: AuthService, private service: ServicesService) {
    var dataToken = sessionStorage.getItem('jwtLogin');
    dataToken ? this.token = JSON.parse(dataToken).token : null;
    dataToken ? this.role = JSON.parse(dataToken).profile : null;
   }

  api = this.auth.api;

  getAtendentes() {
    if(this.role !== 'ROLE_ADM' && this.role !== 'ROLE_ATEND') {
      return this.http.get<AtendenteInterface[]>(`${this.api}/funcionario/lista`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    } else {
      return this.http.get<AtendenteInterface[]>(`${this.api}/funcionario`, {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }
    
  }
}
