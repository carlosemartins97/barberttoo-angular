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
import { FooterComponent } from 'src/app/core/footer/footer.component';
import { ServicesComponent } from './pages/services/services.component';
import { CardServiceComponent } from './components/card-service/card-service.component';
import { ServicesService } from 'src/app/core/services/services.service';
import { CreateServiceComponent } from './pages/services/create-service/create-service.component';
import { CreateAgendamentoComponent } from './pages/dashboard/create-agendamento/create-agendamento.component';
import { AtendentesComponent } from './pages/atendentes/atendentes.component';
import { CardAtendentesComponent } from './components/card-atendentes/card-atendentes.component';
import { CreateAtendenteComponent } from './pages/atendentes/create-atendente/create-atendente.component';
import { DetailsAgendamentoComponent } from './pages/dashboard/details-agendamento/details-agendamento.component';





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
    FooterComponent,
    ServicesComponent,
    CardServiceComponent,
    CreateServiceComponent,
    CreateAgendamentoComponent,
    AtendentesComponent,
    CardAtendentesComponent,
    CreateAtendenteComponent,
    DetailsAgendamentoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgxMaskModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [
  ]
})
export class HomeModule { }
