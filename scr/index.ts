import * as readlineSync from "readline-sync";
import Funcionario from "./Funcionario";
import Etapa from "./Etapa";
import Aeronave from "./Aeronave";
import Peca from "./Peca";
import Relatorio from "./Relatorio";
import Teste from "./Teste";
import { TipoAeronave, TipoPeca, NivelPermissao, StatusPeca } from "./enums";
import * as fs from "fs";

let funcionarios: Funcionario[] = [];
let aeronaves: Aeronave[] = [];
let funcionarioLogado: Funcionario | null = null;


if (fs.existsSync("funcionarios.json")) {
    const dados = JSON.parse(fs.readFileSync("funcionarios.json", "utf-8"));
    for (let f of dados) {
        funcionarios.push(new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao));
    }
}

// --- FUNÇÃO AUXILIAR PARA SELEÇÃO ---
// function selecionarAeronave(): Aeronave | null {
//     if (aeronaves.length === 0) {
//         console.log("Nenhuma aeronave cadastrada.");
//         return null;
//     }
//     aeronaves.forEach((a, i) => console.log(`${i} - [${a.codigo}] ${a.modelo}`));
//     const index = parseInt(readlineSync.question("Escolha o indice da aeronave: "));
//     return aeronaves[index] || null;
//}

console.clear();
console.log("-----------------------------------------");
console.log("         AEROCODE - LOGIN   ");
console.log("-----------------------------------------");


while (!funcionarioLogado) {
    const usuario = readlineSync.question("Usuario: ");
    const senha = readlineSync.question("Senha: ", { hideEchoBack: true });

    for (let f of funcionarios) {
        if (f.autenticar(usuario, senha)) {
            funcionarioLogado = f;
            break;
        }
    }

    if (!funcionarioLogado) console.log("Usuario ou senha incorretos.\n");
}

console.clear();

let resp = true;

while (resp) {
    console.log("\n----MENU PRINCIPAL:----");
    console.log("1. Cadastrar aeronave");
    console.log("2. Adicionar peça");
    console.log("3. Mudar status da peça");
    console.log("4. Concluir Etapa");
    console.log("5. Iniciar Etapa");
    console.log("6. Associar funcionario");
    console.log("7. Iniciar teste");
    console.log("8. Ver detalhes");
    console.log("9. Gerar relatorio");
    console.log("10. Salvar tudo");
    console.log("11. Listar aeronaves");
    console.log("12. Novo funcionario do sistema");
    console.log("13. Listar todos funcionários");
    console.log("14. Criar nova etapa");
    console.log("0. Sair");

    let opcao = readlineSync.question("\nEscolha uma opcao: ");

    switch (opcao) {
        case "1": 
            let codigo = readlineSync.question("Codigo: ");
            let modelo = readlineSync.question("Modelo: ");
            console.log("Tipos: 1. COMERCIAL | 2. MILITAR");
            let tipo = readlineSync.question("Escolha o tipo: ");
            let tipoAeronave = tipo === "2" ? TipoAeronave.militar : TipoAeronave.comercial;
            
            let capacidade = parseInt(readlineSync.question("Capacidade: "));
            while(capacidade <= 0){
                console.log("A capacidade nao pode ser menor ou igual a zero.")
                capacidade = parseInt(readlineSync.question("Capacidade: "));
            }
            
            let alcance = parseInt(readlineSync.question("Alcance: "));
            while(alcance <= 0){
                console.log("O alcance nao pode ser menor ou igual a zero.")
                alcance = parseInt(readlineSync.question("Alcance: "));
            }

            let novaAeronave = new Aeronave(codigo, modelo, tipoAeronave, capacidade, alcance);
            aeronaves.push(novaAeronave);
            console.log("Aeronave cadastrada!");
            break;

        case "2": 
            let nomeP = readlineSync.question("Nome da peca: ");
            console.log("Tipos: 1. NACIONAL | 2. IMPORTADA");
            let tipoP = readlineSync.question("Escolha o tipo: ");
            let tPeca = tipoP === "2" ? TipoPeca.importada : TipoPeca.nacional;
            let fornecedor = readlineSync.question("Fornecedor: ");
            console.log("Status: 1. EM_PRODUCAO | 2. EM_TRANSPORTE | 3. PRONTA");
            let statusP = readlineSync.question("Status: ");
            let sPeca = statusP === "1" ? StatusPeca.producao : statusP === "2" ? StatusPeca.transporte : StatusPeca.pronta;

            let peca = new Peca(nomeP, tPeca, fornecedor, sPeca);
            novaAeronave.pecas.push(peca); 
            break;

        case "3":
            if (aeronaves.length == 0){
                console.log("Nenhuma aeronave no sistema")
            }

            if (novaAeronave.pecas.length == 0){
                console.log("Nenhuma peca na aeronave criada")
            }

            console.log("1. EM_PRODUCAO | 2. EM_TRANSPORTE | 3. PRONTA");
            const novoStatus = readlineSync.question("Novo status: ");
            let nvStatus = novoStatus === "1" ? StatusPeca.producao : novoStatus === "2" ? StatusPeca.transporte : StatusPeca.pronta;
            peca.atualizarStatus(nvStatus)
            break;

        case "4":
            if (aeronaves.length == 0){
                console.log("Nenhuma aeronave no sistema")
            }
            novaAeronave.etapas.forEach((e, i) => console.log(`${i} - ${e.nome} (${e.status})`));
            const idxFi = parseInt(readlineSync.question("Escolha a etapa: "));
            if (novaAeronave.etapas[idxFi]) {
                novaAeronave.etapas[idxFi].finalizar();
            }
            break;

        case "5":
            if (aeronaves.length == 0){
                console.log("Nenhuma aeronave no sistema")
            }
            novaAeronave.etapas.forEach((e, i) => console.log(`${i} - ${e.nome} (${e.status})`));
            const idxIni = parseInt(readlineSync.question("Escolha a etapa: "));
            if (novaAeronave.etapas[idxIni]) {
                novaAeronave.etapas[idxIni].iniciar();
            }
            break;

        case "6":
            if (aeronaves.length == 0){
                console.log("Nenhuma aeronave no sistema")
            }
            novaAeronave.etapas.forEach((e, i) => console.log(`${i} - ${e.nome} (${e.status})`));
            const idxAss = parseInt(readlineSync.question("Escolha a etapa: "));
            funcionarios.forEach((f, i) => console.log(`${i} - ${f.nome}`));
            const idxFu = parseInt(readlineSync.question("Escolha o funcionario: "));
            
            if (novaAeronave.etapas[idxAss] && funcionarios[idxFu]) {
                novaAeronave.etapas[idxAss].associarFuncionario(funcionarios[idxFu]);
                console.log("Funcionario associado!");
            }
            break;
            
        case "7":
            const aeroTeste = selecionarAeronave();
            if (!aeroTeste) break;
            console.log("Tipos: 1. ELETRICO | 2. HIDRAULICO | 3. AERODINAMICO");
            const tT = readlineSync.question("Tipo do teste: ");
            console.log("Resultado: 1. APROVADO | 2. REPROVADO");
            const rT = readlineSync.question("Resultado: ");

            const tipoTeste = tT === "1" ? "ELETRICO" : tT === "2" ? "HIDRAULICO" : "AERODINAMICO";
            const resTeste = rT === "1" ? "APROVADO" : "REPROVADO";

            aeroTeste.testes.push(new Teste(tipoTeste, resTeste)); 
            console.log("Teste registrado!");
            break;
    
        case "8":
            const codDet = readlineSync.question("Codigo da aeronave: ");
            const aeroDet = aeronaves.find(a => a.codigo === codDet);
            aeroDet ? aeroDet.detalhes() : console.log("Aeronave nao encontrada.");
            break;

        case "9":
            const codRel = readlineSync.question("Codigo da aeronave: ");
            const aeroRel = aeronaves.find(a => a.codigo === codRel);
            if (aeroRel) {
                const rel = new Relatorio();
                rel.gerarRelatorio(aeroRel);
                rel.salvarEmArquivo();
                console.log("Relatório gerado!");
            }
            break;

        case "10":
            aeronaves.forEach(a => a.salvar());
            fs.writeFileSync("funcionarios.json", JSON.stringify(funcionarios, null, 2));
            console.log("Dados salvos com sucesso.");
            break;

        case "11":
            console.log("\n--- AERONAVES CADASTRADAS ---");
            aeronaves.length === 0 ? console.log("Nenhuma cadastrada.") : 
            aeronaves.forEach(a => console.log(`Codigo: ${a.codigo} | Modelo: ${a.modelo}`));
            break;

        case "12":
            if (funcionarioLogado?.nivelPermissao === NivelPermissao.administrador) {
                const idF = readlineSync.question("ID: ");
                const nomeF = readlineSync.question("Nome: ");
                const userF = readlineSync.question("Usuario: ");
                const senhaF = readlineSync.question("Senha: ");
                funcionarios.push(new Funcionario(idF, nomeF, "000", "Endereço", userF, senhaF, NivelPermissao.operador));
                console.log("Funcionario cadastrado.");
            } else {
                console.log("Acesso negado.");
            }
            break;

        case "13":
            console.log("\n--- QUADRO DE FUNCIONARIOS ---");
            funcionarios.forEach(u => console.log(`ID: ${u.id} | Nome: ${u.nome} | Cargo: ${u.nivelPermissao}`));
            break;

        case "14":
            const aeroEt = selecionarAeronave();
            if (!aeroEt) break;
            const nEtapa = readlineSync.question("Nome da etapa: ");
            const pEtapa = readlineSync.question("Prazo: ");
            aeroEt.etapas.push(new Etapa(nEtapa, pEtapa));
            console.log("Etapa criada!");
            break;

        case "0":
            console.log("Saindo...");
            resp = false;
            break;

        default:
            console.log("Opção inválida.");
            break;
    }
}