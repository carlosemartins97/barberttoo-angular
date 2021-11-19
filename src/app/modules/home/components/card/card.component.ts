import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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

  constructor(private agendamentosService: AgendamentosService) { }

  ngOnInit(): void {
    this.dataFormatada = formatDateForAgendamentos(this.agendamento.dt_Agendamento);
    this.horaFormatada = formateHourForAgendamentos(this.agendamento.dt_Agendamento);
  }

  onDelete(id: number) {
    this.agendamentosService.deleteAgendamento(id).subscribe({
      next: res => {
        console.log('deletado');
        this.clicked.emit('clicado');
      },
      error: error => {
        console.log(error);
      }
    })
  }



}
