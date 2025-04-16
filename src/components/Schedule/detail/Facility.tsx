import { IconFaceId } from '@tabler/icons-react';
import { RichTextPreview } from '@/components/ui/RichTextPreview';
import { IDetailScheduleResponse } from '@/types';

export const FacilitiesGrid = ({ facilities }: { facilities: IDetailScheduleResponse['boat']['facilities'] }) => (
    <div>
        <h3 className="font-semibold tracking-wide text-2xl text-gray-600">Facilities</h3>
        <div className="grid grid-cols-4 gap-5 mt-5">
            {facilities.map((facility, i) => (
                <div className="p-4 flex flex-col gap-y-2 rounded-lg bg-gray-50 border border-gray-200 shadow-md" key={i}>
                    <div className="flex items-center gap-2">
                        <IconFaceId size={20} stroke={2} />
                        <h5 className="font-semibold text-gray-600">{facility.name}</h5>
                    </div>
                    <div className="text-sm text-gray-500">
                        <RichTextPreview value={facility.description} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);
