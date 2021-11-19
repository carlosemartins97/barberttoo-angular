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
        const resData = res.map(agendamento => {
          return formateHourForAgendamentos(agendamento.dt_Agendamento);
        })

        const list = this.generateHorarioList();
        const newList = list.filter( function( el ) {
          return !resData.includes(el)
        } );
        this.agendamentoForm.controls.hora.enable();
        this.horarios = newList;
      }, error: error => {
        console.log(error);
      }
    })
  }

}
