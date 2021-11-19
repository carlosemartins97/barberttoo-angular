import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private titleService: TitleService,
    private activatedRoute: ActivatedRoute
  ) { }

  id: string | null;
  editMode = false;
  isLoading = false;

  ngOnInit(): void {
    this.titleService.setTitle('Novo serviço | Barberttoo');
    this.auth.getUserInfo().profile !== 'ROLE_ADM' ? this.route.navigate(['/app/services']) : null;

    this.activatedRoute.paramMap.subscribe(res => {
      this.id = res.get('id');
      if(this.id !== null) {
        this.isLoading = true;
        this.editMode = true;
        this.service.getServiceById(+this.id).subscribe({
          next: (res) => {
            this.serviceForm.controls.name.setValue(res.nm_servico);
            this.serviceForm.controls.descricao.setValue(res.ds_servico);
            this.serviceForm.controls.price.setValue(res.vl_preco);
          }
        })
      } else {
        this.editMode = false;
      }
    })
    
  }

  onSubmit() {
    if(this.serviceForm.valid) {
      this.loader = true;
      if(this.editMode) {
        this.service.updateService(this.serviceForm.value, Number(this.id));
      } else {
        this.service.createService(this.serviceForm.value);
      }
    }
  }

}
