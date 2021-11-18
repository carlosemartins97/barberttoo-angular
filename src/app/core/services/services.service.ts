import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  
  constructor(private http: HttpClient, private auth: AuthService, private route: Router) {
    console.log('construido')
  }


  api = this.auth.api;
  serviceData: CrudSerivce[] = [];

  getServices() {
    const token = this.auth.getUserInfo().token;
    return this.http.get<CrudSerivce[]>(`${this.api}/servico`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  createService(payload: {name: string, descricao: string, price: string}) {
    const token = this.auth.getUserInfo().token;
    const newPayload = {
      nm_servico: payload.name,
      ds_servico: payload.descricao,
      vl_preco: Number(payload.price)
    }

    this.http.post<CrudSerivce>(`${this.api}/servico/create`, newPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: res => {
        this.route.navigate(['/app/services']);
      }, error: error => {
        console.log(error);
      }
    }
    );
  }

  deleteService(id: number) {
    const token = this.auth.getUserInfo().token;
    this.http.delete<any>(`${this.api}/servico/${id}`, { 
      headers: {
        Authorization: `Bearer ${token}`
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
