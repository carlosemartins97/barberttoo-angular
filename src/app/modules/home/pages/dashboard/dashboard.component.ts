import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
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
  error = false;
  role: string;

  mode: string;
  id: number;

  constructor(private titleService: TitleService, private agendamento: AgendamentosService, private auth: AuthService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Agendamentos | Barberttoo');
    this.isLoading = true;

    this.role = this.auth.getUserInfo().profile;

    if(this.role !== 'ROLE_CLIENTE') {
      this.mode = 'atendente';
      //fazer rota para listar agendamentos vigentes do funcionario
      this.id = +this.auth.getUserInfo().id;
      this.agendamento.getAgendamentoByAtendente(this.id).subscribe({
        next: res => {
          this.agendamentos = res;
          this.isLoading = false;
        }, error: error => {
          this.isLoading = false;
          console.log(error);
        }
      })
      this.isLoading = false;
    } else {
      //rota para listar agendamentos ativos do cliente
      this.mode = 'cliente';
      this.agendamento.getAgendamentos().subscribe({
        next: res => {
          this.agendamentos = res;
          this.isLoading = false;
        }, error: error => {
          this.error = true;
          console.log(error);
          this.isLoading = false;
        }
      })
    }
    
  }

  onDeletedClicado() {
    this.isLoading = true;
    //atualizar lista de agendamentos
    this.agendamento.getAgendamentos().subscribe({
      next: res => {
        this.agendamentos = res;
        this.isLoading = false;
      }, error: error => {
        this.error = true;
        console.log(error);
        this.isLoading = false;
      }
    })
  }
}
