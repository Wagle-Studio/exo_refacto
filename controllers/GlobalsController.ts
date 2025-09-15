import { Cart } from "../DTO/Cart";
import { Controller } from "../libs/Controller";

export class GlobalsController extends Controller {
  public homepage() {
    this.response.render("pages/home", {});
  }

  public cart() {
    const cart = new Cart();
    const totals = cart.calculateTotals({ couponCode: "WELCOME5" });

    this.response.render("pages/cart", {
      totals: totals,
    });
  }
}
