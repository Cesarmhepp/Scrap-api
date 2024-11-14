//import Scrapinit from '/home/cesar/scrapers/index.js'
import { exec } from 'child_process'

export let listProcess = []

export const getAllNodeProcess = async (req, res) => {
    try {
        exec("ps -e|grep node", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.status(404).json("No encontrado")
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                res.status(404).json("No encontrado")
                return;
            }
            let stdoutSplited = stdout.split("\n")
            stdoutSplited = stdoutSplited.map((item) => { return item.split(" ") })
            stdoutSplited = stdoutSplited.map(item => {
                return item.filter(item2 => item2 !== '')
            })
            let result = [];
            stdoutSplited.map((item) => {
                listProcess.forEach(element => {
                    if (element.r_pid === parseInt(item[0])) {
                        result.push(element)
                    }
                })
            })
            res.status(400).json(result)
        });

    } catch (error) {
        console.log(error)
        res.status(404).json("Ha ocurrido un error al realizar la consulta")
    }

}

export const deleteNodeProcess = async (req, res) => {
    try {
        exec("pkill -P " + req.params.pid, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                res.status(404).json("Ha ocurrido un error al eliminar el proceso")
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                res.status(404).json("Ha ocurrido un error al eliminar el proceso")
                return;
            }
            res.status(200).json("Proceso Eliminado correctamente")

        })

        listProcess = listProcess.filter((item) => 
            item.r_pid !== parseInt(req.params.pid)
        )

    } catch (err) { console.log(err); res.status(404).json("Ha ocurrido un error al eliminar el proceso") }
}

