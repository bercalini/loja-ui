import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';
import { Pagamento } from '../venda/pagamento';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlCliente = 'http://localhost:8080/clientes'

  constructor(private httpClient: HttpClient) {}

  buscarCep(cep:any) : Observable<any> {
    return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }

  salvar(cliente: Cliente) : Observable<Cliente> {
    return this.httpClient.post<Cliente>(`${this.urlCliente}`, cliente);
  }

  listarClientes() : Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.urlCliente);
  }

  buscarCliente(id: any) : Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.urlCliente}/${id}`);
  }

  atualizarCliente(cliente: Cliente) : Observable<Cliente> {
     return this.httpClient.put<Cliente>(`${this.urlCliente}/${cliente.id}`, cliente);
  }

  excluirCliente(id: any) : Observable<Cliente> {
    return this.httpClient.delete<Cliente>(`${this.urlCliente}/${id}`);
  }

}
