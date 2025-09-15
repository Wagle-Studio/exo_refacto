import { Router } from "express";
import { AuthorController } from "../controllers/AuthorController";

const authorRouter = Router();

// BROWSE
authorRouter.get("/", (request, response) => {
  const controller = new AuthorController(request, response);
  controller.browseAuthors();
});

export default authorRouter;
