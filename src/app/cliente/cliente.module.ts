import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteFormComponent } from './cliente-form/cliente-form.component';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { NgxMaskModule } from 'ngx-mask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { CleintePesquisaComponent } from './cleinte-pesquisa/cleinte-pesquisa.component';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    ClienteFormComponent,
    CleintePesquisaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    
    RouterModule,
    NgxMaskModule,
    CardModule,
    TooltipModule,
    ButtonModule,
    ToastModule,
    InputMaskModule,
    TableModule,
    TagModule,
    ToolbarModule,
    ConfirmDialogModule,
    
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ClienteFormComponent,
    CleintePesquisaComponent
  ]
})
export class ClienteModule { }
