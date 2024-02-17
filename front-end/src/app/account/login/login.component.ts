import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = {
    email: '',
    password: '',
  };

  constructor( private accountService: AccountService, private router: Router) {

  }

  ngOnInit() {}

  async onSubmit(){
    try{
      const result = await this.accountService.login(this.login);
      console.log(`Login efetuado: ${result}`);

      //retorno para a rota vazia novamente, no caso a home
      this.router.navigate(['']);
    } catch(error){
      console.error(error);
    }
  }
}
