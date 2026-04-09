import * as fs from "fs";
export default class Peca {
    constructor(nome, tipo, fornecedor, status) {
        this.nome = nome;
        this.tipo = tipo;
        this.fornecedor = fornecedor;
        this.status = status;
    }
    atualizarStatus(novoStatus) {
        this.status = novoStatus;
    }
    salvar() {
        let pecas = [];
        if (fs.existsSync("pecas.json")) {
            const jsonF = fs.readFileSync("pecas.json", "utf-8");
            pecas = JSON.parse(jsonF);
        }
        pecas.push(this);
        fs.writeFileSync("pecas.json", JSON.stringify(pecas));
    }
    carregar() {
        console.log('...Carregando dados da peca...');
    }
}
