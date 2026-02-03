/**
 * Handles money as integers (cents) to avoid floating point errors
 */

export const toCents = (amount: number): number => {
    return Math.round(amount * 100);
};

export const fromCents = (amount: number): number => {
    return amount / 100;
};

export const formatCurrency = (amountInCents: number, currency: string = 'USD'): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(fromCents(amountInCents));
};
