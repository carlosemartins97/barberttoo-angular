import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  
  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle('Cadastro | Barberttoo')
  }

}
