import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOrderNotification = async (order: {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  locationMapsUrl?: string;
  items: any[];
  totalAmount: number;
  paymentTransactionId: string;
  specialInstructions?: string;
}) => {
  try {
    const itemsList = order.items
      .map((i) => `  • ${i.name} (${i.type}) x${i.quantity}  —  ₹${i.price * i.quantity}`)
      .join('\n');

    await transporter.sendMail({
      from:    `"Kilo Biryani" <${process.env.EMAIL_USER}>`,
      to:      process.env.ADMIN_NOTIFY_EMAIL,
      subject: `🍛 New Order ${order.orderNumber} — ₹${order.totalAmount}`,
      text: `
New order received on Kilo Biryani!

━━━━━━━━━━━━━━━━━━━━━━━━
Order #: ${order.orderNumber}
━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER DETAILS
Name    : ${order.customerName}
Phone   : ${order.customerPhone}
Address : ${order.deliveryAddress}
${order.locationMapsUrl ? `Live Location: ${order.locationMapsUrl}\n` : ''}
ORDER ITEMS
${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━
Total Amount    : ₹${order.totalAmount}
Transaction ID  : ${order.paymentTransactionId}
━━━━━━━━━━━━━━━━━━━━━━━━
${order.specialInstructions ? `\nSpecial Instructions: ${order.specialInstructions}\n` : ''}
Please verify the payment and start preparing the order.
      `.trim(),

      html: `
        <div style="font-family:sans-serif;max-width:500px;margin:0 auto;background:#0C0A08;color:#F5EDD8;border-radius:12px;overflow:hidden">
          <div style="background:#E8972A;padding:20px 24px">
            <h1 style="margin:0;font-size:20px;color:#000">🍛 New Order Received!</h1>
            <p style="margin:4px 0 0;font-size:13px;color:#000;opacity:0.7">${order.orderNumber}</p>
          </div>
          <div style="padding:24px">

            <div style="background:#1C1814;border-radius:10px;padding:16px;margin-bottom:16px">
              <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#B5A88A">Customer</p>
              <p style="margin:0 0 4px;font-size:15px;font-weight:600">${order.customerName}</p>
              <p style="margin:0 0 4px;font-size:13px;color:#B5A88A">📞 ${order.customerPhone}</p>
              <p style="margin:0;font-size:13px;color:#B5A88A">📍 ${order.deliveryAddress}</p>
              ${order.locationMapsUrl ? `
              <a href="${order.locationMapsUrl}" style="display:inline-block;margin-top:8px;font-size:13px;color:#E8972A;text-decoration:none">
                🗺️ Open exact location on Google Maps →
              </a>
              ` : ''}
            </div>

            <div style="background:#1C1814;border-radius:10px;padding:16px;margin-bottom:16px">
              <p style="margin:0 0 12px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#B5A88A">Items Ordered</p>
              ${order.items.map(i => `
                <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px">
                  <span>${i.name} (${i.type}) × ${i.quantity}</span>
                  <span style="color:#E8972A;font-weight:600">₹${i.price * i.quantity}</span>
                </div>
              `).join('')}
              <div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:12px;padding-top:12px;display:flex;justify-content:space-between;font-weight:700;font-size:15px">
                <span>Total</span>
                <span style="color:#E8972A">₹${order.totalAmount}</span>
              </div>
            </div>

            <div style="background:#1C1814;border-radius:10px;padding:16px;margin-bottom:16px">
              <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#B5A88A">Payment</p>
              <p style="margin:0;font-size:13px;font-family:monospace;color:#E8972A">${order.paymentTransactionId}</p>
            </div>

            ${order.specialInstructions ? `
            <div style="background:#1C1814;border-radius:10px;padding:16px;margin-bottom:16px">
              <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#B5A88A">Special Instructions</p>
              <p style="margin:0;font-size:13px">${order.specialInstructions}</p>
            </div>
            ` : ''}

            <p style="font-size:12px;color:#B5A88A;text-align:center;margin-top:20px">
              Please verify payment and start preparing the order.
            </p>
          </div>
        </div>
      `,
    });

    console.log(`✅ Order notification email sent for ${order.orderNumber}`);
  } catch (err) {
    console.error('❌ Failed to send order notification email:', err);
  }
};