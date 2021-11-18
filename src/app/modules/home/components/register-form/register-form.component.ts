import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';


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

  estados: {sigla: string, nome: string}[] = [];

  constructor(private auth: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    const apiEstados = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
    this.http.get<{sigla: string, nome: string}[]>(apiEstados).subscribe({
      next: res => {
        this.estados = res.sort((a, b) => a.nome.localeCompare(b.nome));
      },
      error: error => {
        console.log(error);
      }
    })
  }

  onSubmit() {
    this.submitted = true;
    if(this.mode === 'atendente') {
      if(this.registerAtendForm.valid) {
        this.loader = true;
        this.auth.register(this.registerAtendForm.value, this.mode);
      } else {
        alert('Preencha os campos do formulário corretamente!');
        this.loader = false;
      }
    } else {
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
