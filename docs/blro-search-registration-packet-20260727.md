# 검색 등록 실행 패킷 — 2026-07-27

## 등록 대상

- 대표 속성: `https://blro.co.kr/`
- 비대표 주소: `https://www.blro.co.kr/` — 301로 대표 주소에 통일
- Sitemap: `https://blro.co.kr/sitemap.xml`
- Robots: `https://blro.co.kr/robots.txt`

## 현재 확인

- 대표 웹·robots·sitemap HTTP 200
- sitemap은 대표 도메인 URL을 사용
- 공개 Google 검색 `site:blro.co.kr` 결과는 현재 0건
- 7월 15일 기록에는 Google sitemap 발견 URL 23개가 있으나 최신 Search Console 화면은 재확인 필요
- 네이버 소유권·sitemap 제출은 저장된 증거가 없음

## 계정 작업 체크리스트

### Google Search Console

1. Domain property `blro.co.kr` 선택
2. DNS TXT 소유권 인증
3. `https://blro.co.kr/sitemap.xml` 제출
4. `/`, `/contact`, `/solutions`, `/insights` URL 검사 및 색인 요청
5. 제출 화면, 소유권 화면, 발견 URL·색인 URL·오류를 `docs/seo-baseline-20260727.md`에 기록

### 네이버 서치어드바이저

1. `blro.co.kr` 사이트 등록
2. DNS 또는 HTML 소유권 인증
3. 동일 Sitemap 제출
4. 수집 요청과 색인 제외 사유 확인
5. 인증·sitemap·수집 상태 화면을 같은 기준선 문서에 기록

## 완료 기준

- 두 도구 모두 소유권 인증과 sitemap 수신이 확인됨
- 대표 URL과 canonical이 일치함
- 색인·노출·클릭 기준선이 날짜와 함께 저장됨
- 미색인 URL마다 담당자와 다음 확인일이 있음
