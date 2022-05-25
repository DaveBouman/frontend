declare type EXTFetchType = 'POST' | 'DELETE' | "GET" | "PUT";

declare type EXTFetch<T = any> = {
    data?: T;
};

export { }