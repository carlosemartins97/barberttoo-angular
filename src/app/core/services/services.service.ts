import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export interface CrudSerivce {
  id: number;
  nm_servico: string;
  ds_servico: string;
  vl_preco: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  token: string;
  role: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    var dataToken = sessionStorage.getItem('jwtLogin');
    dataToken ? this.token = JSON.parse(dataToken).token : null;
    dataToken ? this.role = JSON.parse(dataToken).profile : null;
  }

  api = this.auth.api;
  serviceData: CrudSerivce[] = [];

  

  getServices() {
    return this.http.get<CrudSerivce[]>(`${this.api}/servico`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }

  createService(payload: {name: string, descricao: string, price: string}) {
    const newPayload = {
      nm_servico: payload.name,
      ds_servico: payload.descricao,
      vl_preco: Number(payload.price)
    }

    this.http.post<CrudSerivce>(`${this.api}/servico/create`, newPayload, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).subscribe({
      next: res => {
        console.log('criado');
      }, error: error => {
        console.log(error);
      }
    }
    );
  }

  deleteService(id: number) {
    this.http.delete<any>(`${this.api}/servico/${id}`, { 
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
