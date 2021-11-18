import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Agendamento, AgendamentosService } from 'src/app/core/services/agendamentos.service';

@Component({
  selector: 'app-details-agendamento',
  templateUrl: './details-agendamento.component.html',
  styleUrls: ['./details-agendamento.component.scss']
})
export class DetailsAgendamentoComponent implements OnInit {

  id: string | null;
  agendamento: Agendamento;
  isLoading = false;
  faArrowLeft = faArrowLeft;

  dataAgendamento: string;
  horarioAgendamento: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agendamentosService: AgendamentosService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    //capturando id da url
    this.activatedRoute.paramMap.subscribe(res => {
      this.id = res.get('id');
      this.agendamentosService.getAgendamentoById(Number(this.id)).subscribe({
        next: res => {
          this.agendamento = res;
          this.formatDate(res.dt_Agendamento);
          this.isLoading = false;
        }, error: error => {
          console.log(error);
        }
      })
    })
  }

  formatDate(date: string) {
    const newDate = new Date(date);
    const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    this.dataAgendamento = `${newDate.getDate()} de ${monthNames[newDate.getMonth()]}`;
    if(newDate.getMinutes() == 0) {
      this.horarioAgendamento = `${newDate.getHours()}:${newDate.getMinutes()}0`;
    } else {
      this.horarioAgendamento = `${newDate.getHours()}:${newDate.getMinutes()}`;
    }
  }

}
