import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-cleinte-pesquisa',
  templateUrl: './cleinte-pesquisa.component.html',
  styleUrls: ['./cleinte-pesquisa.component.css']
})
export class CleintePesquisaComponent implements OnInit{

  clientes: Cliente[] = [];
  selecionarCliente: any = {};

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
      this.listarClientes();
  }

  listarClientes() {
    this.clienteService.listarClientes().subscribe(resopnse => {
      this.clientes = resopnse;
    });
  }

  editar() {
    if (this.selecionarCliente.id != null) {
      this.router.navigate(['/cliente-cadastro/', this.selecionarCliente.id]);
    }
  }

  confirm() {
    if (this.selecionarCliente.id) {
      this.confirmationService.confirm({
          header: 'Deseja excluir?',
          message: 'Por favor conclue se sim',
          accept: () => {
              this.excluirCliente();
              this.messageService.add({ severity: 'info', summary: 'concluido', detail: 'Excluido com sucesso', life: 3000 });
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'cancelado', detail: 'vc cancelou a exclusão', life: 3000 });
          }
      });
    }
  }

  excluirCliente() {
   this.clienteService.excluirCliente(this.selecionarCliente.id).subscribe(response => {
    this.listarClientes();
   });   
  }

}
