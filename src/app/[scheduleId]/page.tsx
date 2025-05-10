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
        queryKey: [`schedule`, scheduleId],
        queryFn: fetchSchedule,
        staleTime: 5 * 60 * 1000, // 5 menit
        gcTime: 15 * 60 * 1000, // Ganti cacheTime menjadi gcTime
    });

    if (isError) return fetchError(error.message, setError);

    return (
        <section className="py-5 w-11/12 mx-auto">
            {isLoading && <Loader />}
            <HeaderSection coverImage={schedule?.cruise.cover || ''} galleries={schedule?.cruise.galleries || []} />
            {!account.email && <LoginPromo guest={guest || ''} scheduleId={schedule?.id || ''} />}
            {schedule && <CruiseDetails schedule={schedule} />}
            <FacilitiesGrid facilities={schedule?.boat.facilities || []} />
            <DeckPreview deck={schedule?.boat.deck ? { cover: schedule.boat.deck.cover || '' } : { cover: '' }} />
            {schedule && <CabinList schedule={schedule} guestCount={guest?.toString() || '1'} />}
        </section>
    );
}
