import { StatusPeca, TipoPeca } from "./enums.js"
import * as fs from "fs";

export default class Peca{
    public nome: string
    public tipo:TipoPeca
    public fornecedor: string
    public status: StatusPeca

    constructor(nome: string,tipo:TipoPeca,fornecedor: string,status: StatusPeca){
        this.nome=nome
        this.tipo=tipo
        this.fornecedor=fornecedor
        this.status=status
    }

    atualizarStatus(novoStatus: StatusPeca):void{
        this.status=novoStatus
    }

    salvar(): void{
        let pecas =[]
        if (fs.existsSync("pecas.json")) {
                const jsonF = fs.readFileSync("pecas.json", "utf-8");
                pecas = JSON.parse(jsonF);
        }
    
            pecas.push(this)
            fs.writeFileSync("pecas.json", JSON.stringify(pecas));
            
    
        }
    
    carregar(): void{
        console.log('...Carregando dados da peca...')
    }

}