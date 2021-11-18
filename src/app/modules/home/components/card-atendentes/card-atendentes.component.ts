import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AtendenteService } from 'src/app/core/services/atendente.service';
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
  @Output() atendenteDeleted = new EventEmitter<boolean>();

  faTrash = faTrash;

  role: string;

  roleExibition: string;

  constructor(private auth: AuthService, private atendenteService: AtendenteService) { }

  ngOnInit(): void {
    this.role = this.auth.getUserInfo().profile;
    this.formatRole(this.atendente.authority);
  }

  onDelete(id: number) {
    this.atendenteDeleted.emit(true);
    this.atendenteService.deleteAtendente(id).subscribe({
      next: res => {
        console.log(res);
        this.atendenteDeleted.emit(false);
      }, error: error => {
        console.log(error);
      }
    })
  }

  formatRole(role: string) {
    if(role === 'ROLE_ATEND') {
      this.roleExibition = 'Atendente'
    } else if(role === 'ROLE_ADM') {
      this.roleExibition = 'Administrador'
    }
  }

}
