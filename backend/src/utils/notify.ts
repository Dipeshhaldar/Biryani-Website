// Sends a push notification to the owner's phone via ntfy.sh
// Works over plain HTTPS — no SMTP, so it works fine on Render free tier.

const NTFY_TOPIC = process.env.NTFY_TOPIC || 'kilo-biryani-orders-kdricuq7le0c';
const NTFY_URL    = `https://ntfy.sh/${NTFY_TOPIC}`;

export const sendOrderPushAlert = async (order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  deliveryAddress: string;
}) => {
  try {
    const body = `${order.customerName} • ₹${order.totalAmount}\n${order.deliveryAddress}\nCall: ${order.customerPhone}`;

    await fetch(NTFY_URL, {
      method: 'POST',
      headers: {
        'Title':    `New Order ${order.orderNumber}`,
        'Priority': 'urgent',
        'Tags':     'rotating_light,curry',
      },
      body,
    });

    console.log(`✅ Push alert sent for ${order.orderNumber}`);
  } catch (err) {
    // Never block order creation if the push alert fails
    console.error('❌ Failed to send push alert:', err);
  }
};