"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import {
  Banknote,
  Check,
  Copy,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Truck,
  User,
} from "lucide-react";
import { Button, buttonStyles } from "@/components/ui/button";
import { QuantityStepper } from "@/components/ui/quantity-stepper";
import { formatPrice } from "@/lib/utils";
import { localizedPath } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/config/i18n";
import type { Product } from "@/data/products";
import type { Locale } from "@/types";
import { cn } from "@/lib/utils";

type FormErrors = {
  fullName?: string;
  phone?: string;
  city?: string;
  address?: string;
};

const inputClass =
  "h-11 w-full rounded-lg border border-ivory-300 bg-white ps-10 pe-3 text-[0.82rem] text-ink outline-none transition placeholder:text-smoke-light focus:border-wine-500 focus:ring-4 focus:ring-wine-500/10";

function isValidMoroccanPhone(value: string) {
  const digits = value.replace(/[\s().-]/g, "");
  return /^(?:\+212|00212|0)[5-7]\d{8}$/.test(digits);
}

function Field({
  id,
  label,
  error,
  icon,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-smoke-light"
          aria-hidden="true"
        >
          {icon}
        </span>
        {children}
      </div>
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-1.5 text-[0.68rem] text-wine-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function OrderForm({
  product,
  locale,
  dict,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
}) {
  const copy = dict.order;
  const productName = product.name[locale];
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");
  const [copied, setCopied] = useState(false);

  const subtotal = product.price * quantity;
  const total = subtotal;
  const subject = copy.emailSubject
    .replace("{product}", productName)
    .replace("{name}", fullName.trim() || "—");

  const orderSummary = [
    copy.emailIntro,
    "",
    productName,
    `${copy.quantity}: ${quantity}`,
    `${copy.unitPrice}: ${formatPrice(product.price, locale)}`,
    `${copy.total}: ${formatPrice(total, locale)}`,
    `${copy.payment}: ${copy.codLabel}`,
    "",
    copy.emailCustomer,
    `${copy.fullName}: ${fullName.trim()}`,
    `${copy.phone}: ${phone.trim()}`,
    `${copy.city}: ${city.trim()}`,
    `${copy.address}: ${address.trim()}`,
    "",
    copy.emailOutro,
  ].join("\n");

  const mailtoHref = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(orderSummary)}`;

  function validate() {
    const next: FormErrors = {};

    if (fullName.trim().length < 2) next.fullName = copy.errorRequired;
    if (!isValidMoroccanPhone(phone.trim())) next.phone = copy.errorPhone;
    if (city.trim().length < 2) next.city = copy.errorRequired;
    if (address.trim().length < 10) next.address = copy.errorRequired;

    return next;
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("ready");
    window.setTimeout(() => {
      window.location.href = mailtoHref;
    }, 120);
  }

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(orderSummary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-gold-400/45 bg-white p-5 shadow-[0_24px_60px_-42px_rgba(82,16,37,0.55)] sm:p-6">
      {status === "ready" ? (
        <div aria-live="polite">
          <span className="flex size-11 items-center justify-center rounded-full bg-wine-800 text-ivory-50">
            <Check size={20} strokeWidth={2} aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-display text-[1.45rem] leading-tight text-wine-950">
            {copy.readyTitle}
          </h2>
          <p className="mt-2 text-[0.82rem] leading-relaxed text-smoke">
            {copy.readyText}
          </p>

          <a
            href={mailtoHref}
            className={buttonStyles({
              variant: "primary",
              size: "md",
              fullWidth: true,
              className: "mt-5",
            })}
          >
            <Mail size={15} strokeWidth={1.7} aria-hidden="true" />
            {copy.openEmail}
          </a>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={copySummary}
              className="inline-flex items-center gap-2 rounded-full border border-ivory-300 px-4 py-2 text-[0.7rem] font-medium text-ink-soft transition-colors hover:border-wine-800/30 hover:text-wine-800"
            >
              <Copy size={13} strokeWidth={1.7} aria-hidden="true" />
              {copied ? copy.copied : copy.copy}
            </button>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="inline-flex items-center rounded-full px-4 py-2 text-[0.7rem] font-medium text-wine-800 transition-colors hover:bg-ivory-100"
            >
              {copy.edit}
            </button>
          </div>

          <p className="mt-5 text-[0.68rem] leading-relaxed text-smoke">
            {copy.privacy}
          </p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate>
          <div className="border-b border-ivory-200 pb-4 text-center">
            <h2 className="font-display text-[1.4rem] leading-tight text-wine-950">
              {copy.formTitle}
            </h2>
            <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-700">
              {copy.formSubtitle}
            </p>
          </div>

          <div className="mt-4 space-y-3">
            <Field
              id="order-name"
              label={copy.fullName}
              error={errors.fullName}
              icon={<User size={15} strokeWidth={1.6} />}
            >
              <input
                id="order-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder={copy.fullNamePlaceholder}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={errors.fullName ? "order-name-error" : undefined}
                className={cn(inputClass, errors.fullName && "border-wine-500")}
              />
            </Field>

            <Field
              id="order-phone"
              label={copy.phone}
              error={errors.phone}
              icon={<Phone size={15} strokeWidth={1.6} />}
            >
              <input
                id="order-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder={copy.phonePlaceholder}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "order-phone-error" : undefined}
                className={cn(inputClass, errors.phone && "border-wine-500")}
              />
            </Field>

            <Field
              id="order-city"
              label={copy.city}
              error={errors.city}
              icon={<MapPin size={15} strokeWidth={1.6} />}
            >
              <input
                id="order-city"
                name="city"
                type="text"
                required
                autoComplete="address-level2"
                value={city}
                onChange={(event) => setCity(event.target.value)}
                placeholder={copy.cityPlaceholder}
                aria-invalid={Boolean(errors.city)}
                aria-describedby={errors.city ? "order-city-error" : undefined}
                className={cn(inputClass, errors.city && "border-wine-500")}
              />
            </Field>

            <Field
              id="order-address"
              label={copy.address}
              error={errors.address}
              icon={<Home size={15} strokeWidth={1.6} />}
            >
              <input
                id="order-address"
                name="address"
                type="text"
                required
                autoComplete="street-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder={copy.addressPlaceholder}
                aria-invalid={Boolean(errors.address)}
                aria-describedby={
                  errors.address ? "order-address-error" : undefined
                }
                className={cn(inputClass, errors.address && "border-wine-500")}
              />
            </Field>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 rounded-lg bg-ivory-50 px-3 py-1.5">
            <span className="text-[0.74rem] font-semibold text-ink-soft">
              {copy.quantity}
            </span>
            <QuantityStepper
              value={quantity}
              onChange={setQuantity}
              max={10}
              decrementLabel={`− ${copy.quantity}`}
              incrementLabel={`+ ${copy.quantity}`}
            />
          </div>

          <dl className="mt-3 space-y-2 rounded-lg bg-ivory-50 p-3.5 text-[0.78rem]">
            <div className="flex items-center justify-between gap-4">
              <dt className="text-smoke">{copy.subtotal}</dt>
              <dd className="font-medium text-ink">
                <span dir="ltr">{formatPrice(subtotal, locale)}</span>
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-smoke">{copy.shipping}</dt>
              <dd className="text-end font-medium text-wine-800">
                {copy.shippingValue}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-ivory-200 pt-2">
              <dt className="text-[0.8rem] font-semibold text-ink">
                {copy.total}
              </dt>
              <dd className="font-display text-[1.4rem] leading-none text-wine-800">
                <span dir="ltr">{formatPrice(total, locale)}</span>
              </dd>
            </div>
          </dl>
          <p className="mt-1.5 text-[0.62rem] leading-relaxed text-smoke">
            {copy.shippingNote}
          </p>

          <Button
            type="submit"
            size="lg"
            fullWidth
            className="mt-4"
            iconLeft={<ShoppingCart size={16} strokeWidth={1.7} />}
          >
            {copy.buyNow}
          </Button>

          <p className="mt-2 text-center text-[0.62rem] leading-relaxed text-smoke">
            {copy.emailNote}
          </p>

          <ul className="mt-3 grid grid-cols-3 gap-1.5 border-t border-ivory-200 pt-3">
            {[
              { icon: Banknote, label: copy.trustCod, iconClass: "text-gold-600" },
              { icon: Truck, label: copy.trustDelivery, iconClass: "text-gold-600" },
              {
                icon: ShieldCheck,
                label: copy.trustQuality,
                iconClass: "text-wine-700",
              },
            ].map((item) => (
              <li
                key={item.label}
                className="flex flex-col items-center gap-1 text-center"
              >
                <item.icon
                  size={15}
                  strokeWidth={1.5}
                  className={item.iconClass}
                  aria-hidden="true"
                />
                <span className="text-[0.56rem] leading-tight text-smoke">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={`tel:${siteConfig.phoneHref}`}
            className="mt-3 flex items-center justify-center gap-1.5 text-[0.68rem] font-medium text-wine-800 hover:text-wine-600"
          >
            <Phone size={11} strokeWidth={1.7} aria-hidden="true" />
            {copy.callNote.split("{phone}")[0]}
            <span dir="ltr">{siteConfig.phone}</span>
            {copy.callNote.split("{phone}")[1]}
          </a>

          <p className="mt-2 text-center text-[0.62rem] leading-relaxed text-smoke">
            {copy.privacy}{" "}
            <a
              href={localizedPath(locale, "/legal#privacy")}
              className="underline underline-offset-2 hover:text-wine-800"
            >
              {dict.footer.privacy}
            </a>
          </p>
        </form>
      )}
    </div>
  );
}
