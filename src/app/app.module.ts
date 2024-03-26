import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';

import { TemplateModule } from './template/template.module';
import { ClienteModule } from './cliente/cliente.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProdutoModule } from './produto/produto.module';
import { VendaModule } from './venda/venda.module';

import { CommonModule } from '@angular/common'; 

import { RadioButtonModule } from 'primeng/radiobutton';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    RadioButtonModule,

    TemplateModule,
    ClienteModule,
    UsuarioModule,
    ProdutoModule,
    VendaModule,

    CommonModule
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
