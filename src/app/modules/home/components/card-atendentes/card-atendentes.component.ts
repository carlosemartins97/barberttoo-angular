import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-atendentes',
  templateUrl: './card-atendentes.component.html',
  styleUrls: ['./card-atendentes.component.scss']
})
export class CardAtendentesComponent implements OnInit {

  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }

}
