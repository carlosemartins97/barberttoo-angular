import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './pages/register/register.component';

const appRoutes = [
  {path: '', component: HomeComponent, preMatch: 'full'},
  {path: 'register', component: RegisterComponent},
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
