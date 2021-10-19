import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';




@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class HomeModule { }
