const fs = require('fs')
const data = require('./data.json')
const utils = require("./utils")


exports.index = function(req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(item) {
        return item.id == id
    })

    const instructor = {
        ...foundInstructor,
        age: utils.age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at)
    }

    if(!foundInstructor) return res.send("Instructor ot found!")

    return res.render("instructors/index", { instructor })
}

exports.create = function(req, res) {

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == "")
            return res.send(`O campo ${key} não pode ser vazio.`)
    }

    let {avatar_url, name, birth, gender, services} = req.body

    const id = Number(data.instructors.length + 1)
    const created_at = Date.now()
    birth = Date.parse(birth)


    data.instructors.push({
        id,
        created_at,
        avatar_url,
        name,
        birth,
        gender,
        services
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("Erro ao salvar")

        return res.redirect("/instructors")
    })
} 

exports.edit = function(req, res) {
    const { id } = req.params

    const foundInstructor = data.instructors.find(function(item){
        return id == item.id
    })

    if(!foundInstructor) return res.send("não encontrado")

    return res.render("instructors/edit", { instructor: foundInstructor })
}