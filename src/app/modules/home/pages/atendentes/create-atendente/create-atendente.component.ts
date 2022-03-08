import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-create-atendente',
  templateUrl: './create-atendente.component.html',
  styleUrls: ['./create-atendente.component.scss']
})
export class CreateAtendenteComponent implements OnInit {

  title: string = '';

  constructor(
    private titleService: TitleService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const lastRouteIndex = this.route.snapshot.url.length - 1;
    const lastRoute = this.route.snapshot.url[lastRouteIndex].path;
    if(lastRoute === 'create') {
      this.title = 'Novo atendente'
    } else {
      this.title = 'Atualizar dados'
    }
  }

}
