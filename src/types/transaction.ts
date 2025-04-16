import { STATUS, TYPECABIN } from '.';

export interface ITransactionRequest {
    email: string;
    cabinId: string;
    scheduleId: string;
    pax: number;
    addons: Array<IAddonRequest>;
    guests: Array<IGuestRequest>;
    guestPrice: string | number;
    addonPrice?: string | number;
    price: string | number;
    subTotal: string | number;
    finalTotal: string | number;
    discount: string | number;
    cruise: {
        title: string;
    };
    method: 'dp' | 'full' | null;
    amountPayment: string | number;
    amountUnderPayment: string | number;
}

export interface IGuestRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    children: boolean;
    identityNumber: string;
    country: string;
    document: string;
    signature: boolean;
    price: string | number;
}

export interface IAddonRequest {
    id: number;
    qty: number;
    price: string;
    totalPrice: string;
    title: string;
    description: string;
}

export interface IBookingItineraryResponse {
    id: string;
    departureAt: string | Date;
    arrivalAt: string | Date;
    status: STATUS;
    cruise: {
        id: string;
        title: string;
        cover: string | null;
        departure: string;
        description: string;
        duration: number;
    };
    boat: {
        name: string;
        cabin: {
            type: TYPECABIN;
            maxCapacity: number;
            price: string;
        };
    };
    addons: Array<{ id: number; title: string; description: string | null; cover: string | null; price: number | string }>;
}
