import { Component, OnInit } from '@angular/core';
import { faClipboardList, faUsers, faWrench } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faClipboardList = faClipboardList;
  faWrench = faWrench;
  faUsers = faUsers;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.auth.logout();
  }

}
