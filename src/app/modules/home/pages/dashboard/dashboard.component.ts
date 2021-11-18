import { Component, OnInit } from '@angular/core';
import { AgendamentosService } from 'src/app/core/services/agendamentos.service';
import { TitleService } from 'src/app/core/services/title.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  agendamentos: any[] = [];
  isLoading = false;

  constructor(private titleService: TitleService, private agendamento: AgendamentosService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.titleService.setTitle('Agendamentos | Barberttoo');
    this.agendamento.getAgendamentos().subscribe({
      next: res => {
        this.agendamentos = res;
        this.isLoading = false;
      }, error: error => {
        console.log(error);
      }
    })
  }
}
