const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: "Tomar 3 litros de agua por dia",
    checked: false,
}

let metas = [meta]

const cadastrarMeta = async () =>{
    const meta = await input({
        message: "Digite a meta:"
    })

    if (meta.length == 0){
        console.log("A meta precisa ser digitada")
        return 
    }
    metas.push(
            {value: meta, checked: false}
        )
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use a setas para mudar de meta, o espaço para marcar e desmarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }
    
    respostas.forEach((resposta) => {
        const meta = metas.find((m) =>{
            return m.value == resposta
        })
        meta.checked = true 
    })
    console.log("Meta (s) Concluída (s)")
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta)=>{
        return meta.checked
    })  
    if (realizadas.length == 0){
        console.log("Nenhuma meta realizada cadastrada")
        return
    }

    await select ({
        message: "Metas Realizadas: " + realizadas.length,
        choices: [...realizadas]
    })
    
}


const metasAbertas = async () =>{
    const abertas = metas.filter((meta) =>{
        return !meta.checked
    })
    if(abertas.length == 0) {
        console.log("Não a metas em abertas cadastradas")
        return
    }
    await select ({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas]
    })
}


const start = async () =>{
    while (true){
        
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
                    name: "Sair ",
                    value: "sair"
                },

            ]
        })

        switch(opcao){
            case "cadastrar": {
                await cadastrarMeta()
                console.log(metas)
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
            case "sair":{
                console.log(" Saindo .... Ate a proxima")
                return
            }
        }

    }   
}

start()