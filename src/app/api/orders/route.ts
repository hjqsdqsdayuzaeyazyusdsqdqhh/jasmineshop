import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { TELEGRAM_ORDERS_CHAT_ID } from "@/config/telegram";

export const runtime = "nodejs";

type OrderPayload = {
  productId?: unknown;
  quantity?: unknown;
  fullName?: unknown;
  phone?: unknown;
  city?: unknown;
  address?: unknown;
  locale?: unknown;
};

const TELEGRAM_CHAT_ID =
  process.env.TELEGRAM_CHAT_ID?.trim() || TELEGRAM_ORDERS_CHAT_ID;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN?.trim();
const TELEGRAM_API_BASE =
  process.env.TELEGRAM_API_BASE?.trim() || "https://api.telegram.org";

function asText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidMoroccanPhone(value: string) {
  const digits = value.replace(/[\s().-]/g, "");
  return /^(?:\+212|00212|0)[5-7]\d{8}$/.test(digits);
}

function orderReference() {
  return `JS-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

function errorResponse(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (origin) {
      try {
        if (!host || new URL(origin).host !== host) {
          return errorResponse(403, "forbidden");
        }
      } catch {
        return errorResponse(403, "forbidden");
      }
    }

    if (!TELEGRAM_BOT_TOKEN) {
      console.error("Order API: TELEGRAM_BOT_TOKEN is not configured.");
      return errorResponse(503, "server_not_configured");
    }

    const body = (await request.json().catch(() => null)) as
      | OrderPayload
      | null;

    if (!body) return errorResponse(400, "invalid_payload");

    const productId = asText(body.productId, 80);
    const fullName = asText(body.fullName, 80);
    const phone = asText(body.phone, 30);
    const city = asText(body.city, 80);
    const address = asText(body.address, 300);
    const quantity = Number(body.quantity);
    const locale = body.locale === "ar" ? "ar" : "fr";

    const product = products.find((item) => item.id === productId);
    if (!product) return errorResponse(400, "invalid_product");

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return errorResponse(400, "invalid_quantity");
    }
    if (fullName.length < 2) return errorResponse(400, "invalid_name");
    if (!isValidMoroccanPhone(phone)) {
      return errorResponse(400, "invalid_phone");
    }
    if (city.length < 2) return errorResponse(400, "invalid_city");
    if (address.length < 10) return errorResponse(400, "invalid_address");

    const productName = product.name[locale];
    const unitPrice = product.price;
    const total = unitPrice * quantity;
    const reference = orderReference();
    const date = new Intl.DateTimeFormat("fr-MA", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "Africa/Casablanca",
    }).format(new Date());

    const message = [
      "🛒 NOUVELLE COMMANDE — JasmineShop",
      "",
      `Référence : ${reference}`,
      `Date : ${date} (Casablanca)`,
      "",
      `Produit : ${productName}`,
      `Réf. produit : ${product.id}`,
      `Quantité : ${quantity}`,
      `Prix unitaire : ${unitPrice} DH`,
      `Total : ${total} DH`,
      "Paiement : à la livraison",
      "",
      "Coordonnées client",
      `Nom : ${fullName}`,
      `Téléphone : ${phone}`,
      `Ville : ${city}`,
      `Adresse : ${address}`,
      `Langue : ${locale === "ar" ? "Arabe" : "Français"}`,
    ].join("\n");

    let telegramResponse: Response;
    try {
      telegramResponse = await fetch(
        `${TELEGRAM_API_BASE}/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            disable_web_page_preview: true,
          }),
          cache: "no-store",
          signal: AbortSignal.timeout(10000),
        },
      );
    } catch (error) {
      console.error(
        "Order API: Telegram request failed.",
        error instanceof Error ? error.message : error,
      );
      return errorResponse(502, "telegram_failed");
    }

    const telegramResult = (await telegramResponse.json().catch(() => null)) as
      | { ok?: boolean; description?: string }
      | null;

    if (!telegramResponse.ok || !telegramResult?.ok) {
      console.error(
        "Order API: Telegram sendMessage failed.",
        telegramResponse.status,
        telegramResult?.description ?? "Unknown error",
      );
      return errorResponse(502, "telegram_failed");
    }

    return NextResponse.json({ ok: true, reference });
  } catch (error) {
    console.error(
      "Order API: unexpected error.",
      error instanceof Error ? error.message : error,
    );
    return errorResponse(500, "server_error");
  }
}
