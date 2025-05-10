export interface ApiErrorResponse {
    success: false;
    message: string;
    errors: Array<{ field?: string; message: string }>;
    stack?: string; // Hanya ada di development
}

export interface ApiSuccessResponse<T = unknown> {
    success: true;
    data: T;
}

export interface MenuInterface {
    title: string;
    icon: React.ReactNode;
    url: string | URL;
}

export type STATUS = 'FAVOURITED' | 'ACTIVED' | 'PENDING' | 'BLOCKED' | 'DELETED';
export type TYPECABIN = 'DOUBLE' | 'TWIN' | 'SUPER';

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

export interface IScheduleResponse {
    id: string;
    departureAt: string | Date;
    arrivalAt: string | Date;
    cruiseTitle: string;
    boatName: string;
    departure: string;
    status: STATUS; // Bisa diganti dengan enum jika sudah ada
    minPrice: number;
    cover: string | null;
    duration: number;
    maxCapacity: number;
}

export interface IDetailScheduleResponse {
    id: string;
    departureAt: string | Date;
    arrivalAt: string | Date;
    totalBooking: number;
    status: STATUS;
    min_price: string | number;
    cruise: {
        id: string;
        title: string;
        cover: string | null;
        departure: string;
        description: string;
        galleries: Array<{ source: string }>;
        duration: number;
    };
    boat: {
        name: string;
        id: string;
        deck: {
            cover: string | null;
        };
        facilities: Array<{
            name: string;
            icon: string;
            description: string;
        }>;
        cabins: Array<{ id: string | number; name: string; type: TYPECABIN; maxCapacity: number; description: string | null; price: string; cover: string }>;
    };
}

export interface IImage {
    id?: number;
    imageType: 'COVER' | 'PHOTO';
    alt: string | null;
    entityId: string;
    entityType: string;
    source: string;
}
