'use client';

import { IconLoader3, IconReload } from '@tabler/icons-react';
import { ListDataInterface, SelectForm } from './Select.form';
import React, { ChangeEvent, useCallback } from 'react';
import { SetStateAction, useSetAtom } from 'jotai';
import { errorAtom } from '@/stores';
import { fetchError } from '@/utils/fetchError';
import { api } from '@/utils/api';
import { ApiSuccessResponse, IScheduleResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ITransactionParams } from '@/app/page';
import { formatDateOnly } from '@/lib/moment';

const dataGuest: ListDataInterface[] = [
    { name: '1 Guest', value: 1 },
    { name: '2 Guest', value: 2 },
    { name: '3 Guest', value: 3 },
    { name: '4 Guest', value: 4 },
    { name: '5 Guest', value: 5 },
    { name: '6 Guest', value: 6 },
    { name: '7 Guest', value: 7 },
    { name: '8 Guest', value: 8 },
    { name: '9 Guest', value: 9 },
    { name: '10 Guest', value: 10 },
    { name: '11 Guest', value: 11 },
    { name: '12 Guest', value: 12 },
    { name: '13 Guest', value: 13 },
    { name: '14 Guest', value: 14 },
    { name: '15 Guest', value: 15 },
    { name: '16 Guest', value: 16 },
    { name: '17 Guest', value: 17 },
    { name: '18 Guest', value: 18 },
    { name: '19 Guest', value: 19 },
    { name: '20 Guest', value: 20 },
    { name: '21 Guest', value: 21 },
    { name: '22 Guest', value: 22 },
    { name: '23 Guest', value: 23 },
    { name: '24 Guest', value: 24 },
    { name: '25 Guest', value: 25 },
];

type propsFilterForm = {
    fill: { cruiseId?: string; month?: string | Date; pax?: number };
    setFill: React.Dispatch<SetStateAction<ITransactionParams>>;
    fetchSchedule: (cruiseId: string, month: string | Date, pax: number) => Promise<IScheduleResponse[]>;
    schedule: IScheduleResponse[];
};

export function FilterForm({ fetchSchedule, fill, setFill, schedule }: propsFilterForm) {
    const setError = useSetAtom(errorAtom);

    const fetchCruise = useCallback(async () => {
        try {
            const { data } = await api.get<ApiSuccessResponse<{ id: string; title: string }[]>>('/transaction/cruise', { withCredentials: true });
            return data.data;
        } catch (error) {
            fetchError(error, setError);
        }
    }, [setError]);

    const {
        data: cruise,
        isLoading,
        isError,
        error,
        // isFetching,
        // status,
        // refetch,
    } = useQuery({
        queryKey: ['fetchingCruise'],
        queryFn: fetchCruise,
        staleTime: 5 * 60 * 1000, // 5 menit
        gcTime: 15 * 60 * 1000, // Ganti cacheTime menjadi gcTime
    });
    if (isError) {
        fetchError(error.message, setError);
    }

    const dataCruise: ListDataInterface[] = (cruise ?? []).map(item => ({ name: item.title, value: item.id }));

    const resetSearch = useCallback(async () => {
        try {
            setFill({ cruiseId: '', month: '', pax: 1 });
            await fetchCruise();
            await fetchSchedule('', '', 1);
        } catch (error) {
            fetchError(error, setError);
        }
    }, [fetchCruise, fetchSchedule, setError, setFill]);

    return (
        <>
            <div className="w-10/12 mx-auto px-12 py-1.5 border border-gray-300 rounded-xl grid grid-cols-4 gap-3 mt-10 mb-20">
                {/* <SelectForm
                name="cruiseId"
                defaultValue={fill.cruiseId || ''}
                listData={dataCruise}
                setValue={(value: string | number) =>
                    setFill(prev => ({
                        ...prev,
                        cruiseId: String(value),
                    }))
                }
            /> */}

                <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setFill(prev => ({ ...prev, cruiseId: e.target.value }))} value={fill.cruiseId} className="outline-none border-r border-gray-400 px-3 bg-transparent appearance-none">
                    <option value={''}>Select Cruise</option>
                    {dataCruise.map((c, idx) => (
                        <option value={c.value} key={idx}>
                            {c.name}
                        </option>
                    ))}
                </select>

                <input type="month" className="outline-none border-r border-gray-400 px-3 bg-transparent" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFill(prev => ({ ...prev, month: e.target.value }))} value={fill ? fill.month?.toString() : ''} />
                <SelectForm name="Guest" defaultValue={fill.pax} listData={dataGuest} setValue={(value: string | number | undefined) => setFill(prev => ({ ...prev, pax: Number(value) }))} />

                <button type="button" onClick={resetSearch} className="py-2 flex items-center justify-center gap-3">
                    {isLoading ? <IconLoader3 className="text-brown animate-spin" /> : <IconReload className="text-brown" />}
                    <span className="font-bold">Clear</span>
                </button>
            </div>

            <div className="flex items-center justify-between gap-5 flex-wrap">
                <div className="flex items-center justify-start gap-3">
                    <p>You have selected an item within the following criteria:</p>
                    <p className="flex items-center justify-start gap-1">
                        <b>Cruise:</b>
                        <span>{cruise?.map(c => (fill.cruiseId === c.id ? c.title : 'All Cruise'))}</span>
                    </p>
                    <p className="flex items-center justify-start gap-1">
                        <b>Month/Years:</b>
                        <span>{formatDateOnly(fill.month || new Date())}</span>
                    </p>
                    <p className="flex items-center justify-start gap-1">
                        <b>Guest:</b>
                        <span>{fill.pax}</span>
                    </p>
                </div>
                <p>We found {schedule?.length} itineraries available for You</p>
            </div>
        </>
    );
}
