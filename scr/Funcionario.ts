import { NivelPermissao } from "./enums.js"
import * as fs from "fs";

export default class Funcionario{
    public id: string
    public nome: string
    public telefone: string
    public endereco: string
    public usuario: string
    public senha: string
    public nivelPermissao: NivelPermissao

    constructor(id: string,nome: string,telefone: string,endereco: string, usuario: string,senha: string,nivelPermissao: NivelPermissao){
        this.id=id
        this.nome=nome
        this.telefone=telefone
        this.endereco=endereco
        this.usuario=usuario
        this.senha=senha
        this.nivelPermissao=nivelPermissao
    }

    autenticar(usuarioo:string,senhaa:string): boolean{
        if(this.usuario==usuarioo && this.senha==senhaa){
            return true
        }else{
            return false
        }
    }

    salvar(): void{
        let funcionarios=[]

        if (fs.existsSync("funcionarios.json")) {
            const jsonF = fs.readFileSync("funcionarios.json", "utf-8");
            funcionarios = JSON.parse(jsonF);
        }

        let duplicado = false;
        for (let i = 0; i < funcionarios.length; i++) {
            if (funcionarios[i].id === this.id) {
                duplicado = true;
                break;
            }
        }

        if (duplicado) {
            console.log("ERRO: id ja cadastrado.");
            return;
        }

        funcionarios.push(this);
        fs.writeFileSync("funcionarios.json", JSON.stringify(funcionarios));
        console.log("Funcionario cadastrado com sucesso!");

    }

    carregar(): void{
        console.log('...Carregando dados do funcionario...')
    }

}