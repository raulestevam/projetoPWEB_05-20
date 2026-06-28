import { Cliente } from "../models/Cliente";

export class clienteRepository {
    private static instance: clienteRepository;
    private clienteLista: Cliente[] = [];

    static getCreateTableQuery(): string {
    return `
        CREATE TABLE IF NOT EXISTS Cliente (
            id_cliente      BIGINT PRIMARY KEY,
            nome            VARCHAR(150) NOT NULL,
            cpf             VARCHAR(14) NOT NULL UNIQUE,
            telefone        VARCHAR(20) NOT NULL,
            email           VARCHAR(150),
            cidade          VARCHAR(100)
        );
    `;
}

    private constructor() {}

    public static getInstance(): clienteRepository {
        if(!this.instance){
            this.instance = new clienteRepository();
        }
        return this.instance;
    }

    inserirCliente(cliente: Cliente) {
        this.clienteLista.push(cliente);
    }

    mostrarClientes(): Cliente[] {
        return this.clienteLista;
    }

    buscarCliente(id: number): Cliente|undefined {
        return this.clienteLista.find(cliente => cliente.id_cliente === id);
    }

    atualizarCliente(clienteAtualizado: Cliente) {
        const clienteIndex = this.clienteLista.findIndex(cliente => cliente.id_cliente === clienteAtualizado.id_cliente);
        
        if (clienteIndex !== -1) {
            this.clienteLista[clienteIndex] = clienteAtualizado;
        }
    }
    
    deletarCliente(id: number) {
        const clienteIndex = this.clienteLista.findIndex(cliente => cliente.id_cliente === id);
        
        if (clienteIndex !== -1) {
            this.clienteLista.splice(clienteIndex, 1);
        }
    }
}