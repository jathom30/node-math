const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const toCurrency = (val: number) => {
  return formatter.format(val)
}