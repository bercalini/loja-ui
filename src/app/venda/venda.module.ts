import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { VendaCadastroComponent } from './venda-cadastro/venda-cadastro.component';
import { VendaPesquisaComponent } from './venda-pesquisa/venda-pesquisa.component';

import { CardModule } from 'primeng/card';
import { PickListModule } from 'primeng/picklist';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { CarouselModule } from 'primeng/carousel';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
  declarations: [
    VendaCadastroComponent,
    VendaPesquisaComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,

    CardModule,
    PickListModule,
    DialogModule,
    ButtonModule,
    TabViewModule,
    CarouselModule,
    TooltipModule,
    CheckboxModule,
    DropdownModule,
    TableModule,
    ToastModule,
    ToolbarModule
  ],
  exports: [
    VendaCadastroComponent,
    VendaPesquisaComponent
  ]
})
export class VendaModule { }
