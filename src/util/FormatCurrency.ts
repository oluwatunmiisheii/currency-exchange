export const formatCurrency = (value: number, currency: string, locale:string = 'en-IN') => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });
  return formatter.format(value);
}