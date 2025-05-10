'use client';
import { MainBooking } from '@/components/Booking/main.booking';
import CurtainTransition from '@/components/CurtainTransition';
import { BookingCard } from '@/components/ui/Card/Booking.card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { errorAtom } from '@/stores';
import { scheduleIdAtom } from '@/stores/transaction';
import { IconArrowLeft, IconArrowRight, IconLoader3, IconPlus, IconStarFilled } from '@tabler/icons-react';
import { useAtom, useSetAtom } from 'jotai';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { IGuestRequest, ITransactionRequest } from '@/types/transaction';
import { useSchedule } from '@/hooks/useSchedule';
import { useTransaction } from '@/hooks/useTransaction';
import { useRouter } from 'next/navigation';
import { ActionButton } from '@/components/ui/Button/Action.button';
import { fetchError } from '@/utils/fetchError';
import { api } from '@/utils/api';
import { ApiSuccessResponse } from '@/types';
const initGuest: IGuestRequest = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    document: '',
    identityNumber: '',
    phone: '',
    price: '',
    signature: false,
    children: false,
};
export default function GuestDetailsPage() {
    const { account } = useAuth();
    const [scheduleId] = useAtom(scheduleIdAtom);
    const { transaction, setTransaction } = useTransaction(scheduleId);
    const { schedule } = useSchedule(scheduleId);
    const [isPassenger, setIsPassenger] = useState<boolean>(false);
    const [loading, setLoading] = useState<string>('');
    const router = useRouter();
    const setError = useSetAtom(errorAtom);
    const [guests, setGuests] = useState<IGuestRequest[]>(
        transaction.guests.length !== 0
            ? transaction.guests
            : [
                  {
                      firstName: '',
                      lastName: '',
                      email: '',
                      country: '',
                      document: '',
                      identityNumber: '',
                      phone: '',
                      price: transaction.price,
                      signature: false,
                      children: false,
                  },
              ],
    );
    useEffect(() => {
        if (!transaction.cabinId) router.push(`/${scheduleId}`);
    });

    const cabin = schedule?.boat.cabins.find(cab => cab.id == transaction.cabinId);
    const handleUserPassenger = (value: boolean) => {
        setIsPassenger(value);

        setGuests(prev =>
            prev.map((g, idx) => {
                if (idx !== 0) return g;

                if (value) {
                    // ketika jadi “I’m a Passenger” → isi guest[0] dengan data account
                    return {
                        ...g,
                        firstName: account.user.firstName,
                        lastName: account.user.lastName,
                        email: account.email,
                    };
                } else {
                    // ketika “Booking for Someone Else” → reset guest[0] ke init kosong
                    return {
                        ...initGuest,
                        price: transaction.price, // kalau perlu bawa price default
                    };
                }
            }),
        );
    };

    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>, idx: number) => {
        const { name, value, files } = e.target;
        // kalau file upload, ambil File object, kalau bukan, pakai string value
        const fieldValue = name === 'document' ? files?.[0] ?? '' : value;

        setGuests(prev =>
            prev.map((guest, i) =>
                i === idx
                    ? {
                          ...guest,
                          [name]: fieldValue,
                      }
                    : guest,
            ),
        );
    }, []);

    const addPassenger = useCallback(() => {
        if (guests.length >= (cabin?.maxCapacity || 0)) {
            setError({ message: `Maximum ${cabin?.maxCapacity} passengers allowed` });
            return;
        }
        setGuests(prev => [
            ...prev,
            {
                ...initGuest,
            },
        ]);
    }, [cabin?.maxCapacity, setError, guests.length]);
    const deletePassenger = (index: number) => {
        setGuests(prev => prev.filter((_, i) => i !== index));
    };
    const handleSetGuest = useCallback(async () => {
        setLoading('calculate');
        try {
            if (!account.email) {
                setError({ message: 'You must login first!' });
                return;
            }
            const { data } = await api.patch<ApiSuccessResponse<ITransactionRequest>>(`${process.env.NEXT_PUBLIC_API}/cart/guest/${scheduleId}`, guests, { withCredentials: true });
            setTransaction(data.data);
            router.push('/payment');
        } catch (error) {
            fetchError(error, setError);
        } finally {
            setLoading('');
        }
    }, [account.email, guests, scheduleId, setError, setTransaction, router]);
    return (
        <>
            <CurtainTransition />
            <MainBooking>
                <BookingCard className="flex flex-col gap-y-6">
                    <div className="grid grid-cols-2 gap-5">
                        <button type="button" onClick={() => handleUserPassenger(true)} className={`px-5 py-2 rounded-lg text-sm font-semibold ${isPassenger ? 'bg-brown text-white' : 'bg-gray-100 text-gray-600'}`}>
                            I&apos;m a Passenger
                        </button>
                        <button type="button" onClick={() => handleUserPassenger(false)} className={`px-5 py-2 rounded-lg text-sm font-semibold ${!isPassenger ? 'bg-brown text-white' : 'bg-gray-100 text-gray-600'}`}>
                            Booking for Someone Else
                        </button>
                    </div>
                </BookingCard>

                {guests.map((guest, index) => (
                    <React.Fragment key={index}>
                        <BookingCard className="flex flex-col gap-y-6 mt-6">
                            <div className="flex justify-between items-center">
                                <h1 className="text-2xl font-bold">Guest {index + 1}</h1>
                                {index > 0 && (
                                    <button type="button" onClick={() => deletePassenger(index)} className="text-red-500 text-sm font-semibold">
                                        Remove Passenger
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-y-3 gap-x-5">
                                {/* First Name */}
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <Label className="font-bold text-base flex items-center gap-1">
                                        First Name <IconStarFilled size={7} className="text-red-500" />
                                    </Label>
                                    <Input value={guest.firstName} name="firstName" onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} disabled={index === 0 && isPassenger} />
                                </div>

                                {/* Last Name */}
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <Label className="font-bold text-base flex items-center gap-1">
                                        Last Name <IconStarFilled size={7} className="text-red-500" />
                                    </Label>
                                    <Input value={guest.lastName} name="lastName" onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} disabled={index === 0 && isPassenger} />
                                </div>

                                {/* Email */}
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <Label className="font-bold text-base flex items-center gap-1">
                                        Email <IconStarFilled size={7} className="text-red-500" />
                                    </Label>
                                    <Input type="email" name="email" value={guest.email} onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} disabled={index === 0 && isPassenger} />
                                </div>

                                {/* Phone */}
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <Label className="font-bold text-base flex items-center gap-1">
                                        Phone Number <IconStarFilled size={7} className="text-red-500" />
                                    </Label>
                                    <Input value={guest.phone} name="phone" onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} />
                                </div>

                                {/* Children Checkbox */}
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`children-${index}`}
                                            checked={guest.children}
                                            onCheckedChange={() => {
                                                setGuests(prev => prev.map((g, idx) => (idx === index ? { ...g, children: !g.children } : g)));
                                            }}
                                        />
                                        <Label htmlFor={`children-${index}`}>Children (under 12 years old)</Label>
                                    </div>
                                </div>

                                {/* Identity Number */}
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <Label className="font-bold text-base flex items-center gap-1">
                                        Identity Number <IconStarFilled size={7} className="text-red-500" />
                                    </Label>
                                    <Input value={guest.identityNumber} name="identityNumber" onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} />
                                </div>

                                {/* Country */}
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <Label className="font-bold text-base flex items-center gap-1">
                                        Country <IconStarFilled size={7} className="text-red-500" />
                                    </Label>
                                    <Input value={guest.country} name="country" onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} />
                                </div>

                                {/* Document Upload */}
                                {!guest.children && (
                                    <div className="grid w-full max-w-md items-center gap-1.5">
                                        <Label className="font-bold text-base flex items-center gap-1">
                                            Identity Document <IconStarFilled size={7} className="text-red-500" />
                                        </Label>
                                        <Input type="file" name="document" onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)} />
                                    </div>
                                )}

                                {/* Signature Checkbox */}
                                <div className="grid w-full max-w-md items-center gap-1.5 col-span-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`signature-${index}`}
                                            checked={guest.signature}
                                            onCheckedChange={() => {
                                                setGuests(prev => prev.map((g, idx) => (idx === index ? { ...g, signature: !g.signature } : g)));
                                            }}
                                        />
                                        <Label htmlFor={`signature-${index}`} className="text-sm">
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-brown underline">
                                                Terms & Conditions
                                            </Link>{' '}
                                            and{' '}
                                            <Link href="/privacy" className="text-brown underline">
                                                Privacy Policy
                                            </Link>
                                        </Label>
                                    </div>
                                </div>
                            </div>
                        </BookingCard>
                        {index === guests.length - 1 && (
                            <div className="-mt-6 w-3/12 ms-auto">
                                <button
                                    type="button"
                                    onClick={addPassenger}
                                    disabled={guests.length >= (cabin?.maxCapacity || 0)}
                                    className="w-full ms-auto py-2 border border-brown text-brown rounded-2xl font-semibold hover:bg-brown hover:text-white transition-all ease-in-out duration-300 flex items-center justify-center gap-2
                        disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {guests.length >= (cabin?.maxCapacity || 0) ? (
                                        `Maximum ${cabin?.maxCapacity || 0} Passengers`
                                    ) : (
                                        <>
                                            <IconPlus size={20} stroke={2} />
                                            Passenger
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </React.Fragment>
                ))}

                {/* Navigation */}
                <div className="flex items-center justify-start gap-5">
                    <ActionButton
                        onClick={() => {
                            setLoading('back');
                            router.push('/booking-itinerary');
                        }}
                        disabled={loading === 'back'}
                        className="px-16 flex items-center justify-center gap-4"
                        title={
                            loading === 'back' ? (
                                <>
                                    <IconLoader3 className="animate-spin" size={20} stroke={2} /> <span>Back</span>
                                </>
                            ) : (
                                <>
                                    <IconArrowLeft size={20} stroke={2} /> <span>Back</span>
                                </>
                            )
                        }
                    />
                    <ActionButton
                        className="px-16 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSetGuest}
                        disabled={guests.filter(g => g.signature === true).length !== guests.length}
                        title={
                            loading === 'calculate' ? (
                                <>
                                    <span>Calculate</span>
                                    <IconLoader3 className="animate-spin" size={20} stroke={2} />
                                </>
                            ) : (
                                <>
                                    <span>Continue</span>
                                    <IconArrowRight size={20} stroke={2} />
                                </>
                            )
                        }
                    />
                </div>
            </MainBooking>
        </>
    );
}
