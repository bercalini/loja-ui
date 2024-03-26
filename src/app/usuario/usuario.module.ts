import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { NgxMaskModule } from 'ngx-mask';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { PasswordModule } from 'primeng/password';
import { UsuarioPesquisaComponent } from './usuario-pesquisa/usuario-pesquisa.component';

import { ConfirmPopupModule } from 'primeng/confirmpopup';

import {  } from 'primeng/confirmpopup';

@NgModule({
  declarations: [
    UsuarioFormComponent,
    UsuarioPesquisaComponent
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
    PasswordModule,
    ConfirmDialogModule,
    ConfirmPopupModule
  ],
  exports: [
    UsuarioFormComponent
  ]
})
export class UsuarioModule { }
