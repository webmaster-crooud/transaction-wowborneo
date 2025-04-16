import { ITransactionRequest } from '@/types/transaction';
import { atomWithStorage } from 'jotai/utils';
export const transactionAtom = atomWithStorage<ITransactionRequest>('transactionBody', {
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
