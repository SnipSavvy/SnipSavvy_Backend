import {
  addSnippet,
  delete_snippet,
  edit_snippet,
  getSnippets,
  global_search_for_snippets,
  has_snippet_access,
  shareSnippet,
} from "../controllers/snippet.controller";
const authMiddleware = require("../middlewares/auth.middleware");

import express, { Router } from "express";
const snippet: Router = express.Router();

snippet.post("/", authMiddleware, addSnippet);
snippet.get("/", authMiddleware, getSnippets);
snippet.put("/share", authMiddleware, shareSnippet);
snippet.delete("/", authMiddleware, delete_snippet);
snippet.get("/global", authMiddleware, global_search_for_snippets);
snippet.patch("/:id", authMiddleware, edit_snippet)
snippet.get(
  "/check-access/:snippet_id/:email",
  authMiddleware,
  has_snippet_access
);

module.exports = snippet;
