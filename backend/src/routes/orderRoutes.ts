import { Router, Request, Response } from 'express';
import { sendOrderNotification } from '../utils/mailer';
import Order from '../models/Order';

const router = Router();

// Create order
router.post('/', async (req: Request, res: Response) => {
  try {
    const orderNumber = `ORD-${Date.now()}`;
    const order = new Order({
      ...req.body,
      orderNumber,
    });
    await order.save();
    sendOrderNotification({
      orderNumber:          order.orderNumber,
      customerName:         order.customerName,
      customerPhone:        order.customerPhone,
      deliveryAddress:      order.deliveryAddress,
      locationMapsUrl:      order.locationMapsUrl,
      items:                order.items,
      totalAmount:          order.totalAmount,
      paymentTransactionId: order.paymentTransactionId,
      specialInstructions:  order.specialInstructions,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders (Admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Get order by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status (Admin)
router.put('/:id/status', async (req: Request, res: Response) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Verify payment (Admin)
router.post('/:id/verify-payment', async (req: Request, res: Response) => {
  try {
    const { verified } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: verified ? 'completed' : 'failed' },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify payment' });
  }
});

export default router;