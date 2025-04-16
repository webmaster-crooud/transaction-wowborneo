// 'use client';
// import { CanvasImage } from '@/components/CanvasImage';
// import { CarouselImage } from '@/components/CarouselImage';
// import { Loader } from '@/components/Loader';
// import { CarouselItem } from '@/components/ui/carousel';
// import { RichTextPreview } from '@/components/ui/RichTextPreview';
// import { errorAtom } from '@/stores';
// import { ApiSuccessResponse, IDetailScheduleResponse } from '@/types';
// import { api } from '@/utils/api';
// import { fetchError } from '@/utils/fetchError';
// import { IconBedFilled, IconCalendar, IconDiscount2, IconFaceId, IconMapPin, IconShip, IconTextCaption, IconUserScan, IconZoomIn } from '@tabler/icons-react';
// import { useQuery } from '@tanstack/react-query';
// import { useSetAtom } from 'jotai';
// import Link from 'next/link';
// import { useParams, useRouter, useSearchParams } from 'next/navigation';

// export default function CabinList() {
//     const { scheduleId } = useParams();
//     const guest = useSearchParams();

//     const router = useRouter();
//     const setError = useSetAtom(errorAtom);
//     const fetchSchedule = async () => {
//         const { data } = await api.get<ApiSuccessResponse<IDetailScheduleResponse>>(`${process.env.NEXT_PUBLIC_API}/transaction/${scheduleId}`);
//         return data.data;
//     };

//     const {
//         data: schedule,
//         isLoading,
//         isError,
//         error,
//         // isFetching,
//         // status,
//         // refetch,
//     } = useQuery({
//         queryKey: ['detailSchedule'],
//         queryFn: fetchSchedule,
//         staleTime: 5 * 60 * 1000, // 5 menit
//         gcTime: 15 * 60 * 1000, // Ganti cacheTime menjadi gcTime
//     });

//     if (isLoading) return <Loader />;
//     if (isError) {
//         fetchError(error.message, setError);
//     }
//     return (
//         <section className="py-5 w-11/12 mx-auto">
//             {/* Header */}
//             <div className="grid grid-cols-2 gap-5">
//                 <div className="relative">
//                     <CanvasImage src={schedule?.cruise.cover || ''} className="h-80" />
//                     <div className="absolute bottom-3 right-3 z-10">
//                         <button className="px-5 bg-brown/60 text-gray-50 font-semibold text-sm flex items-center justify-center gap-1 py-2 rounded-lg border border-brown hover:bg-brown transition-all ease-in-out duration-300" type="button">
//                             <IconZoomIn size={18} stroke={2} />
//                             <span>Detail</span>
//                         </button>
//                     </div>
//                 </div>
//                 <CarouselImage navigation>
//                     {schedule?.cruise.galleries.map((gallery, i) => (
//                         <CarouselItem key={i} className="relative basis-1/2">
//                             <CanvasImage src={gallery.source || ''} className="h-80" />
//                             <div className="absolute bottom-3 right-3 z-10">
//                                 <button className="px-5 bg-brown/60 text-gray-50 font-semibold text-sm flex items-center justify-center gap-1 py-2 rounded-lg border border-brown hover:bg-brown transition-all ease-in-out duration-300" type="button">
//                                     <IconZoomIn size={18} stroke={2} />
//                                     <span>Detail</span>
//                                 </button>
//                             </div>
//                         </CarouselItem>
//                     ))}
//                 </CarouselImage>
//             </div>
//             <p className="text-sm mt-5 text-gray-500 font-semibold">
//                 Masih ragu dengan layanan ini?{' '}
//                 <Link href={'/'} className="underline">
//                     Kembali
//                 </Link>
//             </p>

//             <div className="my-5 bg-red/10 rounded-lg p-4 flex items-center justify-between gap-5">
//                 <div className="flex items-center justify-start gap-3">
//                     <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
//                         <IconDiscount2 size={25} stroke={1.8} className="text-brown animate-bounce" />
//                     </div>
//                     <p className="text-gray-600 font-semibold text-sm">Please log in to access our special promotion!</p>
//                 </div>

//                 <Link href={`${process.env.NEXT_PUBLIC_AUTH}?from=${scheduleId}`} className="px-5 py-2 text-sm font-bold bg-gray-50 text-gray-800 rounded-lg">
//                     Login
//                 </Link>
//             </div>

//             <div className="bg-black/20 rounded-full w-full h-[1.5px]" />

//             <div className="flex items-start justify-between gap-5 flex-wrap my-5">
//                 <div className="flex flex-col gap-y-3">
//                     <h1 className="font-bold text-4xl tracking-wider text-gray-700">{schedule?.cruise.title}</h1>
//                     <div className="flex items-center justify-start gap-5">
//                         <div className="flex items-center justify-start gap-2">
//                             <IconShip size={18} stroke={2} className="text-gray-500" />
//                             <h2 className="text-sm font-medium text-gray-500">
//                                 <Link href={'/'}>{schedule?.boat.name}</Link>
//                             </h2>
//                         </div>

//                         <div className="flex items-center justify-start gap-2">
//                             <IconMapPin size={18} stroke={2} className="text-gray-500" />
//                             <h2 className="text-sm font-medium text-gray-500">
//                                 <Link href={'/'}>{schedule?.cruise.departure}</Link>
//                             </h2>
//                         </div>
//                     </div>
//                     <div className="flex items-center justify-start gap-2">
//                         <IconCalendar size={18} stroke={2} className="text-gray-500" />
//                         <p className="text-sm font-medium text-gray-500">
//                             {new Date(schedule?.departureAt || '').toLocaleDateString('en-EN', {
//                                 day: 'numeric',
//                                 month: 'long',
//                                 year: 'numeric',
//                             })}{' '}
//                             -{' '}
//                             {new Date(schedule?.arrivalAt || '').toLocaleDateString('en-EN', {
//                                 day: 'numeric',
//                                 month: 'long',
//                                 year: 'numeric',
//                             })}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="flex flex-col items-end gap-y-3">
//                     <p className="text-sm font-medium text-gray-500">Start from</p>
//                     <p className="text-brown font-bold text-2xl leading-3">$ {schedule?.min_price}.00</p>
//                     <p className="text-sm text-gray-500">/{schedule?.cruise.duration} days/ pax</p>
//                     <button type="button" onClick={() => router.push('#cabin')} className="bg-brown px-5 py-2 font-semibold text-gray-50 rounded-lg border-brown border">
//                         See Cabin
//                     </button>
//                 </div>
//             </div>

//             <div className="my-5 flex flex-col gap-y-2">
//                 <h3 className="text-2xl font-semibold text-gray-600">About {schedule?.cruise.title}</h3>
//                 <RichTextPreview value={schedule?.cruise.description || ''} />
//             </div>
//             <div className="bg-black/20 rounded-full w-full h-[1.5px] mb-3" />

//             <div>
//                 <h3 className="font-semibold tracking-wide text-2xl text-gray-600">Facilities of {schedule?.boat.name}</h3>

//                 <div className="grid grid-cols-4 gap-5 mt-5">
//                     {schedule?.boat.facilities.map((facility, i) => (
//                         <div className="p-4 flex flex-col gap-y-2 rounded-lg bg-gray-50 border border-gray-200 shadow-md" key={i}>
//                             <div className="flex items-center justify-start gap-2">
//                                 <IconFaceId size={20} stroke={2} />
//                                 <h5 className="font-semibold text-gray-600">{facility.name}</h5>
//                             </div>
//                             <div className="text-sm text-gray-500">
//                                 <RichTextPreview value={facility.description} />
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             <div className="relative my-5">
//                 <CanvasImage src={schedule?.boat.deck.cover || ''} className="h-96 border-none" />
//                 <div className="absolute bottom-3 right-3 z-10">
//                     <button className="px-5 bg-brown/60 text-gray-50 font-semibold text-sm flex items-center justify-center gap-1 py-2 rounded-lg border border-brown hover:bg-brown transition-all ease-in-out duration-300" type="button">
//                         <IconZoomIn size={18} stroke={2} />
//                         <span>Detail</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Cabin */}
//             <article id="cabin">
//                 <div className="bg-white pb-5">
//                     <h3 className="font-semibold text-xl text-gray-600 tracking-wide">{schedule?.boat.name}&rsquo;s Cabin</h3>
//                 </div>
//                 <div className="bg-black/20 rounded-fusll w-full h-[1.5px] mb-3" />

//                 <div className="p-5 rounded-lg bg-gray-100 shadow-inner flex flex-col gap-y-5 relative">
//                     {schedule?.boat.cabins.map((cabin, i) => (
//                         <div className="grid grid-cols-3 gap-8 relative" key={i}>
//                             <div className="overflow-hidden rounded-xl shadow-md shadow-slate-700/30">
//                                 <CanvasImage src={cabin.cover} alt={cabin.name} className="border-none" />
//                             </div>
//                             <div className="flex flex-col gap-y-3 bg-gray-50 shadow-md col-span-2 p-5 rounded-lg border-gray-300 border">
//                                 <div>
//                                     <h2 className="text-lg font-bold text-gray-700 tracking-wide">{cabin.name}</h2>
//                                     <p className="text-green-500 font-bold text-sm">Garansi 100% Refund & Reschedule s/d. 30 Hari</p>
//                                     <div className="bg-black/20 rounded-fusll w-full h-[1.5px] mt-2" />
//                                 </div>
//                                 <div className="flex justify-between items-start gap-5">
//                                     <div className="flex flex-col gap-y-2">
//                                         <div className="flex items-center justify-start gap-1 text-sm text-gray-500">
//                                             <IconUserScan size={18} />
//                                             <span className="font-medium">{cabin.maxCapacity} Guest</span>
//                                         </div>
//                                         <div className="flex items-center justify-start gap-1 text-sm text-gray-500">
//                                             <IconBedFilled size={18} />
//                                             <span className="font-medium capitalize">{cabin.type.toLocaleLowerCase()} Bed</span>
//                                         </div>
//                                         <div className="flex items-center justify-start gap-1 text-sm text-gray-500">
//                                             <IconTextCaption size={18} />
//                                             <RichTextPreview value={cabin.description || ''} />
//                                         </div>
//                                     </div>
//                                     <div className="flex flex-col gap-y-2">
//                                         <p className="font-bold text-xl text-brown leading-3">$ {cabin.price}.00</p>
//                                         <p className="text-sm text-gray-500">/{schedule?.cruise.duration} days/guest</p>

//                                         <Link href={`/book-itenery?cabinId=${cabin.id}&scheduleId=${schedule?.id}&guest=${guest}`} className="px-5 py-2 rounded-lg border border-blue-600 bg-blue-500 mt-2 text-white font-semibold">
//                                             Book Now!
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </article>
//         </section>
//     );
// }
'use client';
import { Loader } from '@/components/Loader';
import { useParams, useSearchParams } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { errorAtom } from '@/stores';
import { api } from '@/utils/api';
import { ApiSuccessResponse, IDetailScheduleResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { fetchError } from '@/utils/fetchError';
import { HeaderSection } from '@/components/Schedule/detail/Header';
import { LoginPromo } from '@/components/Schedule/detail/Login';
import { CruiseDetails } from '@/components/Schedule/detail/Cruise';
import { FacilitiesGrid } from '@/components/Schedule/detail/Facility';
import { DeckPreview } from '@/components/Schedule/detail/Deck';
import { CabinList } from '@/components/Schedule/detail/Cabin';
import { useAuth } from '@/hooks/useAuth';

export default function ScheduleDetailPage() {
    const { scheduleId } = useParams();
    const setError = useSetAtom(errorAtom);
    const guest = useSearchParams().get('guest');
    const { account } = useAuth();

    const fetchSchedule = async () => {
        const { data } = await api.get<ApiSuccessResponse<IDetailScheduleResponse>>(`${process.env.NEXT_PUBLIC_API}/transaction/${scheduleId}`);
        return data.data;
    };

    const {
        data: schedule,
        isLoading,
        isError,
        error,
        // isFetching,
        // status,
        // refetch,
    } = useQuery({
        queryKey: ['detailSchedule'],
        queryFn: fetchSchedule,
        staleTime: 5 * 60 * 1000, // 5 menit
        gcTime: 15 * 60 * 1000, // Ganti cacheTime menjadi gcTime
    });

    if (isError) return fetchError(error.message, setError);

    return (
        <section className="py-5 w-11/12 mx-auto">
            {isLoading && <Loader />}
            <HeaderSection coverImage={schedule?.cruise.cover || ''} galleries={schedule?.cruise.galleries || []} />
            {!account && <LoginPromo guest={guest || ''} scheduleId={schedule?.id || ''} />}
            {schedule && <CruiseDetails schedule={schedule} />}
            <FacilitiesGrid facilities={schedule?.boat.facilities || []} />
            <DeckPreview deck={schedule?.boat.deck ? { cover: schedule.boat.deck.cover || '' } : { cover: '' }} />
            {schedule && <CabinList schedule={schedule} guestCount={guest?.toString() || '1'} />}
        </section>
    );
}
