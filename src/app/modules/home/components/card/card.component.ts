import { Component, Input, OnInit } from '@angular/core';
import { Agendamento } from 'src/app/core/services/agendamentos.service';
import { formatDateForAgendamentos, formateHourForAgendamentos } from 'src/app/shared/helpers/format';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() agendamento: Agendamento;

  dataFormatada: string;
  horaFormatada: string;

  constructor() { }

  ngOnInit(): void {
    this.dataFormatada = formatDateForAgendamentos(this.agendamento.dt_Agendamento);
    this.horaFormatada = formateHourForAgendamentos(this.agendamento.dt_Agendamento);
  }



}
