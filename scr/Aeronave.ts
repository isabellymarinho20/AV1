import { TipoAeronave }  from "./enums"
import Peca  from "./Peca"
import Etapa from "./Etapa"
import Teste from "./Teste"
import * as fs from "fs";



export default class Aeronave{
    public codigo: string
    public modelo: string
    public tipo: TipoAeronave
    public capacidade: number
    public alcance: number

    public pecas: Peca[]
    public etapas: Etapa[]
    public testes: Teste[]

    constructor(codigo: string,modelo: string,tipo: TipoAeronave,capacidade: number,alcance: number){
        this.codigo=codigo
        this.modelo=modelo
        this.tipo=tipo
        this.capacidade=capacidade
        this.alcance=alcance

        this.pecas = []
        this.etapas = []
        this.testes = []
    }

    detalhes(): void {
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
    } else {
        this.pecas.forEach(p => {
            console.log(p.nome + " - " + p.tipo + " - " + p.status);
        });
    }

    console.log("-------------------------------");
    console.log("ETAPAS:");

    if (this.etapas.length === 0) {
        console.log("Nenhuma etapa cadastrada.");
    } else {
        this.etapas.forEach(e => {
            console.log(e.nome + " - " + e.status);
        });
    }

    console.log("-------------------------------");
    console.log("TESTES:");

    if (this.testes.length === 0) {
        console.log("Nenhum teste cadastrado.");
    } else {
        this.testes.forEach(t => {
            console.log(t.tipo + " - " + t.resultado);
        });
    }

        console.log("-------------------------------");
    }


    salvar(): void{
        const jsonF = fs.readFileSync("aeronaves.json", "utf-8");
        const aeronaves = JSON.parse(jsonF);
  
        let duplicado = false;
        for (let i = 0; i < aeronaves.length; i++) {
            if (aeronaves[i].codigo === this.codigo) {
                duplicado = true;
                break;
            }
          }
  
        if (duplicado) {
            console.log("ERRO: codigo ja cadastrado.");
            return;
        }
  
        fs.writeFileSync("aeronaves.json", JSON.stringify(aeronaves));
        console.log("Aeronave cadastrada com sucesso!");
  
      }
  
    carregar(): void{
        console.log('...Carregando dados do funcionario...')
    }

}
