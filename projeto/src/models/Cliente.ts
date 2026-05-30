export class Cliente {
    id_cliente: number;
    nome: string;
    cpf: string;
    telefone: string;
    email: string;
    cidade: string;

    constructor(id_cliente: number, nome: string, cpf: string, telefone: string, email: string, cidade: string){
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
        this.email = email;
        this.cidade = cidade;
        this.id_cliente = Date.now();
    }
}