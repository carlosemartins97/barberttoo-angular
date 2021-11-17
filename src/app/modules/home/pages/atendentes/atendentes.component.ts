import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atendentes',
  templateUrl: './atendentes.component.html',
  styleUrls: ['./atendentes.component.scss']
})
export class AtendentesComponent implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

}
