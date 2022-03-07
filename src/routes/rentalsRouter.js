import { Router } from "express";
import { deleteRental, readRentals, createRental, updateRental } from "../controllers/rentalsController.js";
import { validateRentalIdMiddleware, validateRentalMiddleware } from "../middlewares/validateRentalMiddleware.js";
import rentalSchema from "../schemas/rentalSchema.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals", validateRentalMiddleware(rentalSchema), createRental);
rentalsRouter.get("/rentals", readRentals);
rentalsRouter.put("/rentals/:id/return", updateRental);
rentalsRouter.delete("/rentals/:id", validateRentalIdMiddleware, deleteRental);

export default rentalsRouter;