import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AtendenteService } from 'src/app/core/services/atendente.service';
import { ServicesService } from 'src/app/core/services/services.service';
import { TitleService } from 'src/app/core/services/title.service';
import { AtendenteInterface } from '../../components/card-atendentes/card-atendentes.component';

@Component({
  selector: 'app-atendentes',
  templateUrl: './atendentes.component.html',
  styleUrls: ['./atendentes.component.scss']
})
export class AtendentesComponent implements OnInit {

  isLoading = false;
  role: string;
  error = false;

  atendentes: AtendenteInterface[] = [];

  constructor(private auth: AuthService, private atendenteService: AtendenteService, private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Atendentes | Barberttoo');
    this.role = this.auth.getUserInfo().profile;
    
    this.isLoading = true;
    this.atendenteService.getAtendentes().subscribe({
      next: res => {
        this.atendentes = res;
        this.isLoading = false;
      }, error: error => {
        console.log(error);
        this.error = true;
        this.isLoading = false;
      }
    })
  }

  onClickedDelete() {
    this.isLoading = true;
    this.atendenteService.getAtendentes().subscribe({
      next: res => {
        this.atendentes = res;
        this.isLoading = false;
        console.log(res);
      }, error: error => {
        console.log(error);
        this.isLoading = false;
      }
    })
  }

}
