import * as readline from "readline";
import Funcionario from "./Funcionario";
import Etapa from "./Etapa";
import Aeronave from "./Aeronave";
import Peca from "./Peca";
import Relatorio from "./Relatorio";
import Teste from "./Teste";
import { TipoAeronave } from "./enums";
import { TipoPeca } from "./enums";
import { TipoTeste } from "./enums";
import { StatusEtapa } from "./enums";
import { NivelPermissao } from "./enums";
import { StatusPeca } from "./enums";
import { ResultadoTeste } from "./enums";
import * as fs from "fs";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const pergunta = (query: string): Promise<string> => new Promise(resolve => rl.question(query, resolve));


let funcionarios: Funcionario[] = [];
let aeronaves: Aeronave[] = [];
let funcionario: Funcionario | null = null;


if (fs.existsSync("funcionarios.json")) {
    const dados = JSON.parse(fs.readFileSync("funcionarios.json", "utf-8"));
    for (let f of dados) {
        funcionarios.push(new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao));
    }
} 

console.clear();
console.log("-----------------------------------------");
console.log("         AEROCODE - LOGIN   ");
console.log("-----------------------------------------");

// --- PROCESSO DE LOGIN (LINEAR) ---
while (!funcionario) {
    const user = await pergunta("Usuario: ");
    const senha = await pergunta("Senha: ");

    for (let f of funcionarios) {
        if (f.autenticar(user, senha)) {
            funcionario = f;
            break;
        }
    }

    if (!funcionario) console.log("Usuario ou senha incorretos.\n");
}

console.clear();


let resp = true;

while (resp) {
    console.log("\n----MENU PRINCIPAL:----");
    console.log("1. Cadastrar aeronave");
    console.log("2. Adicionar peca");
    console.log("3. Concluir Etapa");
    console.log("4. Iniciar Etapa");
    console.log("5. Associar funcionario");
    console.log("6. Iniciar teste");
    console.log("7. Ver detalhes");
    console.log("8. Gerar relatorio");
    console.log("9. Salvar tudo");
    console.log("10. Carregar aeronave salva");
    console.log("11. Novo funcionario do sistema");
    console.log("12. Listar todos funcionários");
    console.log("0. Sair");

    let opcao = await pergunta("\nEscolha uma opcao: ");

    switch (opcao) {
        case "1": 
            let codigo = await pergunta("Codigo unico: ");
            let modelo = await pergunta("Modelo: ");
            console.log("Tipos: 1. COMERCIAL | 2. MILITAR");
            let tipo = await pergunta("Escolha o tipo: ");
            let tipoAeronave = tipo === "2" ? TipoAeronave.militar : TipoAeronave.comercial;
            let capacidade = parseInt(await pergunta("Capacidade: "));
            while(capacidade<=0){
                console.log("A capacidade nao pode ser menor ou igual a zero.")
                capacidade = parseInt(await pergunta("Capacidade: "));
            }
            let alcance = parseInt(await pergunta("Alcance: "));
            while(capacidade<=0){
                console.log("O alcance nao pode ser menor ou igual a zero.")
                alcance = parseInt(await pergunta("Alcance: "));
            }

            let novaAero = new Aeronave(codigo, modelo, tipoAeronave, capacidade, alcance);
            aeronaves.push(novaAero);
            break;

        case "2": 
            let nome = await pergunta("Nome da peca: ");
            console.log("Tipos: 1. NACIONAL | 2. IMPORTADA");
            let tipoP = await pergunta("Escolha o tipo: ");
            let tipoPeca = tipoP === "2" ? TipoPeca.importada : TipoPeca.nacional;
            let fornecedor = await pergunta("Fornecedor: ");
            console.log("Status: 1. EM_PRODUCAO | 2. EM_TRANSPORTE | 3. PRONTA");
            let statusP = await pergunta("Status: ");
            let statusPeca = statusP === "1" ? StatusPeca.producao : statusP === "2" ? StatusPeca.transporte : StatusPeca.pronta;

            let peca = new Peca(nome, tipoPeca,fornecedor,statusPeca)
            break;

        case "3": // Concluir Etapa
            const codEtapaConcluir = await pergunta("Codigo da aeronave: ");
            console.log("Buscando etapa e chamando etapa.finalizar()...");
            break;

        case "7": // Ver detalhes
            const codDet = await pergunta("Codigo da aeronave: ");
            const aeroDet = aeronaves.find(a => a.codigo === codDet);
            if (aeroDet) {
                aeroDet.detalhes();
            } else {
                console.log("Aeronave nao encontrada.");
            }
            break;

        case "8": // Gerar relatorio
            const codRel = await pergunta("Codigo da aeronave: ");
            const aeroRel = aeronaves.find(a => a.codigo === codRel);
            if (aeroRel) {
                const rel = new Relatorio();
                rel.gerarRelatorio(aeroRel);
                rel.salvarEmArquivo();
            }
            break;

        case "9": // Salvar tudo
            aeronaves.forEach(a => a.salvar());
            fs.writeFileSync("funcionarios.json", JSON.stringify(usuarios, null, 2));
            console.log("Dados persistidos com sucesso.");
            break;

        case "11": // Novo funcionário
            if (usuarioAtual.nivelPermissao === NivelPermissao.ADMINISTRADOR) {
                const idF = await pergunta("ID: ");
                const nomeF = await pergunta("Nome: ");
                const userF = await pergunta("Usuario: ");
                const senhaF = await pergunta("Senha: ");
                usuarios.push(new Funcionario(idF, nomeF, "000", "Endereço", userF, senhaF, NivelPermissao.OPERADOR));
                console.log("Novo funcionario cadastrado.");
            } else {
                console.log("Acesso negado: Apenas administradores.");
            }
            break;

        case "12": // Listar funcionários
            console.log("\n--- QUADRO DE FUNCIONARIOS ---");
            usuarios.forEach(u => console.log(`ID: ${u.id} | Nome: ${u.nome} | Cargo: ${u.nivelPermissao}`));
            break;

        case "0":
            console.log("Encerrando Aerocode...");
            continuar = false;
            break;

        default:
            console.log("Opção inválida ou não implementada.");
            break;
    }
}

rl.close();