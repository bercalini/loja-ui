import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/produto/produto';
import { ProdutoService } from 'src/app/produto/produto.service';
import { Venda } from '../venda';
import { ItensVenda } from '../itensVenda';
import { Pagamento } from '../pagamento';
import { PagamentosVenda } from '../pagamentosVenda';
import { ClienteService } from 'src/app/cliente/cliente.service';
import { Cliente } from 'src/app/cliente/cliente';
import { DropdownFilterOptions } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-venda-cadastro',
  templateUrl: './venda-cadastro.component.html',
  styleUrls: ['./venda-cadastro.component.css']
})
export class VendaCadastroComponent implements OnInit{

  produtos: Produto[] = [];
  produtosSelecionados: Produto[] = [];
  selectedProduct: Produto | null = null; 
  venda: Venda;
  quantidadeProduto: number = 1;
  displayDialog: boolean = false;
  valorTotal: number = 0;
  valorPago: number = 0;
  pagamentos: Pagamento[] = [];
  responsiveOptions: any[] | undefined;
  valorPagamento: any;
  dialogPagamento = false;
  valorTotalPagamento = false;
  pagamentoAux: Pagamento;
  clientes: Cliente[] = [];
  selectedCliente: Cliente;
  filterValue: string | undefined = '';


  constructor(
    private produtoService: ProdutoService,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private vendaService: VendaService
  ) {
    this.selectedProduct = new Produto();
    this.venda = new Venda();
    this.pagamentoAux = new Pagamento();
    this.selectedCliente = new Cliente();
  }

  ngOnInit(): void {
    this.listarProdutos();
    this.listarPagamentos();
    this.listarClientes();
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];  
  }

  

  listarProdutos() {
    this.produtoService.listarProdutos().subscribe(response => {
      this.produtos = response;
    });
    this.produtosSelecionados = [];
  }

  onMoveToTarget(event: any) {
    this.selectedProduct = event.items[0];
    
    this.displayDialog = true;
}

  cancelar() {
    this.selectedProduct = null;
    this.quantidadeProduto = 0;
    this.displayDialog = false;
}

adicionarProduto() {
  this.produtosSelecionados.forEach(produto => {
    if (!this.venda.itensVenda.some(item => item.produtoId === produto.id)) {
      let itemVenda = new ItensVenda();
      itemVenda.produtoId = produto.id;
      itemVenda.quantidade = this.quantidadeProduto;
      this.venda.itensVenda.push(itemVenda);

      this.valorTotal += produto.valor * this.quantidadeProduto;
    }
  });
  this.selectedProduct = null;
  this.displayDialog = false;
  this.quantidadeProduto = 1;
}

onMoveToSource(event: any) {
  const produtoRemovido = this.venda.itensVenda.find(item => item.produtoId === event.items[0].id);
  if (produtoRemovido) {
    this.produtoService.buscarPorId(produtoRemovido.produtoId).subscribe(response => {
      
      this.venda.itensVenda = this.venda.itensVenda.filter(item => item.produtoId !== event.items[0].id);
      this.valorTotal -= produtoRemovido.quantidade * response.valor;

    });
  }
}

listarPagamentos() {
  this.produtoService.listarPagamentos().subscribe(response => {
    this.pagamentos = response;
  });
}

adicionarPagamneto(pagamentoId: any) {
  this.dialogPagamento = true;
  this.produtoService.buscarPagamentoPorId(pagamentoId).subscribe(response => {
    this.pagamentoAux = response;
  });
}

cancelarPagamento() {
  this.dialogPagamento = false;
  this.valorPagamento = 0;
  this.valorTotalPagamento = false;
}

concluirPagamento() {
  this.dialogPagamento = false;
  if (!this.venda.pagamentosVenda.some(pagamento => pagamento.pagamentoId === this.pagamentoAux.id)) {
    if (this.valorTotalPagamento === false) {
      this.valorPago += this.valorPagamento;
    } else {
      this.valorPago = this.valorTotal;
    }
    const novoPagamento: PagamentosVenda = { pagamentoId: this.pagamentoAux.id, valorPago: this.valorPagamento };
    this.venda.pagamentosVenda.push(novoPagamento);
    console.log('aqui', this.venda);
  }
  this.valorPagamento = 0; 
}

verificarPagamento() {
  if(this.valorTotalPagamento === true) {
    this.valorPagamento = this.valorTotal;
  } 
}

listarClientes() {
  this.clienteService.listarClientes().subscribe(response => {
    this.clientes = response;
  });
}

resetFunction(options: any) {
  options.reset();
  this.filterValue = '';
}

customFilterFunction(event: KeyboardEvent, options: any) {
  options.filter(event);
}

onSubmit() {
  this.venda.cliente.id = this.selectedCliente.id;
  console.log(this.venda);
   this.vendaService.realizarVenda(this.venda).subscribe(response => {
    this.messageService.add({ severity: 'success', summary: 'Venda realizada com sucesso', detail: 'Venda realizada com sucesso' });
    this.venda = new Venda();
   });
}

}