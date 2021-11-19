import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Agendamento, AgendamentosService } from 'src/app/core/services/agendamentos.service';
import { formatDateForAgendamentos, formateHourForAgendamentos } from 'src/app/shared/helpers/format';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  faTrash = faTrash;

  @Input() agendamento: Agendamento;
  @Output() clicked = new EventEmitter<string>();

  dataFormatada: string;
  horaFormatada: string;
  role: string;

  constructor(private agendamentosService: AgendamentosService, private auth: AuthService) { }

  ngOnInit(): void {
    this.role = this.auth.getUserInfo().profile;
    this.dataFormatada = formatDateForAgendamentos(this.agendamento.dt_Agendamento);
    this.horaFormatada = formateHourForAgendamentos(this.agendamento.dt_Agendamento);
  }

  onDelete(id: number) {
    this.agendamentosService.deleteAgendamento(id).subscribe({
      next: res => {
        this.clicked.emit('clicado');
        console.log(res);
      },
      error: error => {
        console.log(error);
      }
    })
  }



}
