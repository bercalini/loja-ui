import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { Route, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit{

  usuarios: Usuario[] = [];
  selecionarUsuario: any;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    ) {}

  ngOnInit(): void {
    this.listarUsuarios();     
  }

  confirm() {
    if (this.selecionarUsuario.id) {
      this.confirmationService.confirm({
          header: 'Deseja excluir?',
          message: 'Por favor conclue se sim',
          accept: () => {
              this.excluirUsuario();
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'cancelado', detail: 'vc cancelou a exclusão', life: 3000 });
          }
      });
    }
  }

  excluirUsuario() {
    this.usuarioService.excluir(this.selecionarUsuario.id).subscribe(response => {
      this.listarUsuarios();
      this.messageService.add({ severity: 'success', summary: 'Excluido com sucesso', detail: 'Excluido com sucesso', life: 3000 });
    });
  }


  editar() {
    if (this.selecionarUsuario.id) {
      this.router.navigate(['/usuario-cadastro/', this.selecionarUsuario.id]);
    }
  }

  listarUsuarios() {
    this.usuarioService.listar().subscribe(response => {
      this.usuarios = response;
    }); 
  }

  status(usuario: Usuario) {
    if (usuario.situacao === 'ATIVO') {
      return "success";
    } else {
      return "warning";
    }
  }

  mudarStatus(event: any, usuario: Usuario) {
    let acao: 'ativar' | 'inativar';
    let mensagem: string;

    if (usuario.situacao === 'ATIVO') {
        acao = 'inativar';
        mensagem = 'Deseja inativar o usuário?';
    } else {
        acao = 'ativar';
        mensagem = 'Deseja ativar o usuário?';
    }

    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: mensagem,
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass: 'p-button-danger p-button-sm',
        accept: () => {
            if (acao === 'inativar') {
                this.inativar(usuario);
            } else {
                this.ativar(usuario);
            }
        },
        reject: () => {
            this.messageService.add({ severity: 'info', summary: 'Rejected', detail: 'Você cancelou a operação', life: 3000 });
        }
    });
  }

  inativar(usuario: Usuario) {
    this.usuarioService.inativar(usuario).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'usuario inativo', life: 3000 });
      this.listarUsuarios();
    });
  }

  ativar(usuario: Usuario) {
    this.usuarioService.ativar(usuario).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'usuario ativo', life: 3000 });
      this.listarUsuarios();
    });
  }

}
