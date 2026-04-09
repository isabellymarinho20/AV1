import * as fs from "fs";
export default class Teste {
    constructor(tipo, resultado) {
        this.tipo = tipo;
        this.resultado = resultado;
    }
    salvar() {
        let teste = [];
        if (fs.existsSync("testes.json")) {
            const jsonF = fs.readFileSync("testes.json", "utf-8");
            teste = JSON.parse(jsonF);
        }
        teste.push(this);
        fs.writeFileSync("testes.json", JSON.stringify(teste));
    }
    carregar() {
        console.log('...Carregando dados do teste...');
    }
}
