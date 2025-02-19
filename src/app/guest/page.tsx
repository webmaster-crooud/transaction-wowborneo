import { MainBooking } from '@/components/Booking/main.booking';
import CurtainTransition from '@/components/CurtainTransition';
import { BookingCard } from '@/components/ui/Card/Booking.card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IconStarFilled } from '@tabler/icons-react';
import Link from 'next/link';

export default function GuestDetailsPage() {
    return (
        <>
            <CurtainTransition />
            <MainBooking>
                <BookingCard className="flex flex-col gap-y-6">
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-2xl font-bold">Order Details</h1>
                        <p className="text-gray-400 text-sm">This contact details will be used for your booking information</p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-5">
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="firstName" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>First Name</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="firstName" id="firstName" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="lastName" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Last Name</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="lastName" id="lastName" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="email" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Email Address</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="email" id="email" type="email" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="phoneNumber" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Phone Number</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="phoneNumber" id="phoneNumber" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="identityNumber" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Identity Number</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="identityNumber" id="identityNumber" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="country" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Country</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="country" id="country" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Input name="identityFile" id="identityFile" type="file" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms" className="text-xs text-gray-400 leading-[20px]">
                                    By attaching this document, I agree to Wowborneo{' '}
                                    <Link className="underline underline-offset-2 text-brown decoration-brown" href={'/'}>
                                        Terms & Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link className="underline underline-offset-2 text-brown decoration-brown" href={'/'}>
                                        Privacy Policy
                                    </Link>
                                </Label>
                            </div>
                        </div>

                        <RadioGroup defaultValue="pessenger" className="flex items-center justify-start gap-5 mt-5 col-span-2 w-full">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pessenger" id="r1" />
                                <Label htmlFor="r1">I am a passenger in this cruise</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="agen" id="r2" />
                                <Label htmlFor="r2">I am booking for someone else</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </BookingCard>

                <BookingCard className="flex flex-col gap-y-6">
                    <div className="flex flex-col gap-y-4">
                        <h1 className="text-2xl font-bold">Guest 1</h1>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-5">
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="firstName" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>First Name</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="firstName" id="firstName" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="lastName" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Last Name</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="lastName" id="lastName" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="email" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Email Address</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="email" id="email" type="email" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="phoneNumber" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Phone Number</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="phoneNumber" id="phoneNumber" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="identityNumber" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Identity Number</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="identityNumber" id="identityNumber" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Label htmlFor="country" className="font-bold text-base flex items-center justify-start gap-1">
                                <span>Country</span> <IconStarFilled size={7} className="text-red" />
                            </Label>
                            <Input name="country" id="country" type="text" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div className="grid w-full max-w-md items-center gap-1.5">
                            <Input name="identityFile" id="identityFile" type="file" className="focus:ring-brown focus:outline-brown focus:border-brown border-stone-300 rounded-lg" />
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms" />
                                <Label htmlFor="terms" className="text-xs text-gray-400 leading-[20px]">
                                    By attaching this document, I agree to Wowborneo{' '}
                                    <Link className="underline underline-offset-2 text-brown decoration-brown" href={'/'}>
                                        Terms & Conditions
                                    </Link>{' '}
                                    and{' '}
                                    <Link className="underline underline-offset-2 text-brown decoration-brown" href={'/'}>
                                        Privacy Policy
                                    </Link>
                                </Label>
                            </div>
                        </div>

                        <RadioGroup defaultValue="pessenger" className="flex items-center justify-start gap-5 mt-5 col-span-2 w-full">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="pessenger" id="r1" />
                                <Label htmlFor="r1">I am a passenger in this cruise</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="agen" id="r2" />
                                <Label htmlFor="r2">I am booking for someone else</Label>
                            </div>
                        </RadioGroup>
                    </div>
                </BookingCard>
            </MainBooking>
        </>
    );
}
