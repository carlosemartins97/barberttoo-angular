import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AtendenteService } from 'src/app/core/services/atendente.service';
import { ClienteService } from 'src/app/core/services/cliente.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @Input() mode: string;

  loader = false;
  submitted = false;
  registerForm = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(150)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.maxLength(14)
    ]),
  })

  registerAtendForm = new FormGroup({
    nome: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(150)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.maxLength(14)
    ]),
    cep: new FormControl('', [
      Validators.required,
      Validators.maxLength(9)
    ]),
    uf: new FormControl('', [
      Validators.required,
      Validators.maxLength(2)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.maxLength(80)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(200)
    ]),
    role: new FormControl('', [
      Validators.required,
    ]),
  })

  id: number;
  role: string;
  isLoading = false;
  editMode: number;
  clienteMode = false;

  estados: {sigla: string, nome: string}[] = [];

  constructor(private auth: AuthService, 
    private http: HttpClient, 
    private activatedRoute: ActivatedRoute,
    private atendenteService: AtendenteService,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.editMode = 1;
    var dataToken = sessionStorage.getItem('jwtLogin');
    if(dataToken) {

      this.role = JSON.parse(dataToken).profile;

      if(this.role && this.role !== 'ROLE_CLIENTE') {
        const apiEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
        this.http.get<{sigla: string, nome: string}[]>(apiEstados).subscribe({
          next: res => {
            this.estados = res.sort((a, b) => a.nome.localeCompare(b.nome));
          },
          error: error => {
            console.log(error);
          }
        })
  
        this.activatedRoute.params.subscribe(res => {
          this.id = Number(res.id);
          if(this.id) {
            this.isLoading = true;
            this.editMode = 2;
  
            this.atendenteService.getAtendenteById(this.id).subscribe({
              next: res => {
                this.registerAtendForm.controls.nome.setValue(res.nm_Funcionario);
                this.registerAtendForm.controls.email.setValue(res.ds_Email);
                this.registerAtendForm.controls.password.disable();
                this.registerAtendForm.controls.phone.setValue(res.cd_Celular);
                this.registerAtendForm.controls.date.setValue(res.dt_BirthDate);
                this.registerAtendForm.controls.cpf.setValue(res.cd_Cpf);
                this.registerAtendForm.controls.cep.setValue(res.cd_Cep);
                this.registerAtendForm.controls.uf.setValue(res.sg_Uf);
                this.registerAtendForm.controls.city.setValue(res.ds_Cidade);
                this.registerAtendForm.controls.address.setValue(res.ds_Endereco);
                this.registerAtendForm.controls.role.setValue(res.authority);
                this.isLoading = false;
              }, error: error => {
                
                console.log('error');
              }
            })
          } else {
            this.editMode = 3;
          }
        })
      } else {
        this.activatedRoute.paramMap.subscribe(res => {
          this.id = Number(res.get('id'));
          this.editMode = 2;
          this.clienteMode = true;
          this.clienteService.getClienteById(this.id).subscribe({
            next: res => {
              this.registerAtendForm.controls.nome.setValue(res.nm_Cliente);
              this.registerAtendForm.controls.email.setValue(res.ds_Email);
              this.registerAtendForm.controls.phone.setValue(res.cd_Celular);
              this.registerAtendForm.controls.date.setValue(res.dt_BirthDate);
              this.registerAtendForm.controls.cpf.setValue(res.cd_Cpf);
              this.registerAtendForm.controls.password.disable();
              
              this.registerForm.controls.nome.setValue(this.registerAtendForm.get('nome')?.value);
              this.registerForm.controls.email.setValue(this.registerAtendForm.get('email')?.value);
              this.registerForm.controls.phone.setValue(this.registerAtendForm.get('phone')?.value);
              this.registerForm.controls.date.setValue(this.registerAtendForm.get('date')?.value);
              this.registerForm.controls.cpf.setValue(this.registerAtendForm.get('cpf')?.value);
  
              this.registerForm.controls.password.disable();
            }, error: error => {
              console.log('error');
            }
        })
        });
      }
    }

    
  }

  onSubmit() {
    this.submitted = true;
    if(this.mode === 'atendente') {
      if(this.registerAtendForm.valid) {
        //ATUALIZAÇÃO DE DADOS DO ATENDENTE
        if(this.editMode === 2) {
          this.atendenteService.updateAtendente(this.registerAtendForm.value ,this.id);
        } else if(this.editMode === 3) {
          console.log(this.registerAtendForm.value);
          this.auth.registerAtendente(this.registerAtendForm.value, this.mode);
          
        }
      } else if (this.registerForm.valid){
        //ATUALIZAÇÃO DE DADOS DO CLIENTE
        this.loader = true;
        
        this.registerForm.controls.nome.setValue(this.registerAtendForm.get('nome')?.value);
        this.registerForm.controls.email.setValue(this.registerAtendForm.get('email')?.value);
        this.registerForm.controls.phone.setValue(this.registerAtendForm.get('phone')?.value);
        this.registerForm.controls.date.setValue(this.registerAtendForm.get('date')?.value);
        this.registerForm.controls.cpf.setValue(this.registerAtendForm.get('cpf')?.value);
        console.log(this.registerForm.value);

        this.clienteService.updateCliente(this.registerForm.value, this.id);
      } else {
        alert('Preencha os campos do formulário corretamente!');
        this.loader = false;
      }
    } else {
      //REGISTRO DO CLIENTE FORA DA APLICAÇÃO
      console.log(this.editMode);
      if(this.registerForm.valid) {
        this.loader = true;
        this.auth.register(this.registerForm.value, this.mode);
      } else {
        alert('Preencha os campos do formulário corretamente!');
        this.loader = false;
      }
    }
  }

  onFillCEP() {
    let cep = this.registerAtendForm.value.cep;
    const apiCEP = `https://viacep.com.br/ws/${cep}/json/`;

    this.http.get<any>(apiCEP).subscribe({
      next: res => {
        this.registerAtendForm.controls.city.setValue(res.localidade);
        this.registerAtendForm.controls.uf.setValue(res.uf);
        this.registerAtendForm.controls.address.setValue(res.logradouro);
      }, error: error => {
        console.log(error);
      }
    })
  }

}
