export interface Service {
    cruise: string;
    title?: string;
    description?: string;
    image: string;
    slug: string;
    tag: 'MID WEEK' | 'WEEKEND';
    cabin: 'Superior' | 'Double' | 'Twin';
    price: string;
    days: string;
    date: {
        checkIn: Date | string;
        checkOut?: Date | string;
    };
}
