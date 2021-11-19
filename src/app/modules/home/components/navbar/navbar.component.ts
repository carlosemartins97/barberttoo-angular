import { Component, OnInit } from '@angular/core';
import { faClipboardList, faUsers, faWrench } from '@fortawesome/free-solid-svg-icons';
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

  userName: string;
  id: number;

  constructor(private service: ServicesService, private auth: AuthService) { 
    var dataToken = sessionStorage.getItem('jwtLogin');
    dataToken ? this.userName = JSON.parse(dataToken).nome : null;

  }

  ngOnInit(): void {
    this.id = this.auth.getUserInfo().id;
    this.auth.name.subscribe(nome => {
      console.log('emiti um valor');
      this.userName = nome;
    })
  }

  onLogout() {
    this.auth.logout();
  }

}