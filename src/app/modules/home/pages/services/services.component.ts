import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CrudSerivce, ServicesService } from 'src/app/core/services/services.service';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private auth: AuthService, 
    private services: ServicesService, 
    private titleService: TitleService
  ) { }

  isLoading = false;
  servicos: CrudSerivce[] = [];
  role: string;

  admMode = false;

  ngOnInit(): void {
    this.titleService.setTitle('Serviços | Barberttoo');
    
    this.role = this.auth.getUserInfo().profile;

    this.isLoading = true;
    this.services.getServices().subscribe({
      next: res => {
        this.servicos = res;
        this.isLoading = false;
      },
      error: error => {
        alert('Falha ao buscar servivços');
        this.isLoading = false;
      }
    })
  }

  onDeleteClicado() {
    this.isLoading = true;
    this.services.getServices().subscribe({
      next: res => {
        this.servicos = res;
        this.isLoading = false;
      },
      error: error => {
        alert('Falha ao buscar servivços');
        this.isLoading = false;
      }
    })
  }

}
