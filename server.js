/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Pooja Shankarlal Pinjani Student ID: 170943211 Date: 30/05/2025
*
********************************************************************************/
const express = require("express");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const projectData = require("./modules/projects");

// Root route
app.get("/", (req, res) => {
    res.send("Assignment 2: YOUR NAME - YOUR STUDENT ID");
});

// Route to return all projects
app.get("/solutions/projects", (req, res) => {
    projectData.getAllProjects()
        .then(data => res.json(data))
        .catch(err => res.status(500).send(err));
});

// Route to demo getProjectById
app.get("/solutions/projects/id-demo", (req, res) => {
    projectData.getProjectById(9)  // Use a known project ID here
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});

// Route to demo getProjectsBySector
app.get("/solutions/projects/sector-demo", (req, res) => {
    projectData.getProjectsBySector("agriculture")  // Use partial sector name
        .then(data => res.json(data))
        .catch(err => res.status(404).send(err));
});

// Start server after initialization
projectData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on port ${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.log("Initialization failed:", err);
    });
