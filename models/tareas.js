const {v4: uuidv4} = require('uuid');
const Tarea = require("./tarea");

class Tareas {

    _listado = {};

    get listadoArr() {

        const listado = []

        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key]
            listado.push(tarea)
        })

        return listado
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea = (id = '') => {

        if (this._listado[id]) {
            delete this._listado[id];

        }

    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc)
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        this.listadoArr.forEach((tarea, i) => {
            const idx = `${i + 1}.green`;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red

            console.log(`${idx} ${desc} :: ${estado}`)
        })
    }

    listarPendientesCompletadas(completadas = true) {

        let tareasCompletadas = [];
        let tareasPendientes = [];
        this.listadoArr.map(({desc, completadoEn}, i) => {
            if (completadoEn !== null) {
                tareasCompletadas.push({
                    i,
                    desc,
                    completadoEn
                })
            } else {
                tareasPendientes.push({
                    i,
                    desc,
                })
            }
        })

        completadas
            ? tareasCompletadas.forEach((tarea) => {
                const idx = `${tarea.i + 1}.green`;

                console.log(`${idx} ${tarea.desc} :: ${(tarea.completadoEn).green}`)
            })
            : tareasPendientes.forEach(tarea => {
                const idx = `${tarea.i + 1}.green`;
                const estado = 'Pendiente'.red

                console.log(`${idx} ${tarea.desc} :: ${estado}`)
            })
    }


    toggleCompletadas = (ids = []) => {

        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(({id}) => {
            if (!ids.includes(id)){
                const tarea = this._listado[id].completadoEn = null;
            }
        })
    }

}

module.exports = Tareas