export interface PaginationResult<T> {
    data: T[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export const paginate = <T>(
    data: T[],
    page: number,
    limit: number,
    total: number
): PaginationResult<T> => {
    const totalPages = Math.ceil(total / limit);
    return {
        data,
        meta: {
            page,
            limit,
            total,
            totalPages,
        },
    };
};
