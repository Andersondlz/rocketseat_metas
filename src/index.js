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

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return
    }

    metas.forEach((m) => {
        m.checked = false
    })

    respostas.forEach((resposta) => {
        const meta = metas.find((m) =>{
            return m.value == resposta
        })
        meta.checked = true 
    })
    console.log("Meta (s) Concluída (s)")
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
            case "sair":{
                console.log(" Saindo .... Ate a proxima")
                return
            }
        }

    }   
}

start()