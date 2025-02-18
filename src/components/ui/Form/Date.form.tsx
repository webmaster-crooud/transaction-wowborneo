'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePicker() {
    const [date, setDate] = React.useState<Date>();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('w-full h-full border-y-0 rounded-none border-gray-400 border-l-0 hover:bg-white shadow-none outline-none ring-0 focus:right-0 justify-start text-left font-normal', !date && 'text-muted-foreground')}>
                    <CalendarIcon />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
        </Popover>
    );
}
