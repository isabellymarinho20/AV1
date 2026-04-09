import * as fs from "fs";
export default class Aeronave {
    constructor(codigo, modelo, tipo, capacidade, alcance) {
        this.codigo = codigo;
        this.modelo = modelo;
        this.tipo = tipo;
        this.capacidade = capacidade;
        this.alcance = alcance;
        this.pecas = [];
        this.etapas = [];
        this.testes = [];
    }
    detalhes() {
        console.log("===== DETALHES DA AERONAVE =====");
        console.log("-------------------------------");
        console.log("Codigo:", this.codigo);
        console.log("Modelo:", this.modelo);
        console.log("Tipo:", this.tipo);
        console.log("Capacidade:", this.capacidade);
        console.log("Alcance:", this.alcance);
        console.log("-------------------------------");
        console.log("PEÇAS:");
        if (this.pecas.length === 0) {
            console.log("Nenhuma peça cadastrada.");
        }
        else {
            this.pecas.forEach(p => {
                console.log(p.nome + " - " + p.tipo + " - " + p.status);
            });
        }
        console.log("-------------------------------");
        console.log("ETAPAS:");
        if (this.etapas.length === 0) {
            console.log("Nenhuma etapa cadastrada.");
        }
        else {
            this.etapas.forEach(e => {
                console.log(e.nome + " - " + e.status);
            });
        }
        console.log("-------------------------------");
        console.log("TESTES:");
        if (this.testes.length === 0) {
            console.log("Nenhum teste cadastrado.");
        }
        else {
            this.testes.forEach(t => {
                console.log(t.tipo + " - " + t.resultado);
            });
        }
        console.log("-------------------------------");
    }
    salvar() {
        let aeronaves = [];
        if (fs.existsSync("aeronaves.json")) {
            const jsonF = fs.readFileSync("aeronaves.json", "utf-8");
            aeronaves = JSON.parse(jsonF);
        }
        const idx = aeronaves.findIndex(a => a.codigo === this.codigo);
        if (idx >= 0) {
            aeronaves[idx] = this;
        }
        else {
            aeronaves.push(this);
        }
        fs.writeFileSync("aeronaves.json", JSON.stringify(aeronaves));
    }
    carregar() {
        console.log('...Carregando dados do funcionario...');
    }
}
