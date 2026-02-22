import { it, expect, describe } from "vitest";
import { formatMoney } from "./money";

describe('formatMoney function testing', () => {
  it('1999 formatted to $19.99', () => {
    expect(formatMoney(1999)).toBe('$19.99')
  })

  it('1900 formatted to $19.00', () => {
    expect(formatMoney(1900)).toBe('$19.00')
  })
})