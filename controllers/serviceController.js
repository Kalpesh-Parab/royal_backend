import ServiceCategory from "../models/ServiceCategory.js";

// @desc    Get all service categories
// @route   GET /api/services
export const getAllCategories = async (req, res) => {
  try {
    const categories = await ServiceCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Create a new service category
// @route   POST /api/services
export const createCategory = async (req, res) => {
  try {
    const { categoryName, services } = req.body;

    if (!categoryName || !services) {
      return res.status(400).json({ message: "categoryName and services are required" });
    }

    const newCategory = await ServiceCategory.create({
      categoryName,
      services,
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Get category by ID
// @route   GET /api/services/:id
export const getCategoryById = async (req, res) => {
  try {
    const category = await ServiceCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Update category
// @route   PUT /api/services/:id
export const updateCategory = async (req, res) => {
  try {
    const updatedCategory = await ServiceCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc    Delete category
// @route   DELETE /api/services/:id
export const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await ServiceCategory.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// ---------------------------------------
// EXTRA: manipulate services in a category
// ---------------------------------------

// @desc Add a service
// @route PATCH /api/services/:id/add
export const addService = async (req, res) => {
  try {
    const { service } = req.body;

    if (!service) {
      return res.status(400).json({ message: "Service name required" });
    }

    const category = await ServiceCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.services.push(service);
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// @desc Delete a service
// @route PATCH /api/services/:id/delete
export const deleteService = async (req, res) => {
  try {
    const { service } = req.body;

    const category = await ServiceCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.services = category.services.filter(item => item !== service);
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const updateService = async (req, res) => {
  try {
    const { oldService, newService } = req.body;

    const category = await ServiceCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const index = category.services.indexOf(oldService);

    if (index === -1) {
      return res.status(404).json({ message: "Service not found" });
    }

    category.services[index] = newService;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
