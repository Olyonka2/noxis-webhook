import dotenv from 'dotenv';
import axios from 'axios';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(bodyParser.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

app.post('/webhook', async (req, res) => {
  const message = req.body.message;
  if (message && message.text) {
    const chatId = message.chat.id;
    const text = message.text.toLowerCase();

    console.log("📩 Получено сообщение:", text);

    if (text.includes("привет")) {
      await sendMessage(chatId, "Привет! Я твой демонюжка Noxis 😈");
    }
  }

  res.sendStatus(200);
});

async function sendMessage(chatId, text) {
  try {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
  } catch (err) {
    console.error("❌ Ошибка при отправке сообщения:", err.message);
  }
}

app.listen(3000, () => {
  console.log("🚀 Сервер запущен на http://localhost:3000");
});