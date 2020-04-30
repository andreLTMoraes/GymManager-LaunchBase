const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')


routes.get("/", function(req, res) {
    return res.redirect("/instructors")
})
routes.get("/instructors", instructors.list)
routes.get("/instructors/create", function(req, res) {
    return res.render("instructors/create")
})
routes.put("/instructors", instructors.update)
routes.get("/instructors/:id", instructors.index)
routes.get("/instructors/:id/edit", instructors.edit)
routes.post("/instructors", instructors.create)
routes.delete("/instructors", instructors.delete)

routes.get("/members", function(req, res) {
    return res.send("members")
})

module.exports = routes;