import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-produto-pesquisa',
  templateUrl: './produto-pesquisa.component.html',
  styleUrls: ['./produto-pesquisa.component.css']
})
export class ProdutoPesquisaComponent implements OnInit{

  selecionarProduto: any;
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
      this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.listarProdutos().subscribe(response => {
      this.produtos = response;
    });
  }

  editar() {
    if (this.selecionarProduto.id) {
      this.router.navigate(['/produto-cadastro/', this.selecionarProduto.id])
    }
  }  

  confirm() {
    if (this.selecionarProduto.id) {
      this.confirmationService.confirm({
          header: 'Deseja excluir?',
          message: 'Por favor conclue se sim',
          accept: () => {
              this.excluirProduto();
          },
          reject: () => {
              this.messageService.add({ severity: 'error', summary: 'cancelado', detail: 'vc cancelou a exclusão', life: 3000 });
          }
      });
    }
  }

  excluirProduto() {
    this.produtoService.excluirProduto(this.selecionarProduto.id).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Produto excluido', detail: 'Produto excluido'});
      this.listarProdutos();
    });
  }

}
