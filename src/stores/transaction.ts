import { ITransactionRequest } from '@/types/transaction';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
export const transactionAtom = atom<ITransactionRequest & { ttl?: number }>({
    email: '',
    cabinId: '',
    scheduleId: '',
    pax: 1,
    addons: [],
    guests: [],
    price: 0,
    cruise: { title: '' },
    guestPrice: '',
    discount: '',
    finalTotal: '',
    subTotal: '',
    amountPayment: '',
    amountUnderPayment: '',
    method: null,
    addonPrice: '',
});

export const scheduleIdAtom = atomWithStorage<string>('scheduleBody', '');
