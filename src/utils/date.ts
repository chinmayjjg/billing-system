export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

export const addMonths = (date: Date, months: number): Date => {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
};

export const startOfDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
};

export const endOfDay = (date: Date): Date => {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
};
