import { errorAtom } from '@/stores';
import { ApiSuccessResponse, IDetailScheduleResponse } from '@/types';
import { api } from '@/utils/api';
import { fetchError } from '@/utils/fetchError';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';

export function useSchedule(scheduleId: string): { schedule: IDetailScheduleResponse | undefined; isLoading: boolean } {
    const setError = useSetAtom(errorAtom);
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
        queryKey: [`schedul${scheduleId}`],
        queryFn: fetchSchedule,
        staleTime: 5 * 60 * 1000, // 5 menit
        gcTime: 15 * 60 * 1000, // Ganti cacheTime menjadi gcTime
    });
    if (isError) {
        fetchError(error.message, setError);
        return { schedule: undefined, isLoading: false };
    }

    return { schedule, isLoading };
}
