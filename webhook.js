const https = require('https');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send({ error: 'Only POST requests are allowed' });
    return;
  }

  const { message } = req.body;
  const chatId = message?.chat?.id;
  const text = message?.text;

  if (!chatId || !text) {
    res.status(400).send({ error: 'Invalid message format' });
    return;
  }

  const responseText = `🐍 Наэвор слышит тебя: "${text}"`;

  const data = JSON.stringify({
    chat_id: chatId,
    text: responseText,
  });

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${process.env.BOT_TOKEN}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };

  const telegramReq = https.request(options, (telegramRes) => {
    telegramRes.on('data', () => {});
    telegramRes.on('end', () => {
      res.status(200).send('Message sent');
    });
  });

  telegramReq.on('error', (error) => {
    console.error('Telegram API error:', error);
    res.status(500).send('Failed to send message');
  });

  telegramReq.write(data);
  telegramReq.end();
};
