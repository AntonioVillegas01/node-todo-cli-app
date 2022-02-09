require('colors')

const mostarMenu = () => {

    return new Promise((resolve => {

        console.clear()
        console.log('======================'.green)
        console.log('Seleccione una opcion'.green)
        console.log('======================\n'.green)

        console.log(`${'1.'.green} Crear una tarea`)
        console.log(`${'2.'.green} Listar una tarea`)
        console.log(`${'3.'.green} Listar  tarea completadas`)
        console.log(`${'4.'.green} Crear tareas pendientes`)
        console.log(`${'5.'.green} Completar tarea`)
        console.log(`${'6.'.green} Borrar tarea`)
        console.log(`${'7.'.green} Salir \n`)


        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Seleccione una opcion', (opt)=>{
            readline.close()
            resolve(opt)
        })



    }))

}


const pausa = () => {

    return new Promise( ((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPresione ${'ENTER'.green}\n`, (opt)=>{
            readline.close()
            resolve()
        })
    }))
}

module.exports= {
    mostarMenu,
    pausa
}