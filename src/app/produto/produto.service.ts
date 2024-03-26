import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from './produto';
import { Observable } from 'rxjs';
import { Pagamento } from '../venda/pagamento';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private httpClient: HttpClient
  ) { }

    private urlProduto = 'http://localhost:8080/produtos';
    private urlPagamento = 'http://localhost:8080/formapagamentos'

    salvarProduto(produto: Produto) : Observable<Produto> {
      return this.httpClient.post<Produto>(`${this.urlProduto}`, produto);
    }

    listarProdutos() : Observable<Produto[]> {
      return this.httpClient.get<Produto[]>(`${this.urlProduto}`);
    }

    buscarPorId(id: any) : Observable<Produto> {
      return this.httpClient.get<Produto>(`${this.urlProduto}/${id}`);
    }

    editarProduto(produto: Produto) : Observable<Produto> {
      return this.httpClient.put<Produto>(`${this.urlProduto}/${produto.id}`, produto);
    }

    excluirProduto(id: any) : Observable<Produto> {
      return this.httpClient.delete<Produto>(`${this.urlProduto}/${id}`);
    }

    listarPagamentos() : Observable<Pagamento[]> {
      return this.httpClient.get<Pagamento[]>(`${this.urlPagamento}`);
    }

    buscarPagamentoPorId(id: any) : Observable<Pagamento> {
      return this.httpClient.get<Pagamento>(`${this.urlPagamento}/${id}`);
    }
}
