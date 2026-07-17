import { handleSadadReturn } from "@/core/payments/sadad-return";

/**
 * Canonical SADAD return-URL handler. See handleSadadReturn() for the actual
 * logic — this route and /[locale]/payment/sadadpay both call it, since the
 * exact path pasted into the SADAD dashboard varies (SADAD requires a locale
 * prefix outside /api, this one doesn't need it).
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const locale = url.searchParams.get("locale") ?? "ar";
  return handleSadadReturn(url, locale);
}
