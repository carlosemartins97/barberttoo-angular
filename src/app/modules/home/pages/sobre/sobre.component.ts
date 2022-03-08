import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Sobre a aplicação | Barberttoo');
  }

}
