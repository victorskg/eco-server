import express from "express";
import ItemController from "./controllers/ItemController";
import PointController from "./controllers/PointController";
import multer from "multer";
import multerConfig from "./config/multer";
import { celebrate, Joi } from "celebrate";

const routes = express.Router();
const upload = multer(multerConfig);

const itemController = new ItemController();
const pointController = new PointController();

routes.get("/items", itemController.index);

routes.get("/points", pointController.index);
routes.get("/points/:id", pointController.show);
routes.post(
  "/points",
  upload.single("image"),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    }),
  }),
  pointController.create
);

export default routes;
