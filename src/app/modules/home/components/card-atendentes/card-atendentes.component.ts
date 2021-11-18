import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ServicesService } from 'src/app/core/services/services.service';

export interface AtendenteInterface {
  nm_Funcionario: string;
  ds_Email: string;
  cd_Cpf: string;
  dt_BirthDate: string;
  cd_Celular: string;
  cd_Password: string;
  ds_Endereco: string;
  ds_Cidade: string;
  sg_Uf: string;
  cd_Cep: string;
  authority: string;
  id: string;
}

@Component({
  selector: 'app-card-atendentes',
  templateUrl: './card-atendentes.component.html',
  styleUrls: ['./card-atendentes.component.scss']
})
export class CardAtendentesComponent implements OnInit {

  @Input() atendente: AtendenteInterface;

  faTrash = faTrash;

  role: string;

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.role = this.service.role;
  }

}
