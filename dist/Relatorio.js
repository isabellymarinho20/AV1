import * as fs from "fs";
export default class Relatorio {
    constructor() {
        this.conteudo = "";
    }
    gerarRelatorio(aeronave) {
        this.conteudo = "";
        this.conteudo += "===== RELATÓRIO FINAL =====\n";
        this.conteudo += "---------------------------\n";
        this.conteudo += "----AERONAVE:----\n";
        this.conteudo += "Código: " + aeronave.codigo + "\n";
        this.conteudo += "Modelo: " + aeronave.modelo + "\n";
        this.conteudo += "Tipo: " + aeronave.tipo + "\n";
        this.conteudo += "Capacidade: " + aeronave.capacidade + "\n";
        this.conteudo += "Alcance: " + aeronave.alcance + "\n";
        this.conteudo += "---------------------------\n";
        this.conteudo += "PEÇAS:\n";
        if (aeronave.pecas.length === 0) {
            this.conteudo += "Nenhuma peça cadastrada.\n";
        }
        else {
            aeronave.pecas.forEach(p => {
                this.conteudo += p.nome + " - " + p.tipo + " - " + p.status + "\n";
            });
        }
        this.conteudo += "---------------------------\n";
        this.conteudo += "ETAPAS:\n";
        if (aeronave.etapas.length === 0) {
            this.conteudo += "Nenhuma etapa cadastrada.\n";
        }
        else {
            aeronave.etapas.forEach(e => {
                this.conteudo += e.nome + " - " + e.status + "\n";
            });
        }
        this.conteudo += "---------------------------\n";
        this.conteudo += "TESTES:\n";
        if (aeronave.testes.length === 0) {
            this.conteudo += "Nenhum teste cadastrado.\n";
        }
        else {
            aeronave.testes.forEach(t => {
                this.conteudo += t.tipo + " - " + t.resultado + "\n";
            });
        }
        this.conteudo += "---------------------------\n";
        console.log("Relatorio gerado!");
    }
    salvarEmArquivo() {
        fs.writeFileSync("relatorio.txt", this.conteudo);
        console.log("Relatorio salvo!");
    }
}
