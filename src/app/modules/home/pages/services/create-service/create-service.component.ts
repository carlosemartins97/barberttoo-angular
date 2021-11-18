import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ServicesService } from 'src/app/core/services/services.service';
import { TitleService } from 'src/app/core/services/title.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {

  loader = false;

  serviceForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    descricao: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
  })

  constructor(
    private service: ServicesService, 
    private auth: AuthService, 
    private route: Router, 
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Novo serviço | Barberttoo');
    this.auth.getUserInfo().profile !== 'ROLE_ADM' ? this.route.navigate(['/app/services']) : null;
  }

  onSubmit() {
    console.log(this.serviceForm.value);
    if(this.serviceForm.valid) {
      this.loader = true;
      this.service.createService(this.serviceForm.value);
    }
  }

}
