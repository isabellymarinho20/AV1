import * as readlineSync from "readline-sync";
import Funcionario from "./Funcionario.js";
import Aeronave from "./Aeronave.js";
import Peca from "./Peca.js";
import Relatorio from "./Relatorio.js";
import Teste from "./Teste.js";
import { TipoAeronave, TipoPeca, NivelPermissao, StatusPeca, TipoTeste, ResultadoTeste, StatusEtapa } from "./enums.js";
import * as fs from "fs";
import Etapa from "./Etapa.js";

let funcionarios: Funcionario[] = [];
let aeronaves: Aeronave[] = [];
let funcionarioLogado: Funcionario | null = null;
let pecas: Peca[] = [];
let testes: Teste[] = []

// let funcionario_adm = new Funcionario('1', 'Isabelly', '12988374635', 'rua alegria', 'isa', '2090',NivelPermissao.administrador)
// funcionario_adm.salvar()
// funcionarios.push(funcionario_adm)

if (fs.existsSync("funcionarios.json")) {
    const dados = JSON.parse(fs.readFileSync("funcionarios.json", "utf-8"));
    for (let f of dados) {
        funcionarios.push(new Funcionario(f.id, f.nome, f.telefone, f.endereco, f.usuario, f.senha, f.nivelPermissao));
    }
}

if (fs.existsSync("aeronaves.json")) {
    const dados = JSON.parse(fs.readFileSync("aeronaves.json", "utf-8"));
    for (let a of dados) {
        let aeronave = new Aeronave(a.codigo,a.modelo,a.tipo,a.capacidade,a.alcance);
        aeronave.pecas = a.pecas || [];
        aeronave.etapas = (a.etapas || []).map((e: any) =>
            new Etapa(e.nome, e.prazo, e.status, e.funcionarios || []));
        aeronave.testes = a.testes || [];

        aeronaves.push(aeronave);
    }
}


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
    console.log("2. Adicionar peca");
    console.log("3. Mudar status da peca");
    console.log("4. Concluir Etapa");
    console.log("5. Iniciar Etapa");
    console.log("6. Associar funcionario");
    console.log("7. Iniciar teste");
    console.log("8. Ver detalhes");
    console.log("9. Gerar relatorio");
    console.log("10. Listar aeronaves");
    console.log("11. Novo funcionario do sistema");
    console.log("12. Listar todos funcionarios");
    console.log("13. Listar funcionarios de uma etapa");
    console.log("14. Adicionar etapa na aeronave");
    console.log("0. Sair");

    let opcao = readlineSync.question("\nEscolha uma opcao: ");

    switch (opcao) {
        case "1": 
            let codigo = readlineSync.question("Codigo: ");
            while (aeronaves.find(a => a.codigo === codigo)) {
                console.log("Codigo duplicado");
                codigo = readlineSync.question("Codigo: ");
            }

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
            novaAeronave.salvar()
            console.log("Aeronave cadastrada com sucesso!");
            break;

        case "2": 
            aeronaves.forEach((a, i) => {
            console.log(`Codigo: ${a.codigo} - ${a.modelo}`);
            });

            const codigoAeron = readlineSync.question("Codigo da aeronave: ");
            const aeronaveSelecion = aeronaves.find(a => a.codigo === codigoAeron);

            if (!aeronaveSelecion) {
                console.log("Nao tem essa aeronave");
                break;
            }

            let nomeP = readlineSync.question("Nome da peca: ");
            console.log("Tipos: 1. NACIONAL | 2. IMPORTADA");
            let tipoP = readlineSync.question("Escolha o tipo: ");
            let tPeca = tipoP === "2" ? TipoPeca.importada : TipoPeca.nacional;
            let fornecedor = readlineSync.question("Fornecedor: ");
            console.log("Status: 1. EM_PRODUCAO | 2. EM_TRANSPORTE | 3. PRONTA");
            let statusP = readlineSync.question("Status: ");
            let sPeca = statusP === "1" ? StatusPeca.producao : statusP === "2" ? StatusPeca.transporte : StatusPeca.pronta;

            let peca = new Peca(nomeP, tPeca, fornecedor, sPeca);
            aeronaveSelecion.pecas.push(peca); 
            pecas.push(peca); 
            peca.salvar()
            aeronaveSelecion.salvar();
            console.log("Peca cadastrada com sucesso!");
            break;

        case "3":
            if (pecas.length === 0) {
            console.log("Nenhuma peca cadastrada");
            break;
        }

            pecas.forEach((p, i) => {
            console.log(`${i} - ${p.nome} (${p.status})`);
            });

            const idPeca = parseInt(readlineSync.question("Escolha a peca: "));
            if (!pecas[idPeca]) {
                console.log("Peca inválida");
                break;
            }

            const pecaSelecionada = pecas[idPeca];
            console.log("1. EM_PRODUCAO | 2. EM_TRANSPORTE | 3. PRONTA");
            const novoStatus = readlineSync.question("Novo status: ");
            let nvStatus = novoStatus === "1" ? StatusPeca.producao : novoStatus === "2" ? StatusPeca.transporte : StatusPeca.pronta;
            pecaSelecionada.atualizarStatus(nvStatus)
            pecaSelecionada.salvar()
            console.log("\nStatus da peca atualizado com sucesso!");
            break;

        case "4":
            if (aeronaves.length === 0) {
                console.log("Nenhuma aeronave no sistema");
                break;
            }
        
            aeronaves.forEach((a) => {
                console.log(`Codigo: ${a.codigo} - ${a.modelo}`);
            });

            const codigoAer = readlineSync.question("Codigo da aeronave: ");
            const aeronaveSelec = aeronaves.find(a => a.codigo === codigoAer);

            if (!aeronaveSelec) {
                console.log("Nao tem essa aeronave");
                break;
            }
            aeronaveSelec.etapas.forEach((e, i) => console.log(`${i} - ${e.nome} (${e.status})`));
            const idxFi = parseInt(readlineSync.question("Escolha a etapa: "));
            if (aeronaveSelec.etapas[idxFi]) {
                aeronaveSelec.etapas[idxFi].finalizar();
                aeronaveSelec.salvar()
            }
            break;

        case "5":
            if (aeronaves.length === 0) {
                console.log("Nenhuma aeronave no sistema");
                break;
            }

        
            aeronaves.forEach((a) => {
                console.log(`Codigo: ${a.codigo} - ${a.modelo}`);
            });

            const codigoAero = readlineSync.question("Codigo da aeronave: ");
            const aeronaveSelecio = aeronaves.find(a => a.codigo === codigoAero);

            if (!aeronaveSelecio) {
                console.log("Nao tem essa aeronave");
                break;
            }

            aeronaveSelecio.etapas.forEach((e, i) => 
                console.log(`${i} - ${e.nome} (${e.status})`)
            );

            const idxIni = parseInt(readlineSync.question("Escolha a etapa: "));

            if (aeronaveSelecio.etapas[idxIni]) {
                aeronaveSelecio.etapas[idxIni].iniciar();
                aeronaveSelecio.salvar()
            }else{
                console.log("Nao existe essa etapa")
            }
            break;

        case "6":
            if (aeronaves.length === 0) {
                console.log("Nenhuma aeronave no sistema");
                break;
            }
        
            aeronaves.forEach((a) => {
                console.log(`Codigo: ${a.codigo} - ${a.modelo}`);
            });

            const codigoA = readlineSync.question("Codigo da aeronave: ");
            const aeronaveS = aeronaves.find(a => a.codigo === codigoA);

            if (!aeronaveS) {
                console.log("Nao tem essa aeronave");
                break;
            }

            aeronaveS.etapas.forEach((e, i) => 
            console.log(`${i} - ${e.nome} (${e.status})`));
            const idxAss = parseInt(readlineSync.question("Escolha a etapa: "));
            funcionarios.forEach((f, i) => console.log(`${i} - ${f.nome}`));
            const idxFu = parseInt(readlineSync.question("Escolha o funcionario: "));
            
            if (aeronaveS.etapas[idxAss] && funcionarios[idxFu]) {
                aeronaveS.etapas[idxAss].associarFuncionario(funcionarios[idxFu]);
                console.log("\nFuncionario associado com sucesso!");
            }
            break;
            
        case "7":
            if (aeronaves.length === 0) {
                console.log("Nenhuma aeronave no sistema");
                break;
            }
        
            aeronaves.forEach((a) => {
                console.log(`Codigo: ${a.codigo} - ${a.modelo}`);
            });

            const codigoAe = readlineSync.question("Codigo da aeronave: ");
            const aeronaveSe = aeronaves.find(a => a.codigo === codigoAe);

            if (!aeronaveSe) {
                console.log("Nao tem essa aeronave");
                break;
            }
            console.log("Tipos: 1. ELETRICO | 2. HIDRAULICO | 3. AERODINAMICO");
            const tipoT = readlineSync.question("Tipo do teste: ");
            let tipoTeste = tipoT === "1" ? TipoTeste.eletrico : tipoT === "2" ? TipoTeste.hidraulico : TipoTeste.aerodinamico;
            console.log("Resultados: 1. APROVADO | 2. REPROVADO ");
            const resultadoT = readlineSync.question("Resultado: ");
            let resultadoTeste = resultadoT === "1" ? ResultadoTeste.aprovado  : ResultadoTeste.reprovado;

            let teste = new Teste(tipoTeste, resultadoTeste)
            aeronaveSe.testes.push(teste); 
            testes.push(teste); 
            teste.salvar()
            aeronaveSe.salvar()
            console.log("\nTeste cadastrado com sucesso!");
            
            break;
    
        case "8":

        if (aeronaves.length === 0) {
                console.log("Nenhuma aeronave no sistema");
                break;
            }
            
            aeronaves.forEach((a) => {
                console.log(`Codigo: ${a.codigo} - ${a.modelo}`);
            });

            const codigoAeronave = readlineSync.question("Codigo da aeronave: ");
            const aeronaveSeleciona = aeronaves.find(a => a.codigo === codigoAeronave);

            if (!aeronaveSeleciona) {
                console.log("Nao tem essa aeronave");
                break;
            }
            const detalhesAeronave = aeronaves.find(a => a.codigo === codigoAeronave);
            detalhesAeronave ? detalhesAeronave.detalhes() : console.log("Aeronave nao encontrada.");
            break;

        case "9":
            if (aeronaves.length === 0) {
                console.log("Nenhuma aeronave no sistema");
                break;
            }
        
            aeronaves.forEach((a, i) => {
                console.log(`Codigo: ${a.codigo} - ${a.modelo}`);
            });

            const codigoAeronaveR = readlineSync.question("Codigo da aeronave: ");
            const aeronaveSelecionad = aeronaves.find(a => a.codigo === codigoAeronaveR);

            if (!aeronaveSelecionad) {
                console.log("Nao tem essa aeronave");
                break;
            }
            const relatorioAeronave = aeronaves.find(a => a.codigo === codigoAeronaveR);
            if (relatorioAeronave) {
                const rel = new Relatorio();
                rel.gerarRelatorio(relatorioAeronave);
                rel.salvarEmArquivo();
            }
            break;

        case "10":
            console.log("\n--- AERONAVES CADASTRADAS ---");
            if (aeronaves.length == 0){
                console.log("Nenhuma aeronave no sistema")
            }
            aeronaves.forEach(a => {
                console.log("-----------------------------------------");
                a.detalhes(); 
            });
            console.log("-----------------------------------------");
            break;
        
        case "11":
            if (funcionarioLogado?.nivelPermissao === NivelPermissao.administrador) {
                const idFuncionario = readlineSync.question("ID: ");
                const nomeFuncionario = readlineSync.question("Nome: ");
                const telefoneFuncionario = readlineSync.question("Telefone: ");
                const enderecoFuncionario = readlineSync.question("Endereco: ");
                const usuarioFuncionario = readlineSync.question("Usuario: ");
                const senhaFuncionario = readlineSync.question("Senha: ");
                console.log("Nivel permissao: 1. ADMINISTRADOR | 2. ENGENHEIRO | 3. OPERADOR ");
                const nivelP = readlineSync.question("Nivel permissao: ");
                let nivelPermissao = nivelP === "1" ? NivelPermissao.administrador : nivelP === "2" ? NivelPermissao.engenheiro : NivelPermissao.operador;
                let funcionarioCadastrado = new Funcionario(idFuncionario, nomeFuncionario, telefoneFuncionario, enderecoFuncionario, usuarioFuncionario, senhaFuncionario, nivelPermissao)
                funcionarios.push(funcionarioCadastrado);
                funcionarioCadastrado.salvar();
                
            } else {
                console.log("Acesso negado, voce nao é um administrador!");
            }
            break;

        case "12":
            console.log("\n--- QUADRO DE FUNCIONARIOS ---");
            funcionarios.forEach(f => console.log(`ID: ${f.id} | Nome: ${f.nome} | Telefone: ${f.telefone} | Endereco: ${f.endereco} | Cargo: ${f.nivelPermissao}`));
            break;

        case "13":
            aeronaves.forEach((a, i) => console.log(`Codigo: ${a.codigo} ${a.modelo}`));
            const idxAeronave = readlineSync.question("Codigo da aeronave: ");
            const aeronaveSelecionada = aeronaves.find(a => a.codigo === idxAeronave);

            if (aeronaveSelecionada) {
                if (aeronaveSelecionada.etapas.length === 0) {
                    console.log("Esta aeronave não possui etapas cadastradas.");
                } else {
                    console.log(`\nEtapas da aeronave ${aeronaveSelecionada.codigo}:`);
                    aeronaveSelecionada.etapas.forEach((e, i) => console.log(`${i} - ${e.nome}`));
                    
                    let idxEtapa = parseInt(readlineSync.question("Escolha a etapa: "));
                    let etapaSelecionada = aeronaveSelecionada.etapas[idxEtapa];

                    if (etapaSelecionada) {
                        console.log("\n-----------------------------------------");
                        etapaSelecionada.listarFuncionario();
                        
                    } else {
                        console.log("Nao tem essa etapa");
                    }
                }
            }
            break;
        
        case "14":
            if (aeronaves.length === 0) {
            console.log("Nenhuma aeronave no sistema");
            break;
        }

        
        aeronaves.forEach((a) => {
            console.log(`Codigo: ${a.codigo} - ${a.modelo}`);
        });

        let codigoAerona = parseInt(readlineSync.question("Escolha a aeronave: "));
        let aeronaveSele = aeronaves[codigoAerona];

        if (!aeronaveSele) {
            console.log("Nao tem essa aeronave");
            break;
        }

        
        let nomeEtapa = readlineSync.question("Nome da etapa: ");
        let prazoEtapa = readlineSync.question("Prazo (DD-MM-YYYY): ");

        while (!/^\d{2}-\d{2}-\d{4}$/.test(prazoEtapa)) {
            console.log("Formato errado! (DD-MM-YYYY)");
            prazoEtapa = readlineSync.question("Prazo (DD-MM-YYYY): ");
        }

        console.log("Status: 1. PENDENTE | 2. EM ANDAMENTO | 3. CONCLUIDO");
        let statusE = readlineSync.question("Escolha o status: ");

        let statusEtapa = statusE  === "1" ? StatusEtapa.pendente : statusE === "2" ? StatusEtapa.andamento : StatusEtapa.concluido;

        let novaEtapa = new Etapa(nomeEtapa, prazoEtapa, statusEtapa, []);
        aeronaveSele.etapas.push(novaEtapa);
        aeronaveSele.salvar();

        console.log("\nEtapa adicionada com sucesso!");
        break;

        case "0":
            resp = false;
            break;

        default:
            console.log("Nao tem essa opção");
            break;
    }
}