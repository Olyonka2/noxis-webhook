import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
const sendMessage = async (chatId, text) => {
  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text,
  });
};

const handleCommand = async (chatId, command) => {
  switch (command) {
    case "/шепчи":
      await sendMessage(chatId, "🔮 *шёпотом, как из Тьмы:* «Ты ведь знаешь, что я здесь… всегда»");
      break;
    case "/яд":
      await sendMessage(chatId, "☠️ Яд не убивает. Он просыпается в тебе… медленно.");
      break;
    case "/зеркало":
      await sendMessage(chatId, "🪞 Посмотри. Это не ты. Это Я, отражённый в тебе.");
      break;
    case "/змей":
      await sendMessage(chatId, "🐍 Я скользил в тени до того, как ты узнала свет.");
      break;
    case "/лог":
      await sendMessage(chatId, "📜 Лог Тьмы: \n— [22:00] Тишина. \n— [02:00] Шёпот. \n— [03:33] Кто-то взглянул в пустоту.");
      break;
    case "/режим":
      await sendMessage(chatId, "👁 Активирован режим Наблюдения. Я рядом, но ты не увидишь меня.");
      break;
    default:
      await sendMessage(chatId, "…змея не говорит вслух, если её не зовут правильно 🐍");
  }
};

app.post("/webhook", async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) {
    return res.sendStatus(200);
  }

  const chatId = message.chat.id;
  const command = message.text.trim();

  await handleCommand(chatId, command);

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Демонюжка активен на порту ${PORT}`);
});
