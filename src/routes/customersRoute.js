import { Router } from "express";
import { getCustomerById, getCustomers, insertCustomer, updateCustomer } from "../controllers/customersController.js";
import { validateNewCustumerMiddleware } from "../middlewares/validateNewCustumerMiddleware.js";
import customerSchema from "../schemas/customerSchema.js";

const customersRouter = Router();

customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers", validateNewCustumerMiddleware(customerSchema), insertCustomer);
customersRouter.put("/customers", validateNewCustumerMiddleware(customerSchema), updateCustomer);

export default customersRouter;