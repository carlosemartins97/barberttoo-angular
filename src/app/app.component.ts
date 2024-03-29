import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    // this.service.init();
    //validando se existe um token salvo e redirecionando pro login
    const jwt = sessionStorage.getItem('jwtLogin');
    if (jwt) {
      JSON.parse(jwt).token ? this.route.navigate(['app']) : this.route.navigate(['/']);
    } else if(!(location.pathname === '/register') && !(location.pathname === '/')) {
      this.route.navigate(['/']);
    }
  }
  
}
