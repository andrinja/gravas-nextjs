import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next/pages";
import { TR_NS } from "../../constants/translationNamespace";
import { RequestSection } from "./style";
import { ActionLink } from "../hero/style";

// Public form on /davanu-karte. Posts to /api/giftcard-request, which
// creates a draft in the admin dashboard and emails the owner. No prices
// here on purpose: the owner quotes, the customer gets an invoice.
export default function GiftCardRequest() {
  const { t } = useTranslation(TR_NS.GIFT_CARDS);
  const { locale } = useRouter();
  const [state, setState] = useState({ busy: false, ok: null, message: "" });

  const submit = async event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = Object.fromEntries(form.entries());
    body.language = locale || "lv";
    setState({ busy: true, ok: null, message: "" });
    try {
      const res = await fetch("/api/giftcard-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        event.target.reset();
        setState({ busy: false, ok: true, message: json.message });
      } else {
        setState({ busy: false, ok: false, message: t("request_error") });
      }
    } catch {
      setState({ busy: false, ok: false, message: t("request_error") });
    }
  };

  return (
    <RequestSection aria-labelledby="gift-request-title">
      <h2 id="gift-request-title">{t("request_title")}</h2>
      <p className="intro">{t("request_intro")}</p>
      <form onSubmit={submit}>
        <div className="grid">
          <label>
            {t("request_name")}
            <input name="name" required minLength={2} maxLength={120} autoComplete="name" />
          </label>
          <label>
            {t("request_email")}
            <input name="email" type="email" required maxLength={200} autoComplete="email" />
          </label>
        </div>
        <div className="grid" style={{ marginTop: "0.875rem" }}>
          <label>
            {t("request_phone")}
            <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
          </label>
        </div>
        <label style={{ marginTop: "0.875rem" }}>
          {t("request_text")}
          <textarea name="request" required minLength={10} maxLength={2000} placeholder={t("request_text_placeholder")} />
        </label>
        {/* Honeypot: hidden from people, tempting to bots. */}
        <label className="honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <div className="actions" style={{ marginTop: "1.25rem" }}>
          <ActionLink as="button" type="submit" className="primary" disabled={state.busy} style={{ border: "none", cursor: "pointer" }}>
            {state.busy ? t("request_sending") : t("request_submit")}
          </ActionLink>
          <span>
            {t("request_or_email")} <a href="mailto:info@gravas.lv">info@gravas.lv</a>
          </span>
        </div>
        {state.ok !== null ? (
          <p className={`status ${state.ok ? "ok" : "error"}`} role="status" style={{ marginTop: "1rem" }}>
            {state.message}
          </p>
        ) : null}
      </form>
    </RequestSection>
  );
}
