import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    ProdutoFormComponent,
    ProdutoPesquisaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CardModule,
    ToastModule,
    ButtonModule,
    InputNumberModule,
    ToolbarModule,
    TableModule,
    ConfirmDialogModule
  ],
  exports: [
    ProdutoFormComponent,
    ProdutoPesquisaComponent
  ]
})
export class ProdutoModule { }
