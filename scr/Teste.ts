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
        let teste =[]
        if (fs.existsSync("testes.json")) {
            const jsonF = fs.readFileSync("testes.json", "utf-8");
            teste = JSON.parse(jsonF);
        }
            
        teste.push(this)
    
    
        fs.writeFileSync("testes.json", JSON.stringify(teste));
        
    
    }
    
    carregar(): void{
        console.log('...Carregando dados do teste...')
    }
}