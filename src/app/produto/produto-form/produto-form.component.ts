import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { MessageService } from 'primeng/api';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.css']
})
export class ProdutoFormComponent implements OnInit{

  id: any;
  produto: Produto;

  constructor(
    private messageService: MessageService,
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.produto = new Produto();
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.buscarProdutoPorId();
    }
  }

  onSubmit() {
    if (!this.id) {
      this.produtoService.salvarProduto(this.produto).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Produto salvo', detail: 'Produto salvo' });
        this.produto = new Produto();
      });
    }
    this.editarProduto();
  }

  buscarProdutoPorId() {
    this.produtoService.buscarPorId(this.id).subscribe(response => {
      this.produto = response;
    });
  }

  editarProduto() {
    this.produtoService.editarProduto(this.produto).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Produto editado', detail: 'Produto editado' });
      this.router.navigate(['/produto-pesquisa']);
    });
  }


}
