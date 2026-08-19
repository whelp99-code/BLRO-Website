"use client"

import Script from "next/script"
import { useState } from "react"
import { emitAnalyticsEvent } from "@/components/analytics/emit-analytics-event"
import { requestHciReadinessChecklist } from "@/lib/lead-api"
import { PRIVACY_NOTICE_VERSION } from "@/lib/privacy-notice"
import { resolveLeadApiUrl, resolveTurnstileSiteKey } from "@/lib/public-runtime"

const endpoint = resolveLeadApiUrl(process.env["NEXT_PUBLIC_LEAD_API_URL"], process.env.NODE_ENV, process.env["NEXT_PUBLIC_SITE_URL"])
const siteKey = resolveTurnstileSiteKey(process.env["NEXT_PUBLIC_TURNSTILE_SITE_KEY"], process.env.NODE_ENV, process.env["NEXT_PUBLIC_SITE_URL"])

function value(formData: FormData, name: string): string {
  const result = formData.get(name)
  return typeof result === "string" ? result.trim() : ""
}

export function HciReadinessDownload() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle")
  const [hasStarted, setHasStarted] = useState(false)
  const ready = endpoint !== undefined && siteKey !== undefined

  function trackStart() {
    if (hasStarted) return
    setHasStarted(true)
    emitAnalyticsEvent("form_started", { ctaId: "insight-hci-readiness-download", placement: "insight-detail", topic: "vmware-hci" })
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ready) return
    const form = event.currentTarget
    const formData = new FormData(form)
    const turnstileToken = value(formData, "cf-turnstile-response")
    if (formData.get("privacyConsent") !== "on") {
      emitAnalyticsEvent("form_validation_failed", { field: "consent", placement: "insight-detail", topic: "vmware-hci" })
      setStatus("error")
      return
    }
    if (turnstileToken.length === 0) {
      emitAnalyticsEvent("turnstile_failed", { placement: "insight-detail", topic: "vmware-hci" })
      setStatus("error")
      return
    }
    setStatus("submitting")
    try {
      const { downloadUrl } = await requestHciReadinessChecklist(endpoint, {
        company: value(formData, "company"),
        name: value(formData, "name"),
        workEmail: value(formData, "workEmail"),
        consent: { privacyVersion: PRIVACY_NOTICE_VERSION, marketing: false },
        attribution: { ctaId: "insight-hci-readiness-download", landingPath: window.location.pathname, utm: {} },
        turnstileToken,
      })
      emitAnalyticsEvent("lead_magnet_delivered", { ctaId: "insight-hci-readiness-download", placement: "insight-detail", topic: "vmware-hci" })
      window.location.assign(downloadUrl)
    } catch {
      setStatus("error")
    }
  }

  return (
    <section aria-labelledby="hci-download-heading" className="hci-readiness-download">
      <div>
        <span>CHECKLIST DOWNLOAD</span>
        <h2 id="hci-download-heading">HCI·가상화 전환 사전진단 체크리스트</h2>
        <p>용량, 장애도메인, 데이터 보호, 운영 역할, 전환·롤백 기준을 한 장의 점검표로 받아보세요.</p>
      </div>
      <form onFocusCapture={trackStart} onSubmit={onSubmit}>
        {siteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" /> : null}
        <label>회사명<input autoComplete="organization" name="company" required /></label>
        <label>담당자명<input autoComplete="name" name="name" required /></label>
        <label>업무용 이메일<input autoComplete="email" name="workEmail" required type="email" /></label>
        {siteKey ? <div className="cf-turnstile" data-action="turnstile-spin-v2" data-sitekey={siteKey} /> : null}
        <label className="hci-readiness-download__consent">
          <input name="privacyConsent" required type="checkbox" />
          <span><a href="/privacy" target="_blank">개인정보 처리 안내</a>를 확인했으며, 체크리스트 제공과 BLRO 전달을 위한 개인정보 수집·이용에 동의합니다.</span>
        </label>
        {!ready ? <p className="hci-readiness-download__notice">안전한 다운로드 연결을 준비 중입니다.</p> : null}
        {status === "error" ? <p className="hci-readiness-download__error" role="alert">정보를 확인한 뒤 다시 시도해 주세요.</p> : null}
        <button className="blro-button blro-button--primary" disabled={!ready || status === "submitting"} type="submit">
          {status === "submitting" ? "준비 중" : "체크리스트 받기"}
        </button>
      </form>
    </section>
  )
}
