import React from 'react';
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue } from '../select';

type propsSelectForm = {
    name: string | number;
    defaultValue?: string | number;
    setValue: (value: string | number) => void;
    listData: Array<ListDataInterface>;
};

export interface ListDataInterface {
    value?: string | number;
    name: string | number;
}

export const SelectForm: React.FC<propsSelectForm> = ({ name, defaultValue, setValue, listData }) => (
    <Select name={String(name)} defaultValue={String(defaultValue) || ''} onValueChange={setValue}>
        <SelectTrigger className="w-full shadow-none border-y-0 border-l-0 rounded-none text-base border-r border-gray-400">
            <SelectValue placeholder={name} />
        </SelectTrigger>
        <SelectContent>
            {listData.map((data, i) => (
                <SelectItem value={String(data.value)} key={i}>
                    {data.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);
