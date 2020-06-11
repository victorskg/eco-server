import knex from "../database/connection";
import { Request, Response } from "express";

class PointController {
  async index(request: Request, response: Response) {
    const { city, uf, items, app } = request.query;

    const parsedItems = String(items)
      .split(",")
      .map((i) => Number(i.trim()));

    const points =
      city && uf && items
        ? await knex("point")
            .join("point_item", "point.id", "=", "point_item.point_id")
            .whereIn("point_item.item_id", parsedItems)
            .where("city", String(city))
            .where("uf", String(uf))
            .select("point.*")
            .distinct()
        : await knex("point").select("*");

    const serializedPoints = points.map((point) => ({
      ...point,
      image: `http://192.168.0.121:3333/uploads/points/${point.image}`,
    }));

    return response.json(serializedPoints);
  }

  async create(request: Request, response: Response) {
    const items = request.body.items;
    const point = request.body;
    delete point.items;
    delete point.file;

    const trx = await knex.transaction();

    const ids = await trx("point").insert({
      ...point,
      image: request.file.filename,
    });

    const pointItems = items.split(",").map((item_id: string) => {
      return {
        item_id: Number(item_id.trim()),
        point_id: ids[0],
      };
    });

    await trx("point_item").insert(pointItems);

    await trx.commit();

    return response.sendStatus(201);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const point = await knex("point").where("id", id).first();

    if (!point) {
      return response.status(400).json({
        message: `Ponto de id '${id}' não encontrado.`,
      });
    }

    const serializedPoint = {
      ...point,
      image: `http://192.168.0.121:3333/uploads/points/${point.image}`,
    };

    const items = await knex("item")
      .join("point_item", "item.id", "=", "point_item.item_id")
      .where("point_item.point_id", point.id)
      .select("item.title", "item.id");

    return response.json({
      ...serializedPoint,
      items,
    });
  }
}

export default PointController;
