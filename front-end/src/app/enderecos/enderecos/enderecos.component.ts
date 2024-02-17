import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Endereco } from '../model/endereco';
import { EnderecosService } from '../services/enderecos.service';

@Component({
  selector: 'app-enderecos',
  templateUrl: './enderecos.component.html',
  styleUrls: ['./enderecos.component.css']
})
export class EnderecosComponent implements OnInit {

  enderecos$: Observable<Endereco[]>;

  constructor(
    private enderecoService: EnderecosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    ) {
    this.enderecos$ = this.enderecoService.findAll();
  }



  ngOnInit(): void {
  }

  onEdit(endereco: Endereco){
    this.router.navigate(['editar', endereco.id], {relativeTo: this.route})
  }

  refresh(){
    this.enderecos$ = this.enderecoService.findAll();
  }

  onRemove(endereco: Endereco){
    this.enderecoService.remove(endereco.id).subscribe(
      () => {
        this.refresh();
        this.snackBar.open('Curso salvo com sucesso!', '', { duration: 3000,
        verticalPosition: 'top',
      horizontalPosition: 'center' });
      });
  }

  removeLocal(){
    localStorage.removeItem('token');
    window.location.reload();
  }
}


