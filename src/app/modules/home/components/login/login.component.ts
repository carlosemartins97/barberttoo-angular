import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {;

  loader = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    rememberData: new FormControl(''),
  })

  constructor(private auth: AuthService) { }
  
  ngOnInit(): void {
  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.loader = true;
      this.auth.login(this.loginForm.value);
      this.loader = false;
    }
  }

}
