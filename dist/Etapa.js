import { StatusEtapa } from "./enums.js";
export default class Etapa {
    constructor(nome, prazo, status, funcionarios) {
        this.nome = nome;
        this.prazo = prazo;
        this.status = status;
        this.funcionarios = [];
    }
    iniciar() {
        if (this.status === StatusEtapa.pendente || this.status === StatusEtapa.concluido) {
            this.status = StatusEtapa.andamento;
            console.log("Etapa iniciada!");
        }
        else {
            console.log("A etapa já foi iniciada ou concluida.");
        }
    }
    finalizar() {
        if (this.status === StatusEtapa.pendente || this.status === StatusEtapa.andamento) {
            this.status = StatusEtapa.concluido;
            console.log("Etapa concluida!");
        }
        else {
            console.log("A etapa já foi concluida");
        }
    }
    associarFuncionario(f) {
        let duplicado = false;
        for (let i = 0; i < this.funcionarios.length; i++) {
            if (this.funcionarios[i].id === f.id) {
                duplicado = true;
                break;
            }
        }
        if (!duplicado) {
            this.funcionarios.push(f);
        }
        else {
            console.log("Funcionario ja esta na etapa!");
        }
    }
    listarFuncionario() {
        if (this.funcionarios.length === 0) {
            console.log("Nenhum funcionario associado.");
            return [];
        }
        console.log("Funcionarios da etapa:");
        this.funcionarios.forEach(f => {
            console.log(f.id + " - " + f.nome);
        });
        return this.funcionarios;
    }
}
