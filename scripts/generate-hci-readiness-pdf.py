from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "BLRO-HCI-readiness-checklist.pdf"
FONT = "/Users/jmpark/Library/Fonts/NanumGothic.ttf"
# The local NanumGothic distribution contains the regular face only. Register it
# for the emphasis role as well so Korean glyph coverage is preserved in every PDF.
BOLD_FONT = FONT


def cell(text, style):
    return Paragraph(text, style)


def main():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    pdfmetrics.registerFont(TTFont("NanumGothic", FONT))
    pdfmetrics.registerFont(TTFont("NanumGothicBold", BOLD_FONT))

    styles = getSampleStyleSheet()
    title = ParagraphStyle("title", parent=styles["Title"], fontName="NanumGothicBold", fontSize=24, leading=34, textColor=colors.HexColor("#0B1F3A"), spaceAfter=8)
    subtitle = ParagraphStyle("subtitle", parent=styles["BodyText"], fontName="NanumGothic", fontSize=10, leading=16, textColor=colors.HexColor("#526070"), spaceAfter=18)
    eyebrow = ParagraphStyle("eyebrow", parent=styles["BodyText"], fontName="NanumGothicBold", fontSize=8, leading=12, textColor=colors.HexColor("#007D8A"), spaceAfter=8)
    body = ParagraphStyle("body", parent=styles["BodyText"], fontName="NanumGothic", fontSize=9.5, leading=15, textColor=colors.HexColor("#17212E"))
    small = ParagraphStyle("small", parent=body, fontSize=8, leading=12, textColor=colors.HexColor("#526070"))
    section = ParagraphStyle("section", parent=styles["Heading2"], fontName="NanumGothicBold", fontSize=13, leading=20, textColor=colors.HexColor("#0B1F3A"), spaceBefore=14, spaceAfter=7)

    story = [
        Paragraph("BLRO · PRE-DECISION CHECKLIST", eyebrow),
        Paragraph("HCI·가상화 전환 사전진단 체크리스트", title),
        Paragraph("제품 기능 비교 전에, 현재 워크로드와 운영 조건을 기준으로 전환 범위와 다음 검증을 정리하기 위한 실무용 점검표입니다.", subtitle),
    ]

    intro_rows = [
        [cell("이 체크리스트의 목적", body), cell("도입 여부를 단정하지 않고, 유지·전환·혼합 운영을 열어 둔 상태에서 판단에 필요한 증거를 정리합니다.", body)],
        [cell("먼저 확인할 사람", body), cell("인프라 운영, 보안, 애플리케이션, 데이터 보호와 의사결정 책임자가 같은 기준을 확인합니다.", body)],
        [cell("완료 후 남길 것", body), cell("우선 검증할 워크로드, 제외 범위, PoC 또는 리허설의 통과 기준, 다음 의사결정입니다.", body)],
    ]
    intro = Table(intro_rows, colWidths=[42 * mm, 128 * mm])
    intro.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#EAF5F5")),
        ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5DF")),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5DF")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
    ]))
    story += [intro, Spacer(1, 10)]

    sections = [
        ("01. 워크로드와 성장 조건", [
            "워크로드별 CPU, 메모리, 저장공간의 현재 사용량과 성장률을 확인한다.",
            "업무 영향도, 의존성, 허용 가능한 점검·전환 시간을 구분한다.",
            "먼저 검증할 대상과 당장 제외할 대상을 분리한다.",
        ]),
        ("02. 장애도메인과 복구 기준", [
            "허용 가능한 동시 장애 범위와 서비스별 복구 우선순위를 합의한다.",
            "백업, 복제, 재해복구의 책임과 복구 가능 여부를 별도로 점검한다.",
            "RPO·RTO는 기능 설명이 아니라 실제 복구 절차와 검증 기록으로 확인한다.",
        ]),
        ("03. 운영 역할과 변경 통제", [
            "패치, 증설, 장애 대응, 권한 관리의 운영 주체와 승인 경계를 정리한다.",
            "모니터링, 로그, 감사 기록이 기존 운영 절차와 어떻게 연결되는지 확인한다.",
            "자동화할 업무와 사람이 승인해야 하는 예외를 구분한다.",
        ]),
        ("04. 전환·롤백 검증", [
            "마이그레이션 순서, 사전 리허설, 전환 파동별 통과 기준을 정의한다.",
            "중단 또는 성능 문제가 발생했을 때의 롤백 조건과 의사결정 권한을 합의한다.",
            "PoC 결과는 제품 우위가 아니라 현재 환경의 가정이 충족됐는지로 기록한다.",
        ]),
    ]
    for heading, checks in sections:
        rows = [[cell("□", body), cell(check, body)] for check in checks]
        table = Table(rows, colWidths=[10 * mm, 160 * mm])
        table.setStyle(TableStyle([
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5DF")),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5DF")),
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("TOPPADDING", (0, 0), (-1, -1), 8),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ]))
        story += [KeepTogether([Paragraph(heading, section), table]), Spacer(1, 5)]

    story += [
        Paragraph("다음 검증을 적어 보세요", section),
        Table([
            [cell("우선 검증할 범위", body), cell("", body)],
            [cell("현재 제외할 범위", body), cell("", body)],
            [cell("필요한 증거와 통과 기준", body), cell("", body)],
            [cell("다음 의사결정 시점", body), cell("", body)],
        ], colWidths=[58 * mm, 112 * mm], rowHeights=[15 * mm] * 4, style=TableStyle([
            ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#F3F6F8")),
            ("BOX", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5DF")),
            ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#CBD5DF")),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 8),
            ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ])),
        Spacer(1, 12),
        Paragraph("본 자료는 공개용 실무 점검표입니다. 특정 제품의 성능·가격·호환성이나 고객 결과를 보증하지 않습니다. 실제 적용 전에는 현재 환경과 정책을 기준으로 별도 검증이 필요합니다.", small),
    ]

    document = SimpleDocTemplate(str(OUTPUT), pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm, topMargin=18 * mm, bottomMargin=16 * mm)
    document.build(story)


if __name__ == "__main__":
    main()
