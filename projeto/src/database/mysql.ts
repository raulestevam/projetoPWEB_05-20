import mysql, { Connection } from 'mysql2';

import { carroRepository } from '../repositories/carroRepository';
import { clienteRepository } from '../repositories/clienteRepository';
import { estoqueRepository } from '../repositories/estoqueRepository';
import { notaFiscalRepository } from '../repositories/notaFiscalRepository';
import { vendedorRepository } from '../repositories/vendedorRepository';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    //removido database - banco cria automaticamente
};

const mysqlConnection: Connection = mysql.createConnection(dbConfig);

mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexão bem-sucedida com o banco de dados MySQL');
});

export function executarComandoSQL(query: string, valores: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}

export async function inicializarBanco(): Promise<void> {
    console.log('Sincronizando schemas do banco de dados...');
    
    try {
        await executarComandoSQL('CREATE DATABASE IF NOT EXISTS `projetoPWEB`', []);
        await executarComandoSQL('USE `projetoPWEB`', []);
        console.log('Conectado ao schema: projetoPWEB');

        const schemas = [
            carroRepository.getCreateTableQuery(),
            clienteRepository.getCreateTableQuery(),
            vendedorRepository.getCreateTableQuery(),  
            estoqueRepository.getCreateTableQuery(),
            notaFiscalRepository.getCreateTableQuery(), 
        ];

        for (const query of schemas) {
            await executarComandoSQL(query, []);
        }
        console.log('Todos os repositórios foram inicializados com sucesso.');
    } catch (err) {
        console.error('Erro crítico na sincronização dos repositórios:', err);
        process.exit(1);
    }
}