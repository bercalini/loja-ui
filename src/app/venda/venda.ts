import { ClienteVenda } from "./clienteVenda";
import { ItensVenda } from "./itensVenda";
import { PagamentosVenda } from "./pagamentosVenda";

export class Venda {
    id?: any;
    itensVenda: ItensVenda[] = [];
    pagamentosVenda: PagamentosVenda[] = [];
    cliente = new ClienteVenda();
}