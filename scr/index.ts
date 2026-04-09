import * as readline from "readline";
import Funcionario from "./Funcionario";
import Etapa from "./Etapa";
import Aeronave from "./Aeronave";
import Peca from "./Peca";
import Relatorio from "./Relatorio";
import Teste from "./Teste";
import { TipoAeronave } from "./enums";
import { TipoPeca } from "./enums";
import { NivelPermissao } from "./enums";
import { StatusPeca } from "./enums";
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
    console.log("2. Adicionar peça");
    console.log("3. Mudar status da peça");
    console.log("4. Concluir Etapa");
    console.log("5. Iniciar Etapa");
    console.log("6. Associar funcionario");
    console.log("7. Iniciar teste");
    console.log("8. Ver detalhes");
    console.log("9. Gerar relatorio");
    console.log("10. Salvar tudo");
    console.log("11. Carregar aeronave salva");
    console.log("12. Novo funcionario do sistema");
    console.log("13. Listar todos funcionários");
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
            peca.salvar()
            break;

        case "3":
            const aeroStatus = await selecionarAeronave();
            if (!aeroStatus) break;

            aeroStatus.pecas.forEach((p, i) => {
                console.log(`${i} - ${p.nome} (${p.status})`);
            });

            const indexP = parseInt(await pergunta("Escolha a peça: "));

            console.log("1. EM_PRODUCAO | 2. EM_TRANSPORTE | 3. PRONTA");
            const novoStatus = await pergunta("Novo status: ");

            let status = novoStatus === "1"
                ? StatusPeca.producao
                : novoStatus === "2"
                ? StatusPeca.transporte
                : StatusPeca.pronta;

            aeroStatus.pecas[indexP].status = status;

            console.log("Status atualizado!");
            break;

        case "4":
            const aeroIni = await selecionarAeronave();
            if (!aeroIni) break;

            aeroIni.etapas.forEach((e, i) => {
                console.log(`${i} - ${e.nome} (${e.status})`);
            });

            const idxIni = parseInt(await pergunta("Escolha a etapa: "));

            aeroIni.etapas[idxIni].finalizar();

            console.log("Etapa finalizada!");
            break;
        case "5":
            const aeroIni = await selecionarAeronave();
            if (!aeroIni) break;

            aeroIni.etapas.forEach((e, i) => {
                console.log(`${i} - ${e.nome} (${e.status})`);
            });

            const idxIni = parseInt(await pergunta("Escolha a etapa: "));

            aeroIni.etapas[idxIni].iniciar();

            console.log("Etapa iniciada!");
            break;
        case "6":
            const aeroFunc = await selecionarAeronave();
            if (!aeroFunc) break;

            aeroFunc.etapas.forEach((e, i) => {
                console.log(`${i} - ${e.nome}`);
            });

            const idxEtapa = parseInt(await pergunta("Escolha a etapa: "));

            funcionarios.forEach((f, i) => {
                console.log(`${i} - ${f.nome}`);
            });

            const idxFunc = parseInt(await pergunta("Escolha o funcionario: "));

            aeroFunc.etapas[idxEtapa].associarFuncionario(funcionarios[idxFunc]);

            console.log("Funcionario associado!");
            break;
            
        case "7":
            const aeroTeste = await selecionarAeronave();
            if (!aeroTeste) break;

            console.log("Tipos: 1. ELETRICO | 2. HIDRAULICO | 3. AERODINAMICO");
            const tipoT = await pergunta("Tipo do teste: ");

            console.log("Resultado: 1. APROVADO | 2. REPROVADO");
            const resultadoT = await pergunta("Resultado: ");

            const tipoTeste = tipoT === "1" ? "ELETRICO" :
                            tipoT === "2" ? "HIDRAULICO" : "AERODINAMICO";

            const resultadoTeste = resultadoT === "1" ? "APROVADO" : "REPROVADO";

            const teste = new Teste(tipoTeste, resultadoTeste);

            aeroTeste.testes.push(teste); 

            console.log("Teste registrado!");
            break;
    
        case "8": // Ver detalhes
            const codDet = await pergunta("Codigo da aeronave: ");
            const aeroDet = aeronaves.find(a => a.codigo === codDet);
            if (aeroDet) {
                aeroDet.detalhes();
            } else {
                console.log("Aeronave nao encontrada.");
            }
            break;

        case "9": // Gerar relatorio
            const codRel = await pergunta("Codigo da aeronave: ");
            const aeroRel = aeronaves.find(a => a.codigo === codRel);
            if (aeroRel) {
                const rel = new Relatorio();
                rel.gerarRelatorio(aeroRel);
                rel.salvarEmArquivo();
            }
            break;

        case "10": // Salvar tudo
            aeronaves.forEach(a => a.salvar());
            fs.writeFileSync("funcionarios.json", JSON.stringify(funcionarios, null, 2));
            console.log("Dados persistidos com sucesso.");
            break;

        case "11":
            console.log("\n--- AERONAVES CADASTRADAS ---");

            if (aeronaves.length === 0) {
                console.log("Nenhuma aeronave cadastrada.");
            } else {
                aeronaves.forEach(a => {
                    console.log(`Codigo: ${a.codigo} | Modelo: ${a.modelo} | Tipo: ${a.tipo}`);
                });
            }

            break;

        case "12": // Novo funcionário
            if (funcionario.nivelPermissao === NivelPermissao.administrador) {
                const idF = await pergunta("ID: ");
                const nomeF = await pergunta("Nome: ");
                const userF = await pergunta("Usuario: ");
                const senhaF = await pergunta("Senha: ");
                funcionarios.push(new Funcionario(idF, nomeF, "000", "Endereço", userF, senhaF, NivelPermissao.operador));
                console.log("Novo funcionario cadastrado.");
            } else {
                console.log("Acesso negado: Apenas administradores.");
            }
            break;

        case "13": // Listar funcionários
            console.log("\n--- QUADRO DE FUNCIONARIOS ---");
            funcionarios.forEach(u => console.log(`ID: ${u.id} | Nome: ${u.nome} | Cargo: ${u.nivelPermissao}`));
            break;

        case "14":
            const aeroEtapa = await selecionarAeronave();
            if (!aeroEtapa) break;

            const nomeEtapa = await pergunta("Nome da etapa: ");
            const prazo = await pergunta("Prazo: ");

            aeroEtapa.etapas.push(new Etapa(nomeEtapa, prazo));

            console.log("Etapa criada!");
            break;

        case "0":
            console.log("Encerrando Aerocode...");
            resp = false;
            break;

        default:
            console.log("Opção inválida ou não implementada.");
            break;
    }
}

rl.close();