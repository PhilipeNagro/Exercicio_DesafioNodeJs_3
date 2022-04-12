const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

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
  const {title,url,techs} = request.body;
  
  const findRepo = repositories.find(repo =>repo.id===id);

  if(!findRepo){
    return response.status(404).json({ error: "Repository not found" });
  }
  
  findRepo.title = title;
  findRepo.url = url;
  findRepo.techs = techs;
  findRepo.likes = findRepo.likes;
  findRepo.id = findRepo.id;

  return response.json(findRepo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  const findRepoID = repositories.find(repo => repo.id === id);
  if(!findRepoID){
    return response.status(404).json({error: "Repository not found"});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const findRepo = repositories.find(repo => repo.id ===id);
  if(!findRepo){
    return response.status(404).json({ error: "Repository not found" });
  }

  findRepo.likes++;

  return response.json(findRepo);
});

module.exports = app;
