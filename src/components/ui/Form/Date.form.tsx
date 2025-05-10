'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SetStateAction } from 'jotai';

type propsDatePicker = {
    setFill: React.Dispatch<SetStateAction<{ cruiseId?: string; month?: Date; pax?: number }>>;
    fill: { cruiseId?: string; month?: Date; pax?: number };
};
export function DatePicker({ setFill, fill }: propsDatePicker) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('w-full h-full border-y-0 rounded-none border-gray-400 border-l-0 hover:bg-white shadow-none outline-none ring-0 focus:right-0 justify-start text-left font-normal', !fill.month && 'text-muted-foreground')}>
                    <CalendarIcon />
                    {fill.month ? format(fill.month, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={fill.month}
                    onSelect={(date: Date | undefined) =>
                        setFill(prev => ({
                            ...prev,
                            month: date,
                        }))
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
