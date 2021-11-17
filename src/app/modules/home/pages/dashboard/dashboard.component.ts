import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services/title.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Agendamentos');
  }


  

}
