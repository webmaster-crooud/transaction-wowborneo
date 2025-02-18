import React from 'react';
import { SelectItem, Select, SelectContent, SelectTrigger, SelectValue } from '../select';

type propsSelectForm = {
    name: string;
    defaultValue: string;
    setValue: (value: string) => void;
    listData: Array<ListDataInterface>;
};

export interface ListDataInterface {
    value: string;
    name: string;
}

export const SelectForm: React.FC<propsSelectForm> = ({ name, defaultValue, setValue, listData }) => (
    <Select name={name} defaultValue={defaultValue} onValueChange={setValue}>
        <SelectTrigger className="w-full shadow-none border-y-0 border-l-0 rounded-none text-base border-r border-gray-400">
            <SelectValue placeholder={name} />
        </SelectTrigger>
        <SelectContent>
            {listData.map((data, i) => (
                <SelectItem value={data.value} key={i}>
                    {data.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);
