import {
  addSnippet,
  delete_snippet,
  getSnippets,
  global_search_for_snippets,
  shareSnippet,
} from "../controllers/snippet.controller";
import express, { Router } from "express";
const snippet: Router = express.Router();

snippet.post("/", addSnippet);
snippet.get("/", getSnippets);
snippet.put("/share", shareSnippet);
snippet.delete("/", delete_snippet);
snippet.get("/global", global_search_for_snippets);

module.exports = snippet;
