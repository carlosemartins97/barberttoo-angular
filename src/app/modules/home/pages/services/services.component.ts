import { Component, OnInit } from '@angular/core';
import { CrudSerivce, ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private services: ServicesService) { }

  isLoading = false;
  servicos: CrudSerivce[] = [];
  role: string;

  admMode = false;

  ngOnInit(): void {
    this.role = this.services.role;

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
