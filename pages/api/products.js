import { initMongoose } from "../../lib/mongoose";
import Product from "../../models/Products";

export async function findAllProducts() {
  return Product.find().exec();
}

export default async function handle(req, res) {
  await initMongoose();
  const ids = req.query.id;

  if (ids) {
    const idsArray = ids.split(",");
    res.json(
      await Product.find({
        _id: { $in: idsArray },
      }).exec()
    );
  } else {
    // console.log("No products found  ");
    res.json(await findAllProducts());
  }
}
