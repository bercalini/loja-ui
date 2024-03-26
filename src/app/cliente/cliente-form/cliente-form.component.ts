import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit{

  cliente: Cliente;
  cep: any;
  id: any;

  constructor(
    private clienteService: ClienteService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
    ) {
    this.cliente = new Cliente();
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.buscarCliente(this.id);
    }
  }

  onSubmit() {
    if (!this.id) {
      this.clienteService.salvar(this.cliente).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Cliente salvo com sucesso', 
          detail: 'Cliente salvo com sucesso'});

          this.cliente = new Cliente();
      
        });
      } else {
        this.atualizarCliente();
      }   
  }

  buscarCep() {
    this.clienteService.buscarCep(this.cep).subscribe(response => {
      this.cliente.endereco.bairro = response.bairro;
      this.cliente.endereco.complemento = response.complemento;
      this.cliente.endereco.cidade = response.localidade;
      this.cliente.endereco.uf = response.uf;
      this.cliente.endereco.rua = response.logradouro;
    });
  }

  buscarCliente(id: any) {
    this.clienteService.buscarCliente(this.id).subscribe(response => {
      this.cliente = response;
    });
  }

  atualizarCliente() {
    this.clienteService.atualizarCliente(this.cliente).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Cliente atualizado com sucesso', 
          detail: 'Cliente atualizado com sucesso'});

          this.router.navigate(['/cliente-pesquisa']);
    });
  }

}
