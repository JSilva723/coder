import { uuidv4 } from "../../utils.js"

export const genProducts = (limit) => {
    const a =[]
    for (let i=1; i<=limit; i++) {
        a.push({
            _id: uuidv4().replaceAll('-','').slice(0,24),
            title: "producto " + i,
            description: "Descripcion, producto " + i,
            code: "producto" + i,
            price: Math.floor(Math.random()*1000),
            status: true,
            stock:  Math.floor(Math.random()*100),
            category:  "category" + Math.floor(Math.random()*10),
            thumbnails: [],
        })
    }
    return a
}
