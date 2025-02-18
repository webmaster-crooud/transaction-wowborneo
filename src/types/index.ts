export interface Services {
    cruise: string;
    title?: string;
    description?: string;
    image: string;
    slug: string;
    tag: 'MID WEEK' | 'WEEKEND';
    date: Date | string;
    cabin: 'Superior' | 'Double' | 'Twin';
    price: string;
    days: string;
}
