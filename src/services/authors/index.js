import express from "express";
import fs from "fs"
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid"

const authorsRouter = express.Router()

const currentFilePath = fileURLToPath(import.meta.url)
const parentFolderPath = dirname(currentFilePath)
const authorsJSONPath = join(parentFolderPath, "authors.json")

authorsRouter.post("/", (req, res) => {
    console.log(req.body)

    const newAuthor = { ...req.body, createdAt: new Date(), id: uniqid()}
    console.log(newAuthor)

    const authors = JSON.parse(fs.readFileSync(authorsJSONPath))
    authors.push(newAuthor)
    fs.writeFileSync(authorsJSONPath, JSON.stringify(authors))
    res.status(201).send({id: newAuthor.id})
})

export default authorsRouter

