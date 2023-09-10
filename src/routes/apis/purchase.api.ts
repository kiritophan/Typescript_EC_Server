import express from "express";
const Router = express.Router();

import purchaseController from "../../controllers/purchase.controller";
Router.post('/', purchaseController.createGuestReceipt)
export default Router;