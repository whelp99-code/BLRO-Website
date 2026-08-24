import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { SangforKoreaCaseIndex } from "@/components/marketing/sangfor-korea-case-index"
import { SANGFOR_KOREA_INDEX_CASES } from "@/lib/external-evidence"

describe("Sangfor Korea case index", () => {
  it("filters the official Korea case grid by product group", async () => {
    const user = userEvent.setup()
    render(<SangforKoreaCaseIndex cases={SANGFOR_KOREA_INDEX_CASES} />)

    expect(screen.getByRole("heading", { name: "한신대" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "GS건설" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "켄싱턴" })).toBeVisible()

    await user.click(screen.getByRole("button", { name: "VDI" }))
    expect(screen.getByRole("heading", { name: "GS건설" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "CJ대한통운" })).toBeVisible()
    expect(screen.queryByRole("heading", { name: "한신대" })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { name: "켄싱턴" })).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "보안·네트워크" }))
    expect(screen.getByRole("heading", { name: "대상" })).toBeVisible()
    expect(screen.getByRole("heading", { name: "LS산전" })).toBeVisible()
    expect(screen.queryByRole("heading", { name: "GS건설" })).not.toBeInTheDocument()
  })
})
