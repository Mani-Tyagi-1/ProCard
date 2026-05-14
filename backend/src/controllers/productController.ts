import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { User, UserRole } from '../models/User';

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public (for now, will need auth later)
 */
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      price,
      stock,
      images,
      status, // "active" or "draft" mapped to isPublished
    } = req.body;

    // We need a dummy sellerId for now until auth is fully wired
    // Let's find the first user in the DB to attach this product to.
    let seller = await User.findOne();
    
    // If no user exists, create a dummy one
    if (!seller) {
      seller = await User.create({
        phone: '1234567890',
        role: UserRole.SELLER,
        isVerified: true,
      });
    }

    // Generate a simple slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '') + '-' + Date.now();

    const product = await Product.create({
      sellerId: seller._id,
      title,
      slug,
      description,
      price: Number(price),
      stock: Number(stock),
      images,
      category: 'Uncategorized', // Default for now
      isPublished: status === 'active',
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error: any) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find().populate('sellerId', 'fullName phone');
    res.status(200).json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

/**
 * @desc    Get a single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Public
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, stock, images, status } = req.body;

    let product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.price = price !== undefined ? Number(price) : product.price;
    product.stock = stock !== undefined ? Number(stock) : product.stock;
    product.images = images && images.length > 0 ? images : product.images;
    if (status) {
      product.isPublished = status === 'active';
    }

    const updatedProduct = await product.save();
    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error: any) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Public
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};
