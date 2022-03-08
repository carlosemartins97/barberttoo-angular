import { Component, OnInit } from '@angular/core';
import { faBars, faClipboardList, faNewspaper, faUsers, faWrench } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ServicesService } from 'src/app/core/services/services.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faClipboardList = faClipboardList;
  faWrench = faWrench;
  faUsers = faUsers;
  faNewspaper = faNewspaper;
  faBars = faBars;

  userName: string;
  id: number;
  isMenuOpened: boolean = false;
  openMenuClass = 'close';

  constructor(private service: ServicesService, private auth: AuthService) { 
    var dataToken = sessionStorage.getItem('jwtLogin');
    dataToken ? this.userName = JSON.parse(dataToken).nome : null;

  }

  ngOnInit(): void {
    this.id = this.auth.getUserInfo().id;
    this.auth.name.subscribe(nome => {
      this.userName = nome;
    })
  }

  onLogout() {
    this.auth.logout();
  }

  toggleMenu() {
    if(this.isMenuOpened) {
      this.isMenuOpened = false;
      this.openMenuClass = 'close';
    } else {
      this.isMenuOpened = true;
      this.openMenuClass = 'open';
    }
  }

}
