import Product from '../Models/Product.js';

// @desc   Get all products
// @route  GET /api/products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//post request
export const createProduct= async(req,res)=>{
  try{
    const product = await Product.create(req.body);
    res.status(201).json(product);
  }
  catch(err){
   res.status(400).json({ message: err.message });

  }
};
// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export default {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
 
};