import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EnderecosService } from '../services/enderecos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endereco } from '../model/endereco';


@Component({
  selector: 'app-enderecos-form',
  templateUrl: './enderecos-form.component.html',
  styleUrls: ['./enderecos-form.component.css']
})
export class EnderecosFormComponent implements OnInit {

  form = this.formBuilder.group({
    id: [''],
    nome: [''],
    cep: [''],
    logradouro:[''],
    complemento:[''],
    bairro:[''],
    localidade:[''],
    uf:['']
  })

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: EnderecosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public router: Router){

  }

  ifRouter(){
    return this.router.url === '/new';
  }

  ifRouter2(){
    return this.router.url != '/new'
  }

  ngOnInit(): void {
    const endereco: Endereco = this.route.snapshot.data['endereco'];
    this.form.patchValue({
      id: endereco.id,
      nome: endereco.nome,
      cep: endereco.cep,
      logradouro: endereco.logradouro,
      complemento: endereco.complemento,
      bairro: endereco.bairro,
      localidade: endereco.localidade,
      uf: endereco.uf
    })
  }

  onCancel() {
    this.location.back();
  }

  onSubmit(){
      this.service.save(this.form.value)
        .subscribe({
          next: (result) => this.onSuccess,
          error: (error) => this.onError(),
          complete: ()=> this.onCancel()
       });
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso!', '', { duration: 1000 });
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso. Você não tem Permissões do SISTEMA', '', { duration: 5000 });
  }

}
