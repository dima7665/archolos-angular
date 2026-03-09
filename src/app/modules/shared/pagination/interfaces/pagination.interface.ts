export class PaginationPayload {
    public page: number = this.data?.page ?? 1;
    public perPage: number = this.data?.perPage ?? 10;

    constructor(public data?: Partial<PaginationPayload>) {}
}

export interface ListPayload<T extends object> {
    filter?: T;
    pagination: PaginationPayload;
}

export interface ListObj<T extends object> {
    data: T[];
    pagination: PaginationPayload;
}