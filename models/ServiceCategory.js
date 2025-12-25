import mongoose from "mongoose";

const serviceCategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  services: [
    {
      type: String,
      required: true,
    },
  ],
});

const ServiceCategory = mongoose.model("ServiceCategory", serviceCategorySchema);

export default ServiceCategory;
