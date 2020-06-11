import express from "express";
import ItemController from "./controllers/ItemController";
import PointController from "./controllers/PointController";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router();
const upload = multer(multerConfig);

const itemController = new ItemController();
const pointController = new PointController();

routes.get("/items", itemController.index);

routes.get("/points", pointController.index);
routes.post("/points", upload.single("image"), pointController.create);
routes.get("/points/:id", pointController.show);

export default routes;
