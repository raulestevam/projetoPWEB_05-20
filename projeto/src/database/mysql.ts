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
    database: 'projetoPWEB_06-19'
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
    
    const schemas = [ //criar cada uma das tabelas no repository para cada ator;
        carroRepository.getCreateTableQuery(),
        clienteRepository.getCreateTableQuery(),
        estoqueRepository.getCreateTableQuery(),
        notaFiscalRepository.getCreateTableQuery(),
        vendedorRepository.getCreateTableQuery(),
    ];
    
    try {
        
        await executarComandoSQL(`USE ${dbConfig.database}`, []);
        console.log(`Conectado ao schema: ${dbConfig.database}`);

        for (const query of schemas) {
            await executarComandoSQL(query, []);
        }
        console.log('Todos os repositórios foram inicializados com sucesso.');
    } catch (err) {
        console.error('Erro crítico na sincronização dos repositórios:', err);
        process.exit(1);
    }
}