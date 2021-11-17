import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //validando se existe um token salvo e redirecionando pro login
    const jwt = sessionStorage.getItem('jwtLogin');
    // if (this.auth.token || jwt) {
    //   this.route.navigate(['app']);
    // } else if(!(location.pathname === '/register') && !(location.pathname === '/')) {
    //   this.route.navigate(['/']);
    // }
  }
  
}
