import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Endereco } from '../model/endereco';


@Injectable({
  providedIn: 'root'
})
export class EnderecosService {


  constructor(private httpClient: HttpClient) { }

  findAll() {
    return this.httpClient.get<Endereco[]>(`${environment.api}/api/auth/enderecos`)
      .pipe(
        first(),
        delay(1000),
      );
  }

  findById(id: string){
    return this.httpClient.get<Endereco>(`${environment.api}/api/auth/enderecos/${id}`);
  }

  save(endereco: Partial<Endereco>) {
    // console.log(record);
    if (endereco.id) {
      // console.log('update');
      return this.update(endereco);
    } else {
      return this.create(endereco);
    }
    // console.log('create');

  }

  private create(endereco: Partial<Endereco>){
   return this.httpClient.post<Endereco>(`${environment.api}/api/auth/enderecos`, endereco);
  }

  private update(endereco: Partial<Endereco>){
    return this.httpClient.put<Endereco>(`${environment.api}/api/auth/enderecos/${endereco.id}`, endereco);
  }

  remove(id: string){
    return this.httpClient.delete<Endereco>(`${environment.api}/api/auth/enderecos/${id}`);
  }


}
