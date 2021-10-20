import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { HomeRoutingModule } from './home-routing.module';
import { RegisterComponent } from './pages/register/register.component';




@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    LoaderComponent,
    RegisterFormComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
  ],
  providers: []
})
export class HomeModule { }
