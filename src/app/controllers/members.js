const fs = require('fs')
const data = require('../../../data.json')
const {date} = require("../lib/utils")

module.exports = {
    index(req, res) {
        const { id } = req.params

        const foundMember = data.members.find(function(item) {
            return item.id == id
        })

        const member = {
            ...foundMember,
            birth: date(foundMember.birth).birthDay
        }

        if(!foundMember) return res.send("Member ot found!")

        return res.render("members/member", { member })
    },

    create(req, res) {
        return res.render("members/create")
    },

    post(req, res) {

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == "")
                return res.send(`O campo ${key} não pode ser vazio.`)
        }

        let id = 1
        const lastMember = data.members[data.members.length -1]

        if(lastMember){
            id = lastMember.id + 1
        }
        
        
        birth = Date.parse(req.body.birth)


        data.members.push({
            id,
            ...req.body,
            birth
        })

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Erro ao salvar")

            return res.redirect(`/members/${id}`)
        })
    },

    edit(req, res) {
        const { id } = req.params

        const foundMember = data.members.find(function(item){
            return id == item.id
        })

        if(!foundMember) return res.send("não encontrado")
        
        const member = {
            ...foundMember,
            birth: date(foundMember.birth).iso
        }

        return res.render("members/edit", { member })
    },

    update(req, res) {
        const { id } = req.body
        let index = 0

        const foundMember = data.members.find(function(item, foundIndex){
            if(id == item.id){
                index = foundIndex
                return true
            }
        })

        if(!foundMember) return res.send("não encontrado")
        
        const member = {
            ...foundMember,
            ...req.body,
            birth: Date.parse(req.body.birth),
            id: Number(req.body.id)
        }

        data.members[index] = member

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Write error.")

            return res.redirect(`/members/${id}`)
        })
    },

    delete(req, res) {
        const { id } = req.body

        const filteredMembers = data.members.filter(function(item) {
            return item.id != id
        })

        data.members = filteredMembers

        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if(err) return res.send("Fail to delete")

            return res.redirect("/members")
        })
    },

    list(req, res) {
        return res.render("members/index", { members: data.members })
    },
}