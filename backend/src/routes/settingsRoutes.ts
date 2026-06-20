import { Router, Request, Response } from 'express';
import Settings from '../models/Settings';

const router = Router();

// Get current settings (creates default if none exist)
router.get('/', async (req: Request, res: Response) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ deliveryFee: 30 });
    }
    res.json(settings);
  } catch (error) {
    console.error('Failed to fetch settings:', error);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Update settings (Admin)
router.put('/', async (req: Request, res: Response) => {
  try {
    const { deliveryFee } = req.body;

    if (typeof deliveryFee !== 'number' || deliveryFee < 0) {
      return res.status(400).json({ error: 'deliveryFee must be a non-negative number' });
    }

    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({ deliveryFee });
    } else {
      settings.deliveryFee = deliveryFee;
      await settings.save();
    }

    res.json(settings);
  } catch (error) {
    console.error('Failed to update settings:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;