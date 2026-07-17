export const PRIVACY_NOTICE_VERSION = "2026-07-17"

function effectiveDateLabel(version: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/u.exec(version)
  if (match === null) throw new Error("invalid privacy notice version")
  const year = match[1]
  const month = match[2]
  const day = match[3]
  if (year === undefined || month === undefined || day === undefined) throw new Error("invalid privacy notice version")
  return `${year}년 ${Number(month)}월 ${Number(day)}일`
}

export const PRIVACY_NOTICE_EFFECTIVE_LABEL = effectiveDateLabel(PRIVACY_NOTICE_VERSION)
