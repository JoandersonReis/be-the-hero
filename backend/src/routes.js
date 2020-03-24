const express = require("express")

const OngController = require("./controllers/OngController")
const IncidentController = require("./controllers/IncidentController")
const ProfileController = require("./controllers/ProfileController")
const SessionController = require("./controllers/SessionController")

const routes = express.Router()

// Ongs Routes
routes.get("/ongs", OngController.index)
routes.post("/ongs", OngController.create)

// Incidents Routes
routes.get("/incidents", IncidentController.index)
routes.post("/incidents", IncidentController.create)
routes.delete("/incidents/:id", IncidentController.delete)

// Profile Routes
routes.get("/profile", ProfileController.index)

// Session Routes
routes.post("/sessions", SessionController.create)

module.exports = routes
