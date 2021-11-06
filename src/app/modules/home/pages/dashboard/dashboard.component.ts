import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Auth, AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    //validando se existe um token salvo e redirecionando pro login
    const jwt = sessionStorage.getItem('jwtLogin');
    if (!this.auth.token && !jwt) {
      this.route.navigate(['']);
    }
  }

}
