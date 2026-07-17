import { handleSadadReturn } from "@/core/payments/sadad-return";

/**
 * Matches the exact "Payment Success/Failed Return URL" configured in the
 * SADAD merchant dashboard (https://yourdomain.com/payment/sadadpay). Lives
 * under [locale] — unlike /api routes, this path isn't excluded from the
 * i18n middleware, so a request with no locale prefix gets redirected to
 * /ar/payment/sadadpay (the default locale) before landing here. See
 * handleSadadReturn() for the actual verify-and-redirect logic, shared with
 * the canonical /api/payments/sadad-return route.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const url = new URL(request.url);
  return handleSadadReturn(url, locale);
}
