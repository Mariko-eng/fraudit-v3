
export interface APIResponseList {
    count : number, // Total Number of data items  
    current : number, // Current Page
    page_size: number, // Number Items Per Page  
    total: number, // Total Number of pages
    next: string | null
    previous: string | null
}