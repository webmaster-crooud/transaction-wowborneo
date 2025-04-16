'use client';
import { MainBooking } from '@/components/Booking/main.booking';
import CurtainTransition from '@/components/CurtainTransition';
import { BookingCard } from '@/components/ui/Card/Booking.card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { errorAtom } from '@/stores';
import { transactionAtom } from '@/stores/transaction';
import { IconStarFilled } from '@tabler/icons-react';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { IGuestRequest } from '@/types/transaction';

export default function GuestDetailsPage() {
    const { account } = useAuth();
    const [transaction, setTransaction] = useAtom(transactionAtom);
    const [isPassenger, setIsPassenger] = useState<boolean>(false);
    const setError = useSetAtom(errorAtom);

    const calculateGuestPrice = (guests: IGuestRequest[]) => {
        return guests.reduce((sum, guest) => sum + Number(guest.price), 0);
    };

    // Load from localStorage
    useEffect(() => {
        const loadTransaction = () => {
            try {
                const savedData = localStorage.getItem('transactionBody');
                if (savedData) {
                    const parsed = JSON.parse(savedData);

                    // Validasi struktur data lengkap
                    const isValid = parsed?.guests?.every((g: IGuestRequest) => g.firstName !== undefined && g.lastName !== undefined && g.email !== undefined && g.phone !== undefined && g.children !== undefined && g.identityNumber !== undefined && g.country !== undefined && g.document !== undefined && g.signature !== undefined && g.price !== undefined);

                    if (isValid) {
                        // Cek kesesuaian data dengan akun saat ini
                        const isAccountPassenger = account ? parsed.guests[0].email === account.email : false;

                        setIsPassenger(isAccountPassenger);
                        setTransaction(parsed);
                        return true;
                    }
                }
            } catch (error) {
                console.error('Error loading transaction:', error);
                localStorage.removeItem('transactionBody');
            }
            return false;
        };

        if (!loadTransaction()) {
            initializeNewTransaction();
        }
    }, [account]);

    // Initialize transaction baru dengan memperhitungkan akun
    const initializeNewTransaction = () => {
        const shouldBePassenger = !!account; // Auto-set sebagai passenger jika login
        setIsPassenger(shouldBePassenger);

        const baseGuest = {
            phone: '',
            children: false,
            identityNumber: '',
            country: '',
            document: '',
            signature: false,
            price: transaction.price,
        };

        const initialGuest =
            shouldBePassenger && account
                ? {
                      ...baseGuest,
                      firstName: account.user.firstName,
                      lastName: account.user.lastName,
                      email: account.email,
                  }
                : {
                      ...baseGuest,
                      firstName: '',
                      lastName: '',
                      email: '',
                  };

        setTransaction(prev => ({
            ...prev,
            guests: [initialGuest],
            guestPrice: String(calculateGuestPrice([initialGuest])),
            subTotal: Number(prev.addonPrice) + calculateGuestPrice([initialGuest]),
            finalTotal: Number(prev.addonPrice) + calculateGuestPrice([initialGuest]),
        }));
    };

    // Auto-save to localStorage
    useEffect(() => {
        const saveData = {
            ...transaction,
            guests: transaction.guests.map(g => ({
                firstName: g.firstName,
                lastName: g.lastName,
                email: g.email,
                phone: g.phone,
                children: g.children,
                identityNumber: g.identityNumber,
                country: g.country,
                document: g.document,
                signature: g.signature,
                price: g.price,
            })),
        };
        localStorage.setItem('transactionBody', JSON.stringify(saveData));
    }, [transaction]);

    // Handle perubahan status passenger
    const handlePassengerToggle = (isPassenger: boolean) => {
        setIsPassenger(isPassenger);

        // Jika switch ke "I'm passenger" dan ada akun
        if (isPassenger && account) {
            setTransaction(prev => {
                const updatedGuests = [...prev.guests];
                updatedGuests[0] = {
                    ...updatedGuests[0],
                    firstName: account.user.firstName,
                    lastName: account.user.lastName,
                    email: account.email,
                };
                return { ...prev, guests: updatedGuests };
            });
        }
    };

    const handleGuestChange = (index: number, field: string, value: string | boolean | File) => {
        setTransaction(prev => {
            const updatedGuests = [...prev.guests];
            const newPrice = field === 'children' ? (value ? Number(prev.price) * 0.5 : Number(prev.price)) : Number(updatedGuests[index].price);

            updatedGuests[index] = {
                ...updatedGuests[index],
                [field]: value,
                price: newPrice,
            };

            return {
                ...prev,
                guests: updatedGuests,
                guestPrice: String(calculateGuestPrice(updatedGuests)),
                subTotal: Number(Number(prev.addonPrice) + Number(calculateGuestPrice(updatedGuests))),
                finalTotal: Number(Number(prev.addonPrice) + Number(calculateGuestPrice(updatedGuests))),
            };
        });
    };

    const addPassenger = () => {
        if (transaction.guests.length >= transaction.pax) {
            setError({ message: `Maximum ${transaction.pax} passengers allowed` });
            return;
        }

        setTransaction(prev => {
            const newGuest = {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                children: false,
                identityNumber: '',
                country: '',
                document: '',
                signature: false,
                price: prev.price,
            };
            const newGuests = [...prev.guests, newGuest];
            return {
                ...prev,
                guests: newGuests,
                guestPrice: String(calculateGuestPrice(newGuests)),
                subTotal: Number(Number(prev.addonPrice) + Number(calculateGuestPrice(newGuests))),
                finalTotal: Number(Number(prev.addonPrice) + Number(calculateGuestPrice(newGuests))),
            };
        });
    };

    const deletePassenger = (index: number) => {
        if (transaction.guests.length === 1) return;

        setTransaction(prev => {
            const updatedGuests = prev.guests.filter((_, i) => i !== index);
            return {
                ...prev,
                guests: updatedGuests,
                guestPrice: String(calculateGuestPrice(updatedGuests)),
                subTotal: Number(Number(prev.addonPrice) + Number(calculateGuestPrice(updatedGuests))),
                finalTotal: Number(Number(prev.addonPrice) + Number(calculateGuestPrice(updatedGuests))),
            };
        });
    };
    return (
        <>
            <CurtainTransition />
            <MainBooking>
                <BookingCard className="flex flex-col gap-y-6">
                    <div className="grid grid-cols-2 gap-5">
                        <button type="button" onClick={() => handlePassengerToggle(true)} className={`px-5 py-2 rounded-lg text-sm font-semibold ${isPassenger ? 'bg-brown text-white' : 'bg-gray-100 text-gray-600'}`}>
                            I&apos;m a Passenger
                        </button>
                        <button type="button" onClick={() => handlePassengerToggle(false)} className={`px-5 py-2 rounded-lg text-sm font-semibold ${!isPassenger ? 'bg-brown text-white' : 'bg-gray-100 text-gray-600'}`}>
                            Booking for Someone Else
                        </button>
                    </div>
                </BookingCard>

                {transaction.guests.map((guest, index) => (
                    <BookingCard key={index} className="flex flex-col gap-y-6 mt-6">
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
                                <Input value={guest.firstName} onChange={e => handleGuestChange(index, 'firstName', e.target.value)} disabled={index === 0 && isPassenger} />
                            </div>

                            {/* Last Name */}
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label className="font-bold text-base flex items-center gap-1">
                                    Last Name <IconStarFilled size={7} className="text-red-500" />
                                </Label>
                                <Input value={guest.lastName} onChange={e => handleGuestChange(index, 'lastName', e.target.value)} disabled={index === 0 && isPassenger} />
                            </div>

                            {/* Email */}
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label className="font-bold text-base flex items-center gap-1">
                                    Email <IconStarFilled size={7} className="text-red-500" />
                                </Label>
                                <Input type="email" value={guest.email} onChange={e => handleGuestChange(index, 'email', e.target.value)} disabled={index === 0 && isPassenger} />
                            </div>

                            {/* Phone */}
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label className="font-bold text-base flex items-center gap-1">
                                    Phone Number <IconStarFilled size={7} className="text-red-500" />
                                </Label>
                                <Input value={guest.phone} onChange={e => handleGuestChange(index, 'phone', e.target.value)} />
                            </div>

                            {/* Children Checkbox */}
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id={`children-${index}`} checked={guest.children} onCheckedChange={checked => handleGuestChange(index, 'children', checked as boolean)} />
                                    <Label htmlFor={`children-${index}`}>Children (under 12 years old)</Label>
                                </div>
                            </div>

                            {/* Identity Number */}
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label className="font-bold text-base flex items-center gap-1">
                                    Identity Number <IconStarFilled size={7} className="text-red-500" />
                                </Label>
                                <Input value={guest.identityNumber} onChange={e => handleGuestChange(index, 'identityNumber', e.target.value)} />
                            </div>

                            {/* Country */}
                            <div className="grid w-full max-w-md items-center gap-1.5">
                                <Label className="font-bold text-base flex items-center gap-1">
                                    Country <IconStarFilled size={7} className="text-red-500" />
                                </Label>
                                <Input value={guest.country} onChange={e => handleGuestChange(index, 'country', e.target.value)} />
                            </div>

                            {/* Document Upload */}
                            {!guest.children && (
                                <div className="grid w-full max-w-md items-center gap-1.5">
                                    <Label className="font-bold text-base flex items-center gap-1">
                                        Identity Document <IconStarFilled size={7} className="text-red-500" />
                                    </Label>
                                    <Input
                                        type="file"
                                        onChange={e => {
                                            const file = e.target.files?.[0];
                                            if (file) handleGuestChange(index, 'document', file.name);
                                        }}
                                    />
                                </div>
                            )}

                            {/* Signature Checkbox */}
                            <div className="grid w-full max-w-md items-center gap-1.5 col-span-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id={`signature-${index}`} checked={guest.signature} onCheckedChange={checked => handleGuestChange(index, 'signature', checked as boolean)} />
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
                ))}

                <div className="mt-6">
                    <button
                        type="button"
                        onClick={addPassenger}
                        disabled={transaction.guests.length >= transaction.pax}
                        className="w-full py-3 bg-brown text-white rounded-lg font-semibold
                        disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {transaction.guests.length >= transaction.pax ? `Maximum ${transaction.pax} Passengers` : 'Add Another Passenger'}
                    </button>
                </div>
            </MainBooking>
        </>
    );
}
