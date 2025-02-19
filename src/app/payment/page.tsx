import { MainBooking } from '@/components/Booking/main.booking';
import CurtainTransition from '@/components/CurtainTransition';
import { ActionButton } from '@/components/ui/Button/Action.button';
import { BookingCard } from '@/components/ui/Card/Booking.card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Timer from '@/components/ui/timer';

export default function PaymentPage() {
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
                        <input className="w-full border border-stone-300 text-sm outline-brown text-gray-400 rounded-xl py-3 px-5" name="coupon" placeholder="CODECOUPONFREE" />
                        <ActionButton className="w-4/12" title="Apply Coupon"></ActionButton>
                    </div>
                </BookingCard>

                <BookingCard className="flex flex-col gap-y-6">
                    <div>
                        <h1 className="text-2xl font-bold mb-3">Payment Method</h1>
                        <p className="text-sm text-gray-400">Attention: We only receive online payment</p>
                    </div>

                    <RadioGroup defaultValue="" className="flex flex-col w-full gap-y-3">
                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-stone-100 w-full">
                            <RadioGroupItem value="deposit" id="r1" />
                            <Label htmlFor="r1" className="text-sm font-bold w-full">
                                <span>Deposit 30%</span>
                                <span className="float-end">$1,250.00</span>
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-stone-100 w-full">
                            <RadioGroupItem value="fullPaymentDocu" id="r1" />
                            <Label htmlFor="r1" className="text-sm font-bold w-full">
                                <span>Full Payment by Credit Card</span>
                                <span className="float-end">$5,250.00</span>
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-stone-100 w-full">
                            <RadioGroupItem value="fullPaymentDocu" id="r1" />
                            <Label htmlFor="r1" className="text-sm font-bold w-full">
                                <span>Full Payment by Paypal</span>
                                <span className="float-end">$5,250.00</span>
                            </Label>
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg bg-stone-100 w-full">
                            <RadioGroupItem value="fullPaymentDocu" id="r1" />
                            <Label htmlFor="r1" className="text-sm font-bold w-full">
                                <span>Full Payment by Bank Transfer</span>
                                <span className="float-end">$5,250.00</span>
                            </Label>
                        </div>
                    </RadioGroup>
                </BookingCard>

                <BookingCard>
                    <div>
                        <h5 className="text-2xl font-bold mb-3">Cancellation policy</h5>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <hr className="my-10" />
                    <h5 className="text-2xl font-bold mb-3">Cancellation policy</h5>
                    <div className="flex flex-col gap-y-5">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="deposit" />
                            <Label htmlFor="deposit" className="text-gray-400 leading-[20px]">
                                Deposit minimum 20% from total payment
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="terms" />
                            <Label htmlFor="terms" className="text-gray-400 leading-[20px]">
                                T&C apply when reschedulling the cruise
                            </Label>
                        </div>
                    </div>
                </BookingCard>
            </MainBooking>
        </>
    );
}
