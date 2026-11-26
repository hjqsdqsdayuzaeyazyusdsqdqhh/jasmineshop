/**
 * Sends a test message to the JasmineShop Telegram group.
 *
 * Usage:
 *   npm run test:telegram
 *
 * Requires TELEGRAM_BOT_TOKEN (and optionally TELEGRAM_CHAT_ID) in .env.local
 * or in the shell environment.
 */
const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
const chatId = process.env.TELEGRAM_CHAT_ID?.trim() || "-5334669783";
const apiBase =
  process.env.TELEGRAM_API_BASE?.trim() || "https://api.telegram.org";

if (!token) {
  console.error(
    "TELEGRAM_BOT_TOKEN manquant. Ajoutez-le dans .env.local (ou dans Vercel).",
  );
  process.exit(1);
}

const response = await fetch(`${apiBase}/bot${token}/sendMessage`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: chatId,
    text: "✅ Test JasmineShop — la connexion Telegram fonctionne. Les commandes arriveront dans ce groupe.",
    disable_web_page_preview: true,
  }),
});

const result = await response.json().catch(() => null);

if (!response.ok || !result?.ok) {
  console.error(
    "Échec de l’envoi Telegram.",
    response.status,
    result?.description ?? "Erreur inconnue",
  );
  process.exit(1);
}

console.log(
  `✅ Message de test envoyé au groupe ${chatId} (message ${result.result?.message_id}).`,
);
