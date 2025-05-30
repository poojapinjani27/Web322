const projectData = require("../data/projectData.json");
const sectorData = require("../data/sectorData.json");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = []; // reset projects array
      projectData.forEach(project => {
        const sector = sectorData.find(sec => sec.id === project.sector_id);
        if (sector) {
          projects.push({
            ...project,
            sector: sector.sector_name
          });
        }
      });
      resolve();
    } catch (error) {
      reject("Unable to initialize projects");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length === 0) {
      reject("No projects available");
    } else {
      resolve(projects);
    }
  });
}

function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(proj => proj.id === projectId);
    if (project) {
      resolve(project);
    } else {
      reject(`Project with ID ${projectId} not found`);
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filteredProjects = projects.filter(proj =>
      proj.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (filteredProjects.length > 0) {
      resolve(filteredProjects);
    } else {
      reject(`No projects found for sector: ${sector}`);
    }
  });
}

// Export all functions as a module
module.exports = {
  initialize,
  getAllProjects,
  getProjectById,
  getProjectsBySector
};
function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length === 0) {
      reject("No projects available");
    } else {
      resolve(projects);
    }
  });
}
function getProjectById(projectId) {
  return new Promise((resolve, reject) => {
    const project = projects.find(p => p.id === Number(projectId));
    if (project) {
      resolve(project);
    } else {
      reject(`Project with ID ${projectId} not found`);
    }
  });
}
function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filteredProjects = projects.filter(p =>
      p.sector.toLowerCase().includes(sector.toLowerCase())
    );
    if (filteredProjects.length > 0) {
      resolve(filteredProjects);
    } else {
      reject(`No projects found for sector: ${sector}`);
    }
  });
}
module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };



