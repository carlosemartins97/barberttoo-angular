import { Component, OnInit } from '@angular/core';
import { AtendenteService } from 'src/app/core/services/atendente.service';
import { ServicesService } from 'src/app/core/services/services.service';
import { AtendenteInterface } from '../../components/card-atendentes/card-atendentes.component';

@Component({
  selector: 'app-atendentes',
  templateUrl: './atendentes.component.html',
  styleUrls: ['./atendentes.component.scss']
})
export class AtendentesComponent implements OnInit {

  isLoading = false;
  role: string;

  atendentes: AtendenteInterface[];

  constructor(private service: ServicesService, private atendenteService: AtendenteService) { }

  ngOnInit(): void {
    this.role = this.service.role;
    
    this.isLoading = true;
    this.atendenteService.getAtendentes().subscribe({
      next: res => {
        console.log(res);
        this.atendentes = res;
        this.isLoading = false;
      }, error: error => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

}
