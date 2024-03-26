import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { CleintePesquisaComponent } from './cliente/cleinte-pesquisa/cleinte-pesquisa.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioPesquisaComponent } from './usuario/usuario-pesquisa/usuario-pesquisa.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { ProdutoPesquisaComponent } from './produto/produto-pesquisa/produto-pesquisa.component';
import { VendaCadastroComponent } from './venda/venda-cadastro/venda-cadastro.component';
import { VendaPesquisaComponent } from './venda/venda-pesquisa/venda-pesquisa.component';

const routes: Routes = [
  {path: "cliente-cadastro", component: ClienteFormComponent},
  {path: "cliente-pesquisa", component: CleintePesquisaComponent},
  {path: 'cliente-cadastro/:id', component: ClienteFormComponent},

  {path: "usuario-cadastro", component: UsuarioFormComponent},
  {path: "usuario-cadastro/:id", component: UsuarioFormComponent},
  {path: "usuario-pesquisa", component: UsuarioPesquisaComponent},

  {path: "produto-cadastro", component: ProdutoFormComponent},
  {path: "produto-pesquisa", component: ProdutoPesquisaComponent},
  {path: "produto-cadastro/:id", component: ProdutoFormComponent},

  {path: "venda-cadastro", component: VendaCadastroComponent},
  {path: "venda-pesquisa", component: VendaPesquisaComponent}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
