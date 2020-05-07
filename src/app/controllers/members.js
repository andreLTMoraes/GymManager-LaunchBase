const {age, date} = require("../lib/utils")
const Member = require("../models/member")

module.exports = {
    index(req, res) {
        const { id } = req.params

        Member.find(id, function(member){
            if(!member) return res.send("Member not found")

            member.birth = date(member.birth).birthDay

            return res.render("members/member", { member })
        })
    },

    create(req, res) {
        Member.instructorsSelectOptions(function(options){
            return res.render("members/create", { instructorOptions: options })
        })
    },

    post(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == "")
                return res.send(`O campo ${key} não pode ser vazio.`)
        }

        const values = [
            req.body.avatar_url,
            req.body.name,
            req.body.email,
            date(req.body.birth).iso,
            req.body.gender,
            req.body.blood,
            req.body.weight,
            req.body.height,
            req.body.instructor
        ]

        Member.create(values, function(id){
            return res.redirect(`/members/${id}`)
        })
    }, 

    edit(req, res) {
        const { id } = req.params

        Member.find(id, function(member){
            if(!member) return res.send("Member not found")

            member.birth= date(member.birth).iso

            Member.instructorsSelectOptions(function(options){
                return res.render("members/edit", { member, instructorOptions: options })
            })
        })
    },

    update(req, res) {

        const values = [
            req.body.id,
            req.body.avatar_url,
            req.body.name,
            req.body.email,
            date(req.body.birth).iso,
            req.body.gender,
            req.body.blood,
            req.body.weight,
            req.body.height,
            req.body.instructor
        ]

        Member.update(values, function(id){
            return res.redirect(`/members/${id}`)
        })
    },

    delete(req, res) {
 
        Member.delete(req.body.id, function() {
            return res.redirect("/members")
        })
    },

    list(req, res) {
        Member.all(function(members){
            return res.render("members/index", { members })
        })
    }
}
