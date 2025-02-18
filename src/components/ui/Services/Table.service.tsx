import { Services } from '@/types';
import { ContentService } from './Content.service';

export function TableService({ services }: { services: Services[] }) {
    return (
        <section className="w-full my-5 border border-brown rounded-2xl overflow-hidden">
            <div className="overflow-y-scroll scroll-smooth w-full h-[504px]">
                <ContentService service={services} />
            </div>
        </section>
    );
}
