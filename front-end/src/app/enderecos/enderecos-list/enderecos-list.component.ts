import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Endereco } from '../model/endereco';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enderecos-list',
  templateUrl: './enderecos-list.component.html',
  styleUrls: ['./enderecos-list.component.css']
})
export class EnderecosListComponent implements OnInit{

  @Input() enderecos: Endereco[] = [];
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  displayedColumns = ['nome', 'cep', 'logradouro', 'complemento', 'bairro', 'localidade', 'uf', 'actions' ]

  constructor(
    private router: Router,
  ){}

  ngOnInit(): void {
  }

  onEdit(endereco: Endereco ){
    this.router.navigate(['editar', endereco.id])
    //this.edit.emit(endereco)
  }

  onRemove(endereco: Endereco){
    this.remove.emit(endereco);
  }
}
