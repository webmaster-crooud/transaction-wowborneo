'use client';

import { ActionButton } from '@/components/ui/Button/Action.button';
import { FilterForm } from '@/components/ui/Form/Filter.form';
import { TableService } from '@/components/ui/Services/Table.service';
import { dataServices } from '@/constants';
import { motion } from 'framer-motion';

export default function MainPage() {
    return (
        <>
            <motion.article initial={{ height: '0px' }} animate={{ height: '100%' }} transition={{ duration: 0.5 }} className="relative overflow-hidden" exit={{ x: '-100rem', opacity: '0' }}>
                <FilterForm />
                <div className="flex items-center justify-between gap-5">
                    <div className="flex items-center justify-start gap-3">
                        <p>You have selected an item within the following criteria:</p>
                        <p className="flex items-center justify-start gap-1">
                            <b>Boats:</b>
                            <span>All Boats</span>
                        </p>
                        <p className="flex items-center justify-start gap-1">
                            <b>Month/Years:</b>
                            <span>March 2025</span>
                        </p>
                        <p className="flex items-center justify-start gap-1">
                            <b>Guest:</b>
                            <span>4</span>
                        </p>
                    </div>
                    <p>We found {dataServices.length} itineraries available for You</p>
                </div>

                <TableService services={dataServices} />
                <div className="flex items-center justify-between gap-5 mt-5 mb-20">
                    <p>
                        Can&apos;t find the date you&apos;re looking for? Request a <span className="uppercase font-bold italic">private booking</span> to secure your preferred schedulle.
                    </p>

                    <ActionButton title="Request a Quote" />
                </div>
            </motion.article>
        </>
    );
}
