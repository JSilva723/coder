import fs from 'fs'

export class FileManager {
    constructor (path) {
        this.path = path
        FileManager.createFile(this.path)
    }

    static createFile (path) {
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([]))
        }
    }

    getData () {
        const data = fs.readFileSync(this.path)
        return JSON.parse(data)
    }

    updateData (data) {
        fs.writeFileSync(this.path, JSON.stringify(data))
    }
}
