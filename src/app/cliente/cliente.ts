import { endereco } from "./endereco";

export class Cliente {
    id?: number = 0;
    nome: string = '';
    email: string = '';
    rg: string = '';
    dataNascimento = '';
    cpf: string = '';
    celular: string = '';
    tipo: string = 'PESSOA_FISICA'
    endereco = new endereco()
}