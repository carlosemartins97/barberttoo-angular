import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

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
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(10),
      Validators.maxLength(11),
    ]),
    date: new FormControl('', [
      Validators.required
    ]),
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11)
    ]),
  })

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if(this.registerForm.valid) {
      this.loader = true;
      this.auth.register(this.registerForm.value);
    } else {
      alert('Preencha os campos do formulário corretamente!');
    }
  }

}
