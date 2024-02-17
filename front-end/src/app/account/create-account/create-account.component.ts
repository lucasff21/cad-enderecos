import { AccountService } from './../shared/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  account = {
    email: '',
    password: '',
  }
  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  async onSubmit(){
    try{
      const result = await this.accountService.createAccount(this.account);

      this.router.navigate(['login']);
      console.log(result)
    }catch (error){
      console.error(error);
    }
  }



}
