import type {
  Subcategory,
  SubcategoryDoc,
} from "@/models/subcategory.model.js";
import SubcategoryModel from "@/models/subcategory.model.js";

const createManySubcategories = async (subcategories: Subcategory[]) => {
  return await SubcategoryModel.insertMany(subcategories);
};

const updateManySubcategories = async (subcategories: SubcategoryDoc[]) => {
  const operations = subcategories.map((item) => ({
    updateOne: {
      filter: { _id: item._id },
      update: { $set: { ...item } },
    },
  }));

  const results = await SubcategoryModel.bulkWrite(operations);
  return results as unknown as SubcategoryDoc[];
};

export default { createManySubcategories, updateManySubcategories };
