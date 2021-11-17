import { Component, Input, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CrudSerivce, ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.scss']
})
export class CardServiceComponent implements OnInit {

  faTrash = faTrash;

  @Input() servico: CrudSerivce;

  constructor(public service: ServicesService) { }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    this.service.deleteService(id); 
  }

}
