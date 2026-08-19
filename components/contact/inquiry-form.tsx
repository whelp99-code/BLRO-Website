"use client"

import Script from "next/script"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { emitAnalyticsEvent } from "@/components/analytics/emit-analytics-event"
import { submitInquiry, type InquiryTopic } from "@/lib/lead-api"
import { PRIVACY_NOTICE_VERSION } from "@/lib/privacy-notice"
import { resolveLeadApiUrl, resolveTurnstileSiteKey } from "@/lib/public-runtime"

const endpoint = resolveLeadApiUrl(process.env["NEXT_PUBLIC_LEAD_API_URL"], process.env.NODE_ENV)
const siteKey = resolveTurnstileSiteKey(process.env["NEXT_PUBLIC_TURNSTILE_SITE_KEY"], process.env.NODE_ENV)

function value(formData: FormData, name: string): string {
  const result = formData.get(name)
  return typeof result === "string" ? result.trim() : ""
}

function topicFromType(type: string | null): InquiryTopic {
  if (type === "customer-project" || type === "partner-collaboration" || type === "vendor-korea-entry") return type
  return "general"
}

function contactCtaId(type: string | null): "contact-customer-project" | "contact-partner-collaboration" | "contact-vendor-korea-entry" | "contact-general" {
  if (type === "customer-project") return "contact-customer-project"
  if (type === "partner-collaboration") return "contact-partner-collaboration"
  if (type === "vendor-korea-entry") return "contact-vendor-korea-entry"
  return "contact-general"
}

export function InquiryForm() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [hasStarted, setHasStarted] = useState(false)
  const topic = topicFromType(searchParams?.get("type") ?? null)
  const analyticsCtaId = contactCtaId(searchParams?.get("type") ?? null)
  const ready = endpoint !== undefined && siteKey !== undefined

  function trackStart() {
    if (hasStarted) return
    setHasStarted(true)
    emitAnalyticsEvent("form_started", { ctaId: analyticsCtaId, placement: "contact-form", topic })
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) return
    const form = event.currentTarget
    const formData = new FormData(form)
    if (formData.get("privacyConsent") !== "on") {
      emitAnalyticsEvent("form_validation_failed", { field: "consent", placement: "contact-form", topic })
      setStatus("error")
      return
    }
    const turnstileToken = value(formData, "cf-turnstile-response")
    if (turnstileToken.length === 0) {
      emitAnalyticsEvent("turnstile_failed", { placement: "contact-form", topic })
      setStatus("error")
      return
    }
    setStatus("submitting")
    try {
      const phone = value(formData, "phone")
      const message = value(formData, "message")
      await submitInquiry(endpoint, {
        company: value(formData, "company"),
        name: value(formData, "name"),
        workEmail: value(formData, "workEmail"),
        ...(phone ? { phone } : {}),
        topic,
        ...(message ? { message } : {}),
        consent: { privacyVersion: PRIVACY_NOTICE_VERSION, marketing: false },
        attribution: { ctaId: analyticsCtaId, landingPath: window.location.pathname, utm: {} },
        turnstileToken,
      })
      emitAnalyticsEvent("inquiry_accepted", { ctaId: analyticsCtaId, placement: "contact-form", topic })
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <form className="inquiry-form" onFocusCapture={trackStart} onSubmit={onSubmit}>
      {siteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /> : null}
      <div className="inquiry-form__grid">
        <label>회사명<input autoComplete="organization" name="company" required /></label>
        <label>담당자명<input autoComplete="name" name="name" required /></label>
        <label>업무용 이메일<input autoComplete="email" name="workEmail" required type="email" /></label>
        <label>연락처 <span>(선택)</span><input autoComplete="tel" name="phone" type="tel" /></label>
      </div>
      <label>현재 상황과 검토 목적<textarea name="message" rows={5} /></label>
      {siteKey ? <div className="cf-turnstile" data-action="turnstile-spin-v2" data-sitekey={siteKey} /> : null}
      <label className="inquiry-form__consent">
        <input name="privacyConsent" required type="checkbox" />
        <span><a href="/privacy" target="_blank">개인정보 처리 안내</a>를 확인했으며, 상담 요청 처리와 BLRO 전달을 위한 개인정보 수집·이용에 동의합니다.</span>
      </label>
      {!ready ? <p className="inquiry-form__notice">안전한 접수 서비스 연결을 준비 중입니다.</p> : null}
      {status === "success" ? <p className="inquiry-form__success" role="status">상담 요청을 접수했습니다. 확인 후 연락드리겠습니다.</p> : null}
      {status === "error" ? <p className="inquiry-form__error" role="alert">접수에 실패했습니다. 정보를 확인한 뒤 다시 시도해 주세요.</p> : null}
      <button className="blro-button blro-button--primary" disabled={!ready || status === "submitting"} type="submit">
        {status === "submitting" ? "접수 중" : "상담 요청 보내기"}
      </button>
    </form>
  )
}
