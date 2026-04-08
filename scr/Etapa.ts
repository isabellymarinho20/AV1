import { StatusEtapa } from "./enums"
import Funcionario from "./Funcionario"

export default class Etapa{
    public nome:string
    public prazo:string
    public status: StatusEtapa
    public funcionarios: Array<Funcionario>

    constructor(nome:string,prazo:string,status: StatusEtapa,funcionarios: Array<Funcionario>){
        this.nome=nome
        this.prazo=prazo
        this.status=status
        this.funcionarios= []
    }

    iniciar(): void{
        if (this.status === StatusEtapa.pendente || this.status === StatusEtapa.concluido) {
            this.status = StatusEtapa.andamento;
            console.log("Etapa iniciada!");
        } else {
            console.log("A etapa já foi iniciada ou concluida.");
        }
    }

    finalizar(): void{
        if (this.status === StatusEtapa.pendente || this.status === StatusEtapa.andamento) {
            this.status = StatusEtapa.concluido;
            console.log("Etapa concluida!");
        } else {
            console.log("A etapa já foi concluida");
        }
    }

    associarFuncionario(f:Funcionario): void{
        let duplicado = false;
        for (let i = 0; i < this.funcionarios.length; i++) {
            if (this.funcionarios[i].id === f.id) {
                duplicado = true;
                break;
            }
        }

        if (!duplicado) {
            this.funcionarios.push(f);
            console.log("Funcionario associado!");
        } else {
            console.log("Funcionario ja esta na etapa!");
        }
    }

    listarFuncionario(): Array<Funcionario>{
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