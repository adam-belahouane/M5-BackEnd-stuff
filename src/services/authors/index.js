import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsRouter = express.Router();

const currentFilePath = fileURLToPath(import.meta.url);

const parentFolderPath = dirname(currentFilePath);
const authorsJSONPath = join(parentFolderPath, "authors.json");

authorsRouter.post("/", (req, res) => {
  console.log(req.body);

  const newauthor = { ...req.body, createdAt: new Date(), id: uniqid() };
  console.log(newauthor);

  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  authors.push(newauthor);

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));

  res.status(201).send({ newauthor });
});

authorsRouter.get("/", (req, res) => {
  const fileContent = fs.readFileSync(authorsJSONPath);

  console.log(JSON.parse(fileContent));

  const arrayOfauthors = JSON.parse(fileContent);
  res.send(arrayOfauthors);
});

authorsRouter.get("/:authorId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  const author = authors.find((s) => s.id === req.params.authorId);

  res.send(author);
});

authorsRouter.put("/:authorId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  const index = authors.findIndex(
    (author) => author.id === req.params.authorId
  );

  const updatedauthor = { ...authors[index], ...req.body };

  authors[index] = updatedauthor;

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authors));

  res.send(updatedauthor);
});

authorsRouter.delete("/:authorId", (req, res) => {
  const authors = JSON.parse(fs.readFileSync(authorsJSONPath));

  const remainingauthors = authors.filter(
    (author) => author.id !== req.params.authorId
  ); // ! = =

  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingauthors));

  res.status(204).send();
});

export default authorsRouter;
