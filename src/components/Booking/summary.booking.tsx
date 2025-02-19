import { SummaryCard } from '../ui/Card/Summary.card';

export function SummaryBooking() {
    return (
        <div className="gap-5 relative top-0">
            <div className="flex flex-col gap-5 col-span-2 p-6 border sticky top-5 border-stone-300 rounded-2xl">
                <div className="flex items-center justify-between gap-5">
                    <h3 className="font-bold text-2xl">Booking Summary</h3>
                    <span className="bg-red text-white p-2 px-5 uppercase font-bold text-xs rounded-full">On Process</span>
                </div>

                <div className="flex flex-col gap-y-6">
                    <SummaryCard title="Cruise: Title of Cruise" />

                    {/* Adds on */}
                    <SummaryCard title="Adds On">
                        <>
                            <h5 className="font-bold">Dinner at longhouse</h5>
                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
                        </>
                    </SummaryCard>

                    <SummaryCard title="Price" className="gap-4">
                        <>
                            <div className="flex items-center justify-between gap-5">
                                <span>Subtotal 3 Adult</span>
                                <p className="font-medium text-gray-600">$4,500.00</p>
                            </div>
                            <div className="flex items-center justify-between gap-5">
                                <span>Subtotal 1 Children</span>
                                <p className="font-medium text-gray-600">$750.00</p>
                            </div>
                            <div className="flex items-center justify-between gap-5">
                                <span>Addon</span>
                                <p className="font-medium text-gray-600">$2,000.00</p>
                            </div>

                            <div className="border-b-2 border-gray-300 border-dashed w-full h-1" />
                            <div className="flex items-center justify-between gap-5 font-bold text-black">
                                <span>Total Payment</span>
                                <p>$5,250.00</p>
                            </div>
                        </>
                    </SummaryCard>
                </div>

                <div className="flex items-center justify-between gap-5">
                    <h6 className="text-2xl font-bold">Payment</h6>
                    <p className="text-[20px] font-bold">$5,250.00</p>
                </div>
            </div>
        </div>
    );
}
