import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CrudSerivce, ServicesService } from 'src/app/core/services/services.service';

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

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.service.getServices().subscribe(res => this.servicos = res);
  }

  onSubmit() {
    console.log('pimbas')

  }

}
