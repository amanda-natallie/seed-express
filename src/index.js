const express = require("express");
const app = express();
const { uuid } = require("uuidv4");

// o express não funciona como padrão de JSON então precisa-se adicionar isso
app.use(express.json());

const projects = [];

app.get("/projects", (request, response) => {
  // const query = request.query; //  query params de Filtros e Paginação
  const { title } = request.query; //desestruração

    const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects

  return response.json(results);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body; // desestruturando
  const project = {
    id: uuid(),
    title,
    owner,
  };
  projects.push(project);
  return response.json(project);
});

app.put("/projects/:id", (request, response) => {
  //const id = request.params.id
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;
  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found" });
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send();
});

app.listen(3333, () => {
  console.log("🚀 Backend started!");
});
