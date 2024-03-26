import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Venda } from './venda';

@Injectable({
  providedIn: 'root'
})
export class VendaService {

  constructor(private httpClient: HttpClient) { }

  private urlVenda = 'http://localhost:8080/vendas'

  realizarVenda(venda: Venda) : Observable<Venda> {
    return this.httpClient.post<Venda>(`${this.urlVenda}`, venda);
  }

  listarVenda() : Observable<Venda[]> {
    return this.httpClient.get<Venda[]>(`${this.urlVenda}`);
  }

}
