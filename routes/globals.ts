import { Router } from "express";
import { GlobalsController } from "../controllers/GlobalsController";

const globalRouter = Router();

// HOMEPAGE
globalRouter.get("/", (request, response) => {
  const controller = new GlobalsController(request, response);
  controller.homepage();
});

// CART
globalRouter.get("/cart", (request, response) => {
  const controller = new GlobalsController(request, response);
  controller.cart();
});

export default globalRouter;
