const { select, input, checkbox } = require('@inquirer/prompts')
const fs =  require("fs").promises

let mensagem = "Bem vindo ao APP de Metas"

let metas

const carregarMetas = async () => {
    try{
        const dados = await fs.readFile("src/metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro){
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("src/metas.json", JSON.stringify(metas, null, 2) )
}

const cadastrarMeta = async () =>{
    const meta = await input({
        message: "Digite a meta:"
    })

    if (meta.length == 0){
        mensagem = "A meta precisa ser digitada"
        return 
    }
    metas.push(
            {value: meta, checked: false}
        )
    mensagem = "Metas cadastrada com sucesso!"
}

const listarMetas = async () => {
    if (metas.length == 0){
        mensagem = "Não existem metas!"
        return 
    }
    const respostas = await checkbox({
        message: "Use a setas para mudar de meta, o espaço para marcar e desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada!"
        return
    }
    
    respostas.forEach((resposta) => {
        const meta = metas.find((m) =>{
            return m.value == resposta
        })
        meta.checked = true 
    })
    mensagem = "Meta (s) Concluída (s)"
}

const metasRealizadas = async () => {
    if (metas.length == 0){
        mensagem = "Não existem metas!"
        return 
    }
    const realizadas = metas.filter((meta)=>{
        return meta.checked
    })  
    if (realizadas.length == 0){
        mensagem = "Nenhuma meta realizada cadastrada"
        return
    }

    await select ({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
    
}


const metasAbertas = async () =>{
    if (metas.length == 0){
        mensagem = "Não existem metas!"
        return 
    }
    const abertas = metas.filter((meta) =>{
        return !meta.checked
    })
    if(abertas.length == 0) {
        mensagem = "Não a metas em abertas cadastradas"
        return
    }
    await select ({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}

const metasDeletar = async () => {
    if (metas.length == 0){
        mensagem = "Não existem metas!"
        return 
    }
    const metasDesmarcadas = metas.map((meta)=>{
        return {value: meta.value, checked:  false}
    })

    const itensADeletar = await checkbox({
        message: "Selecione item para deletar",
        choices: [...metasDesmarcadas],
        instructions: false,
    })
    if (itensADeletar == 0  ){
        mensagem = "Não a itens a ser deletado"
        return
    }
    itensADeletar.forEach((item) =>{
        metas.filter((meta) =>{
            return meta.value != item
        })
    })
    mensagem = "Meta(s) deleta(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear()
    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}


const start = async () =>{
    await carregarMetas()
    while (true){
        mostrarMensagem()
        await salvarMetas() 
        const opcao = await select({
            message: "MENU >>>>>",
            choices: [
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar meta",
                    value: "listar"
                },
                {
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar Metas",
                    value: "deletar"
                },
                {
                    name: "Sair ",
                    value: "sair"
                },

            ]
        })

        switch(opcao){
            case "cadastrar": {
                await cadastrarMeta()
                break
            }
            case "listar": {
                await listarMetas()
                break
            }
            case "realizadas":{
                await metasRealizadas() 
                break
            }
            case "abertas":{
                await metasAbertas()
                break
            }
            case "deletar":{
                await metasDeletar()
                break
            }
            case "sair":{
                console.log(" Saindo .... Ate a proxima")
                return
            }
        }

    }   
}

start()