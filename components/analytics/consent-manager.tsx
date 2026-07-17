"use client"

import Link from "next/link"
import { useSyncExternalStore } from "react"

const CONSENT_STORAGE_KEY = "blro-analytics-consent"
export const CONSENT_CHANGE_EVENT = "blro:analytics-consent-change"

export type AnalyticsConsent = "accepted" | "rejected" | "undecided"

export function getAnalyticsConsent(): AnalyticsConsent {
  if (typeof window === "undefined") return "undecided"
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY)
  return stored === "accepted" || stored === "rejected" ? stored : "undecided"
}

export function subscribeToConsent(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange)
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange)
  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange)
  }
}

export function ConsentManager() {
  const consent = useSyncExternalStore(subscribeToConsent, getAnalyticsConsent, () => "undecided")

  function decide(nextConsent: Exclude<AnalyticsConsent, "undecided">) {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextConsent)
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT))
  }

  if (consent !== "undecided") return null

  return (
    <aside aria-labelledby="analytics-consent-heading" className="blro-consent" data-testid="analytics-consent">
      <p id="analytics-consent-heading">
        사이트 개선을 위한 비식별 이용 측정입니다. 이름·이메일·문의 내용은 측정하지 않습니다. <Link href="/privacy#usage-measurement">자세히 보기</Link>
      </p>
      <div>
        <button className="blro-button blro-button--secondary blro-button--compact" onClick={() => decide("rejected")} type="button">
          거부
        </button>
        <button className="blro-button blro-button--primary blro-button--compact" onClick={() => decide("accepted")} type="button">
          동의
        </button>
      </div>
    </aside>
  )
}
