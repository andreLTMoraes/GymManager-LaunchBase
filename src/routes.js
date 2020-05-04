const express = require('express')
const routes = express.Router()
const instructors = require('./app/controllers/instructors')
const members = require('./app/controllers/members')


routes.get("/", function(req, res) {
    return res.redirect("/instructors")
})
routes.get("/instructors", instructors.list)
routes.get("/instructors/create", instructors.create)
routes.put("/instructors", instructors.update)
routes.get("/instructors/:id", instructors.index)
routes.get("/instructors/:id/edit", instructors.edit)
routes.post("/instructors", instructors.post)
routes.delete("/instructors", instructors.delete)

routes.get("/members", members.list)
routes.get("/members/create", members.create)
routes.put("/members", members.update)
routes.get("/members/:id", members.index)
routes.get("/members/:id/edit", members.edit)
routes.post("/members", members.post)
routes.delete("/members", members.delete)

module.exports = routes;