export const toCurrency = (val: number) => {
  if (val > 1) {
    const roundedVal = Math.round(val * 100) / 100
    return roundedVal.toFixed(2).split( /(?=(?:\d{3})+(?:\.|$))/g ).join( "," )
  }
  return Math.round(val * 100000) / 100000
}

export const getExchangedAmount = (val: number, exchangeRate: number) => val * exchangeRate