import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"task",component:HomeComponent},
  // {path:"task",component:HomeComponent,canActivate: [authGuard] },
  {path:"signup",component:SignupComponent},
  {path:"**",component:LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
