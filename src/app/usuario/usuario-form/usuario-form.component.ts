import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit{

  id: any;
  usuario: Usuario;
  confirmarSenha: any;

  constructor(
    private usuarioService: UsuarioService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.buscarPorId();
    }
  }

  onSubmit() {
    if (this.usuario.senha === this.confirmarSenha) {
      if (!this.id) {
        this.usuarioService.salvar(this.usuario).subscribe(() => {
          this.messageService.add({ severity: 'success', summary: 'Usuario salvo', detail: 'Usuario salvo' });
          this.usuario = new Usuario();
          this.confirmarSenha = '';
        });
      } else {
        this.atualizar();
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'senha diferente', detail: 'senha diferente' });
    }
  }  

  buscarPorId() {
    return this.usuarioService.buscarPorId(this.id).subscribe(response => {
      this.usuario = response;
    });
  }

  atualizar() {
    this.usuarioService.atualizar(this.usuario).subscribe(response => {
      this.router.navigate(['/usuario-pesquisa']);
      this.messageService.add({ severity: 'success', summary: 'atualizado com sucesso', detail: 'atualizado com sucesso', life: 3000});
    });
  }

}
