import { EnderecosComponent } from './enderecos/enderecos/enderecos.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { LoginComponent } from './account/login/login.component';
import { AuthenticationComponent } from './layout/authentication/authentication.component';
import { HomeComponent } from './layout/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './account/shared/auth.guard';
import { EnderecosFormComponent } from './enderecos/enderecos-form/enderecos-form.component';
import { EnderecoResolver } from './enderecos/guards/endereco.resolver';
import { EnderecosListComponent } from './enderecos/enderecos-list/enderecos-list.component';



const routes: Routes = [



  {
    path: '',
    component: HomeComponent,
    children:[
      { path: '', component: EnderecosComponent },
      { path: 'new', component: EnderecosFormComponent, resolve: {endereco: EnderecoResolver}},
      { path: 'editar/:id', component: EnderecosFormComponent,  resolve: {endereco: EnderecoResolver}},
    /*  { path: 'listar', component: EnderecosComponent}, */
    /*  { path: 'criar', component: EnderecosFormComponent}, */
     /* { path: 'editar/:id', component: EnderecosFormEditComponent,  resolve: {endereco: EnderecoResolver}},*/
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children:[
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'create-account', component: CreateAccountComponent},
    ],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
