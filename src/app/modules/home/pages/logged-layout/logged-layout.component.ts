import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.scss']
})
export class LoggedLayoutComponent implements OnInit {

  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit(): void {
    if(this.route.url === '/app') {
      this.route.navigate(['app/dashboard']);
    }
  }

}
