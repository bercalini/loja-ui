import { Component, OnInit } from '@angular/core';
import { Venda } from '../venda';
import { VendaService } from '../venda.service';

@Component({
  selector: 'app-venda-pesquisa',
  templateUrl: './venda-pesquisa.component.html',
  styleUrls: ['./venda-pesquisa.component.css']
})
export class VendaPesquisaComponent implements OnInit{

  vendas: Venda[] = [];

  constructor(
    private vendaService: VendaService
  ) {

  }

  ngOnInit(): void {
      this.listarVendas();
  }

  listarVendas() {
    this.vendaService.listarVenda().subscribe(response => {
      this.vendas = response;
      console.log(this.vendas);
    });
  }


}
