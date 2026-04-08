import { ResultadoTeste, TipoTeste } from "./enums";
import * as fs from "fs";

export default class Teste{
    public tipo: TipoTeste
    public resultado: ResultadoTeste

    constructor(tipo: TipoTeste,resultado: ResultadoTeste){
        this.tipo=tipo
        this.resultado=resultado
    }

    salvar(): void{
        const jsonF = fs.readFileSync("teste.json", "utf-8");
        const teste = JSON.parse(jsonF);
    
    
        fs.writeFileSync("teste.json", JSON.stringify(teste));
        console.log("Teste cadastrado com sucesso!");
    
    }
    
    carregar(): void{
        console.log('...Carregando dados do teste...')
    }
}