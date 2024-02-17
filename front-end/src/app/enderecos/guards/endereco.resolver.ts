import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Endereco } from '../model/endereco';
import { EnderecosService } from '../services/enderecos.service';

@Injectable({
  providedIn: 'root'
})
export class EnderecoResolver implements Resolve<Endereco> {


  constructor(
    private service: EnderecosService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Endereco> {
    if(route.params && route.params['id']){
        return this.service.findById(route.params['id'])
    }
    return of({id: '', nome: '', cep: '', logradouro:'', complemento:'', bairro:'', localidade:'', uf:''});
  }
}
