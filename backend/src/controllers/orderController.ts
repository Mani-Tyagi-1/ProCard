import { Request, Response } from 'express';
import { Order, OrderStatus } from '../models/Order';
import { Product } from '../models/Product';

/**
 * @desc    Create a new order (Checkout)
 * @route   POST /api/orders
 * @access  Public (Guest checkout)
 */
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId, buyerDetails } = req.body;

    // 1. Validate inputs
    if (!productId || !buyerDetails || !buyerDetails.fullName || !buyerDetails.phone || !buyerDetails.address || !buyerDetails.pincode) {
      res.status(400).json({ message: 'Missing required order details' });
      return;
    }

    // 2. Fetch the product
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    if (!product.isPublished) {
      res.status(400).json({ message: 'Product is no longer available' });
      return;
    }

    if (product.stock < 1) {
      res.status(400).json({ message: 'Product is out of stock' });
      return;
    }

    // 3. Calculate Pricing
    const amount = product.price;
    const deliveryCharge = 0; // Free delivery for now
    const totalAmount = amount + deliveryCharge;

    // 4. Create Order
    const order = new Order({
      productId: product._id,
      sellerId: product.sellerId, // The owner of the product
      buyerDetails: {
        fullName: buyerDetails.fullName,
        phone: buyerDetails.phone,
        email: buyerDetails.email,
        address: buyerDetails.address,
        pincode: buyerDetails.pincode,
      },
      amount,
      deliveryCharge,
      totalAmount,
      status: OrderStatus.PENDING, // Initial status
    });

    await order.save();

    // 5. Update Product Stock
    product.stock -= 1;
    await product.save();

    res.status(201).json({
      message: 'Order created successfully',
      orderId: order._id,
      totalAmount: order.totalAmount
    });
  } catch (error: any) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
};

/**
 * @desc    Get all orders for the dashboard
 * @route   GET /api/orders
 * @access  Public (for now)
 */
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find()
      .populate('productId', 'title images price')
      .sort({ createdAt: -1 });
    
    res.status(200).json(orders);
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};

/**
 * @desc    Get all unique customers from orders
 * @route   GET /api/orders/customers
 * @access  Public (for now)
 */
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await Order.aggregate([
      {
        $group: {
          _id: "$buyerDetails.phone",
          fullName: { $first: "$buyerDetails.fullName" },
          phone: { $first: "$buyerDetails.phone" },
          address: { $first: "$buyerDetails.address" },
          pincode: { $first: "$buyerDetails.pincode" },
          totalOrders: { $sum: 1 },
          totalSpent: { $sum: "$totalAmount" },
          lastOrderDate: { $max: "$createdAt" }
        }
      },
      { $sort: { lastOrderDate: -1 } }
    ]);
    
    res.status(200).json(customers);
  } catch (error: any) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ message: 'Failed to fetch customers', error: error.message });
  }
};
