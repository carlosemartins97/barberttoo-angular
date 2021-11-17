import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeRoutingModule } from './home-routing.module';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxMaskModule } from 'ngx-mask';
import { LoggedLayoutComponent } from './pages/logged-layout/logged-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from './components/card/card.component';





@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    LoaderComponent,
    RegisterFormComponent,
    RegisterComponent,
    DashboardComponent,
    LoggedLayoutComponent,
    NavbarComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule
  ],
  providers: []
})
export class HomeModule { }
