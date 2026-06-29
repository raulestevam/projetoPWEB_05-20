"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executarComandoSQL = executarComandoSQL;
exports.inicializarBanco = inicializarBanco;
const mysql2_1 = __importDefault(require("mysql2"));
const carroRepository_1 = require("../repositories/carroRepository");
const clienteRepository_1 = require("../repositories/clienteRepository");
const estoqueRepository_1 = require("../repositories/estoqueRepository");
const notaFiscalRepository_1 = require("../repositories/notaFiscalRepository");
const vendedorRepository_1 = require("../repositories/vendedorRepository");
const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'mysql',
    //removido database - banco cria automaticamente
};
const mysqlConnection = mysql2_1.default.createConnection(dbConfig);
mysqlConnection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        throw err;
    }
    console.log('Conexão bem-sucedida com o banco de dados MySQL');
});
function executarComandoSQL(query, valores) {
    return new Promise((resolve, reject) => {
        mysqlConnection.query(query, valores, (err, resultado) => {
            if (err) {
                console.error('Erro ao executar a query.', err);
                reject(err);
            }
            resolve(resultado);
        });
    });
}
async function inicializarBanco() {
    console.log('Sincronizando schemas do banco de dados...');
    try {
        await executarComandoSQL('CREATE DATABASE IF NOT EXISTS `projetoPWEB`', []);
        await executarComandoSQL('USE `projetoPWEB`', []);
        console.log('Conectado ao schema: projetoPWEB');
        const schemas = [
            carroRepository_1.carroRepository.getCreateTableQuery(),
            clienteRepository_1.clienteRepository.getCreateTableQuery(),
            vendedorRepository_1.vendedorRepository.getCreateTableQuery(),
            estoqueRepository_1.estoqueRepository.getCreateTableQuery(),
            notaFiscalRepository_1.notaFiscalRepository.getCreateTableQuery(),
        ];
        for (const query of schemas) {
            await executarComandoSQL(query, []);
        }
        console.log('Todos os repositórios foram inicializados com sucesso.');
    }
    catch (err) {
        console.error('Erro crítico na sincronização dos repositórios:', err);
        process.exit(1);
    }
}
