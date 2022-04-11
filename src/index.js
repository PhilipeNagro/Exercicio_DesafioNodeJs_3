const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [
  {
    "id": "135d082a-929a-42d2-8747-2c3c9a8d7abf",
    "title": "Repositorio Generico",
    "url": "https://github.com/.../tree/desenvolvimento",
    "techs": "NodeJS",
    "likes": 0
  }
];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };
  
  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  // const updatedRepository = request.body;

  const {title,url,techs} = request.body;

  // console.log(updatedRepository);
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  // const repo = repositories.findIndex

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
  const findRepo = repositories.find(repo =>repo.id===id);

  
  findRepo.title = title;
  findRepo.url = url;
  findRepo.techs = techs;
  findRepo.likes = findRepo.likes;
  findRepo.id = findRepo.id;

 
  // const repository = { ...repositories[repositoryIndex], ...updatedRepository };
  // repositories[repositoryIndex] = repository;


  return response.json(findRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }
  const findRepoID = repositories.find(repo => repo.id === id);
  if(!findRepoID){
    return response.status(404).json({error: "Usuario nao encontrado pelo ID"});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  const likes = ++repositories[repositoryIndex].likes;


  // return response.json('likes');
  return response.json({likes})
});

module.exports = app;
