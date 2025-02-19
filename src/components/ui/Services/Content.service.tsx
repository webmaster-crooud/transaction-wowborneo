import { Service } from '@/types';
import Image from 'next/image';

export function ContentService({ service }: { service: Service[] }) {
    return service.map((service, i) => (
        <div className={`p-6 ${i % 2 === 0 ? 'bg-brown/10' : 'bg-brown/5'} w-full flex items-center justify-between gap-6`} key={i}>
            <div className="flex items-center justify-start gap-3">
                <Image src={service.image} width={200} height={200} alt={`${service.cruise} by Wow Borneo`} priority className="w-14 h-14 object-cover object-center rounded-full" />
                <div>
                    <div className="flex items-center justify-start gap-3">
                        <span>
                            [{service.tag}] {String(service.date.checkIn)}
                        </span>
                        - <h2>{service.title}</h2>
                    </div>
                    <h3 className="font-bold">
                        {service.cruise}, {service.cabin} Cabin
                    </h3>
                </div>
            </div>

            <button className="py-3 px-6 rounded-2xl bg-white text-black font-bold text-center text-[20px]">
                Start ${service.price}/ {service.days}/Pax
            </button>
        </div>
    ));
}
