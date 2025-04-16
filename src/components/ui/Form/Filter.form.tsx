'use client';

import { IconSearch } from '@tabler/icons-react';
import { ListDataInterface, SelectForm } from './Select.form';
import { DatePicker } from './Date.form';
import React, { useState } from 'react';
import { SetStateAction } from 'jotai';

const dataBoats: ListDataInterface[] = [
    { name: 'All Boats', value: 'all-boats' },
    { name: 'Rahai’i Pangun', value: 'rahai-i-pangun' },
    { name: 'Spirit of Kalimantan', value: 'spirit-of-kalimantan' },
    { name: 'Sekonyer', value: 'sekonyer' },
    { name: 'Rungan', value: 'rungan' },
];
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
    guest: number;
    setGuest: React.Dispatch<SetStateAction<number>>;
};
export function FilterForm({ guest, setGuest }: propsFilterForm) {
    const [boats, setBoats] = useState<string>('all-boats');
    return (
        <div className="w-10/12 mx-auto px-12 py-1.5 border border-gray-300 rounded-xl grid grid-cols-4 gap-3 mt-10 mb-20">
            <SelectForm name="Boats" defaultValue={boats} listData={dataBoats} setValue={(value: string | number) => setBoats(String(value))} />
            <DatePicker />
            <SelectForm name="Guest" defaultValue={guest} listData={dataGuest} setValue={(value: string | number) => setGuest(Number(value))} />

            <button className="py-2 flex items-center justify-center gap-3">
                <IconSearch className="text-brown" />
                <span className="font-bold">Search</span>
            </button>
        </div>
    );
}
