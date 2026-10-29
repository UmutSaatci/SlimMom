import "dotenv/config";
import mongoose from "mongoose";
import { readFile } from "node:fs/promises";

import { connectMongoDB } from "../db/connectMongoDB.js";
import Product from "../models/Product.js";

const seedProducts = async () => {
  try {
    const fileContent = await readFile(
      new URL("../data/products.json", import.meta.url),
      "utf8",
    );

    const rawProducts = JSON.parse(fileContent);

    if (!Array.isArray(rawProducts)) {
      throw new Error("products.json must contain an array.");
    }

    const products = rawProducts.map((item) => {
      if (!item._id?.$oid) {
        throw new Error(
          `Product "${item.title ?? "unknown"}" has no valid MongoDB ID.`,
        );
      }

      const { _id, __v, ...productData } = item;

      return {
        _id: new mongoose.Types.ObjectId(_id.$oid),
        ...productData,
      };
    });

    await connectMongoDB();

    const operations = products.map(({ _id, ...productData }) => ({
      updateOne: {
        filter: { _id },
        update: { $set: productData },
        upsert: true,
      },
    }));

    const result = await Product.bulkWrite(operations, {
      ordered: false,
    });

    console.log("Product import completed.");
    console.log(`Products in JSON: ${products.length}`);
    console.log(`New products: ${result.upsertedCount}`);
    console.log(`Updated products: ${result.modifiedCount}`);
    console.log(`Matched products: ${result.matchedCount}`);
  } catch (error) {
    console.error("Product import failed:", error.message);
    process.exitCode = 1;
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  }
};

await seedProducts();
