export const toCurrency = (val: number) => {
  if (val > 1) return Math.round(val * 100) / 100
  return val
}

export const getExchangedAmount = (val: number, exchangeRate: number) => val * exchangeRate