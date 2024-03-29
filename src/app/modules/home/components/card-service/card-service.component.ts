import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CrudSerivce, ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.scss']
})
export class CardServiceComponent implements OnInit {

  faTrash = faTrash;
  faPen = faPen;
  
  @Input() servico: CrudSerivce;
  @Output() deleteClicado = new EventEmitter<string>();

  link: string;
  role: string;

  constructor(private service: ServicesService, private auth: AuthService) { }
  
  ngOnInit(): void {
    this.role = this.auth.getUserInfo().profile;
    this.link = `../agendamentos/create`;
  }

  onDelete(id: number) {
    this.service.deleteService(id).subscribe({
      next: res => {
        this.deleteClicado.emit('clicado');
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
