import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoggedLayoutComponent } from './pages/logged-layout/logged-layout.component';

const appRoutes = [
  {path: '', component: HomeComponent, preMatch: 'full'},
  {path: 'register', component: RegisterComponent},
  {path: 'app', component: LoggedLayoutComponent, children: [
    {path: 'dashboard', component: DashboardComponent}
  ]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
