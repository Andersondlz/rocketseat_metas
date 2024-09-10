const { select } = require('@inquirer/prompts')


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
                console.log("vamos cadastrar")
                break
            }
            case "listar": {
                console.log("vamos Listar")
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