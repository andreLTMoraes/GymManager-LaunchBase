const {age, date} = require("../lib/utils")
const Instructor = require("../models/instructor")

module.exports = {
    index(req, res) {
        const { id } = req.params

        Instructor.find(id, function(instructor){
            if(!instructor) return res.send("Instructor not found")

            instructor.age = age(instructor.birth),
            instructor.services = instructor.services.split(","),
            instructor.created_at = date(instructor.created_at).format

            return res.render("instructors/instructor", { instructor })
        })
    },

    create(req, res) {
        return res.render("instructors/create")
    },

    post(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == "")
                return res.send(`O campo ${key} não pode ser vazio.`)
        }

        const values = [
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso,
            date(Date.now()).iso
        ]

        Instructor.create(values, function(id){
            return res.redirect(`/instructors/${id}`)
        })
    }, 

    edit(req, res) {
        const { id } = req.params

        Instructor.find(id, function(instructor){
            if(!instructor) return res.send("Instructor not found")

            instructor.birth= date(instructor.birth).iso

            return res.render("instructors/edit", { instructor })
        })
    },

    update(req, res) {

        const values = [
            req.body.id,
            req.body.name,
            req.body.avatar_url,
            req.body.gender,
            req.body.services,
            date(req.body.birth).iso
        ]

        Instructor.update(values, function(id){
            return res.redirect(`/instructors/${id}`)
        })
    },

    delete(req, res) {
 
        Instructor.delete(req.body.id, function() {
            return res.redirect("/instructors")
        })
    },

    list(req, res) {
        Instructor.all(function(instructors){
            return res.render("instructors/index", { instructors })
        })
    }
}
