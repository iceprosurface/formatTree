declare interface data {
    [key:string]: any;
}

declare interface constructure {
    groupBy?: string | string[]
    data?: {
        [key:string]: string| number | Function | constructure;
    }
    [key:string]: any;
}