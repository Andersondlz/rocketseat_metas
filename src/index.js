const start = () =>{
    while (true){
        let opcao = "Sair"
        switch(opcao){
            case "Cadastrar": {
                console.log("vamos cadastrar")
                break
            }
            case "Listar": {
                console.log("vamos Listar")
                break
            }
            case "Sair":{
                return
            }
        }

    }   
}

start()