import connectToDatabase from "lib/db";
import Handmade from "../../../../models/Handmade";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;

  const {
    title,
    description,
    price,
    discountPercentage,
    stock,
    author,
    tags,
    thumbnail,
    images,
  } = data;

  await connectToDatabase();

  const newProduct = new Handmade({
    id: 10000,
    title: title,
    description: description,
    price: price,
    discountPercentage: discountPercentage,
    rating: 5,
    stock: stock,
    owner_id: 30,
    author: author,
    tags: tags,
    thumbnail: thumbnail,
    images: images,
  });

  console.log(newProduct);

  try {
    await Handmade.create(newProduct);
    res.status(201).json({ message: "Product added!" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: `Something went wrong. ${err}` });
  }
}
