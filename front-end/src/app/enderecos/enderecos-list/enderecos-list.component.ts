import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Endereco } from '../model/endereco';
import { Router } from '@angular/router';
import { EnderecosService } from '../services/enderecos.service';

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
    private enderecoService: EnderecosService,

  ){}

  ngOnInit(): void {
  }

  findAll(){
    this.enderecoService.findAll().subscribe({
      next: (endrecosList) => {
        this.enderecos = endrecosList
      }
    })
  }

  onEdit(endereco: Endereco ){
    this.router.navigate(['editar', endereco.id])
    //this.edit.emit(endereco)
  }

  onRemove(endereco: Endereco){
    this.enderecoService.remove(endereco.id).subscribe({
      next: () =>  {
        this.findAll()
      }
    })
  }
}
