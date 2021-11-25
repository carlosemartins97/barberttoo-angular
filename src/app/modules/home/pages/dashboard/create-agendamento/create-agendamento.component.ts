import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AgendamentosService } from 'src/app/core/services/agendamentos.service';
import { AtendenteService } from 'src/app/core/services/atendente.service';
import { CrudSerivce, ServicesService } from 'src/app/core/services/services.service';
import { TitleService } from 'src/app/core/services/title.service';
import { formateHourForAgendamentos } from 'src/app/shared/helpers/format';
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
  horarios: string[] = [];
  dataMinima: string;
  atendimentosDoFuncionario: {data: string, hora: string}[] = [];
  atendimentosDoFuncionarioDoDia: {data: string, hora: string}[] = [];

  constructor(private service: ServicesService, 
    private atendente: AtendenteService, 
    private agendamento: AgendamentosService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Novo agendamento | Barberttoo');
    this.service.getServices().subscribe(res => this.servicos = res);
    this.atendente.getAtendentes().subscribe(res => this.atendentes = res);
    this.agendamentoForm.controls.hora.disable();
    this.agendamentoForm.controls.date.disable();
    
    this.dataMinima = this.getActualDate();
  }

  onSubmit() {
   if(this.agendamentoForm.valid) {
    this.agendamento.createAgendamento(this.agendamentoForm.value);
   } else {
     alert('preencha os campos corretamente');
   }
  }

  generateHorarioList() {
    return [
      '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00',
      '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ];
  }

  getAtendenteHorarios() {

    this.atendente.getAgendamentosFuncionario(this.agendamentoForm.get('funcionario')?.value).subscribe({
      next: res => {
        const atendimentosDoFuncionario = res.map(agendamento => {
          return {
            hora: formateHourForAgendamentos(agendamento.dt_Agendamento),
            data: new Date(agendamento.dt_Agendamento).getFullYear()+'-'+(new Date(agendamento.dt_Agendamento).getMonth()+1)+'-'+new Date(agendamento.dt_Agendamento).getDate()
          }
        })
        this.atendimentosDoFuncionario = atendimentosDoFuncionario;
        console.log(this.atendimentosDoFuncionario)
        this.agendamentoForm.controls.date.enable();
      }, error: error => {
        console.log(error);
      }
    })
  }

  onDateChanged() {
    this.agendamentoForm.controls.hora.enable();
    const data = this.agendamentoForm.get('date')?.value;
    this.horarios = this.generateHorarioList();

    let listaHoras: any[] = [];
    const objDeComparacao = this.atendimentosDoFuncionario.filter(agendamento => {
      if(data === agendamento.data) {
        listaHoras.push(agendamento.hora)
      }
    })

    const newList = this.generateHorarioList().filter(hora => {
      return !listaHoras.includes(hora)
    })
    this.horarios = newList;
    console.log(newList);
  }

  getActualDate() {
    const data = new Date();
    return `${data.getFullYear()}-${data.getMonth()+1}-${data.getDate()}`;
  }
}
