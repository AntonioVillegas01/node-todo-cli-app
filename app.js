require('colors')
const {inquireMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} = require("./helpers/inquirer");
const Tarea = require("./models/tarea");
const Tareas = require("./models/tareas");
const {guardarDB, leerDB} = require("./helpers/guardarArchivo");


const main = async () => {

    let opt = ''
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        // Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB)
    }


    do {
        opt =  await  inquireMenu();
        switch (opt) {
            case '1':
                // Crear la tarea
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc)
                break;

            case '2':
                // Listar las opciones
                console.log(tareas.listadoCompleto())
                break;

            case '3':
                // Listar las completadas
                console.log(tareas.listarPendientesCompletadas(true))
                break;


            case '4':
                // Listar las pendientes
                console.log(tareas.listarPendientesCompletadas(false))
                break;


            case '5':
                // Listar completado \ pendiente
             const ids =  await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;


            case '6':
                // Listar las pendientes
                const id = await listadoTareasBorrar( tareas.listadoArr)
                if(id !== '0') {
                    const ok = await confirmar('¿Está seguro?')
                    // Preguntar si esta seguro
                    if(ok){
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente')
                    }
                }

                break;

            default:
                // code here
                break;
        }


        guardarDB(tareas.listadoArr)


       if(opt !== '0') await pausa();

    }while (opt !== '0')/**/


   // pausa();
}


main()