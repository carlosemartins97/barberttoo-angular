import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendamentosService } from 'src/app/core/services/agendamentos.service';
import { AtendenteService } from 'src/app/core/services/atendente.service';
import { CrudSerivce, ServicesService } from 'src/app/core/services/services.service';
import { TitleService } from 'src/app/core/services/title.service';
import { AtendenteInterface } from '../../../components/card-atendentes/card-atendentes.component';

@Component({
  selector: 'app-create-agendamento',
  templateUrl: './create-agendamento.component.html',
  styleUrls: ['./create-agendamento.component.scss']
})
export class CreateAgendamentoComponent implements OnInit {

  loader = false;

  agendamentoForm = new FormGroup({
    service: new FormControl('', [
      Validators.required,
    ]),
    funcionario: new FormControl('', [
      Validators.required,
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    hora: new FormControl('', [
      Validators.required
    ]),
  })

  servicos: CrudSerivce[] = [];
  atendentes: AtendenteInterface[] = [];

  constructor(private service: ServicesService, 
    private atendente: AtendenteService, 
    private agendamento: AgendamentosService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Novo agendamento | Barberttoo');
    this.service.getServices().subscribe(res => this.servicos = res);
    this.atendente.getAtendentes().subscribe(res => this.atendentes = res);
  }

  onSubmit() {
   this.agendamento.createAgendamento(this.agendamentoForm.value);
  }

}
