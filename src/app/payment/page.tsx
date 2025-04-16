'use client';
import { MainBooking } from '@/components/Booking/main.booking';
import CurtainTransition from '@/components/CurtainTransition';
import { ActionButton } from '@/components/ui/Button/Action.button';
import { BookingCard } from '@/components/ui/Card/Booking.card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Timer from '@/components/ui/timer';
import { transactionAtom } from '@/stores/transaction';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/main';
import { api } from '@/utils/api';
import { fetchError } from '@/utils/fetchError';
import { errorAtom } from '@/stores';

export default function PaymentPage() {
    const [transaction, setTransaction] = useAtom(transactionAtom);
    const [couponCode, setCouponCode] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [loading, setLoading] = useState(false);
    const setError = useSetAtom(errorAtom);
    console.log(transaction);

    // Calculate totals
    useEffect(() => {
        const subTotal = transaction.subTotal;
        const discount = transaction.discount ? Number(transaction.discount) : 0;
        const finalTotal = Number(subTotal) - Number(discount);

        setTransaction(prev => ({
            ...prev,
            method: null,
            finalTotal: String(finalTotal),
        }));
    }, [setTransaction, transaction.subTotal, transaction.discount]);

    // Handle coupon application
    const applyCoupon = async () => {
        try {
            setLoading(true);
            const { data } = await api.post('/coupons/validate', { code: couponCode });

            setTransaction(prev => ({
                ...prev,
                discount: String(Number(prev.subTotal) * (data.discountPercentage / 100)),
            }));
        } catch (err) {
            fetchError(err, setError);
            setTransaction(prev => ({ ...prev, discount: '0' }));
        } finally {
            setLoading(false);
        }
    };

    // Handle payment submission
    const handlePayment = async () => {
        setLoading(true);
        try {
            const { data } = await api.post('/transaction', transaction, {
                withCredentials: true,
            });
            console.log(data);
            window.location.href = data.data;
        } catch (err) {
            fetchError(err, setError);
        } finally {
            setLoading(false);
        }
        localStorage.clear();
    };

    return (
        <>
            <CurtainTransition />
            <MainBooking>
                <BookingCard className="flex items-center justify-between gap-5">
                    <p className="text-sm font-bold text-black">Maximum payment in 24 hours</p>
                    <Timer />
                </BookingCard>

                <BookingCard>
                    <h5 className="text-2xl font-bold mb-3">Coupon Apply</h5>
                    <div className="flex items-center justify-end gap-5">
                        <input className="w-full border border-stone-300 text-sm outline-brown text-gray-400 rounded-xl py-3 px-5" value={couponCode} onChange={e => setCouponCode(e.target.value)} placeholder="CODECOUPONFREE" />
                        <ActionButton className="w-4/12" title="Apply Coupon" onClick={applyCoupon} disabled={loading} />
                    </div>
                </BookingCard>

                <BookingCard className="flex flex-col gap-y-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-3">Payment Method</h1>
                        <p className="text-sm text-gray-400">Attention: We only receive online payment</p>
                    </div>

                    <RadioGroup
                        value={transaction.method ?? ''}
                        onValueChange={value =>
                            setTransaction(prev => ({
                                ...prev,
                                method: value as 'full' | 'dp',
                                amountPayment: value === 'dp' ? Number(transaction.subTotal) * 0.25 : Number(transaction.subTotal),
                                amountUnderPayment: value === 'dp' ? Number(transaction.subTotal) * 0.75 : 0,
                            }))
                        }
                        className="flex flex-col w-full gap-y-3"
                    >
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-stone-100 w-full cursor-pointer">
                            <RadioGroupItem value="dp" id="dp" checked={transaction.method === 'dp'} />
                            <Label htmlFor="dp" className="text-sm font-bold w-full">
                                <span>Deposit 25%</span>
                                <span className="float-end">{formatCurrency(String(Number(transaction.subTotal) * 0.25))}</span>
                                <p className="text-xs text-gray-400 mt-1">Remaining: {formatCurrency(String(Number(transaction.subTotal) * 0.75))}</p>
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-stone-100 w-full cursor-pointer">
                            <RadioGroupItem value="full" id="full" checked={transaction.method === 'full'} />
                            <Label htmlFor="full" className="text-sm font-bold w-full">
                                <span>Full Payment</span>
                                <span className="float-end">{formatCurrency(String(transaction.finalTotal))}</span>
                            </Label>
                        </div>
                    </RadioGroup>
                </BookingCard>

                <BookingCard>
                    <div>
                        <h5 className="text-2xl font-bold mb-3">Cancellation policy</h5>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
                    </div>

                    <hr className="my-10" />
                    <h5 className="text-2xl font-bold mb-3">Terms & Conditions</h5>
                    <div className="flex flex-col gap-y-5">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" checked={agreed} onCheckedChange={checked => setAgreed(Boolean(checked))} />
                            <Label htmlFor="terms" className="text-gray-400 leading-[20px]">
                                I agree to the terms and conditions
                            </Label>
                        </div>
                    </div>
                </BookingCard>

                <div className="mt-6">
                    <ActionButton className="w-full cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed" title={loading ? 'Loading...' : 'Proceed to DOKU Payment'} onClick={handlePayment} type="button" disabled={!agreed || loading} />
                </div>
            </MainBooking>
        </>
    );
}
