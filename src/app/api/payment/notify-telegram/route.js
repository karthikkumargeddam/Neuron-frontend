import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { transactionId, amount, userId, userEmail, userName, planName } = body;

    if (!transactionId) {
      return NextResponse.json({ success: false, error: 'Transaction ID is required' }, { status: 400 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Build the message
    const message = `💰 *New Payment Submitted*
*Plan:* ${planName || 'Unknown Plan'}
*Amount:* ₹${amount || 0}
*User:* ${userName || 'Unknown'} (${userEmail || 'No Email'})
*User ID:* ${userId || 'No ID'}
*UTR/Transaction ID:* \`${transactionId}\`

_Please verify this UTR in your bank app._`;

    // Send to Telegram if credentials exist
    if (token && chatId) {
      const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
      const telegramRes = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      if (!telegramRes.ok) {
        console.error('Failed to send Telegram notification:', await telegramRes.text());
        // We still return success to the client so their flow isn't blocked by our notification failure
      } else {
        console.log('✅ Telegram notification sent successfully.');
      }
    } else {
      console.warn('⚠️ Telegram credentials (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID) are missing. Logging notification to console instead:');
      console.log(message);
    }

    return NextResponse.json({ success: true, message: 'Notification sent successfully' });

  } catch (error) {
    console.error('Error in notify-telegram API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
