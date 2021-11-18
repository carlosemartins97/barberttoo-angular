import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-create-atendente',
  templateUrl: './create-atendente.component.html',
  styleUrls: ['./create-atendente.component.scss']
})
export class CreateAtendenteComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Novo atendente | Barberttoo');
  }

}
