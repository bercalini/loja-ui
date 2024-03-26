import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  usuarioUrl = 'http://localhost:8080/usuarios';

  salvar(usuario: Usuario) : Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.usuarioUrl}`, usuario);
  }

  listar() : Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.usuarioUrl}`);
  }

  buscarPorId(id: any) : Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.usuarioUrl}/${id}`);
  }

  atualizar(usuario: Usuario) : Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.usuarioUrl}/${usuario.id}`, usuario);
  }

  excluir(id: any) : Observable<Usuario> {
    return this.httpClient.delete<Usuario>(`${this.usuarioUrl}/${id}`);
  }

  inativar(usuario: Usuario) : Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.usuarioUrl}/inativar/${usuario.id}`, usuario);
  }

  ativar(usuario: Usuario) : Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.usuarioUrl}/ativar/${usuario.id}`, usuario);
  }

}
