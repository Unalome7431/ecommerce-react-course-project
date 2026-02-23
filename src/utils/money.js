export function formatMoney(price) {
  return `${(price < 0 ? "-$" : "$") + (Math.abs(price) / 100).toFixed(2)}`
}