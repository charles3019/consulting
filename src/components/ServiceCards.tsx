import Link from "next/link";
import {
  Globe,
  Cpu,
  Network,
  Cable,
  Camera,
  Headphones,
  Wrench,
  ArrowRight,
} from "lucide-react";
import { services, PRICING_DISCLAIMER } from "@/lib/services";
const icons = { Globe, Cpu, Network, Cable, Camera, Headphones, Wrench };
export default function ServiceCards({
  pricing = false,
}: {
  pricing?: boolean;
}) {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = icons[service.icon];
          return (
            <article
              id={service.slug}
              key={service.id}
              className="glass-panel glass-panel-hover scroll-mt-24 p-6 rounded-2xl border border-white/10 flex flex-col gap-5"
            >
              <Icon aria-hidden="true" className="w-8 h-8 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">{service.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed flex-1">
                {service.desc}
              </p>
              {pricing && (
                <p className="text-xl font-bold text-cyan-300">
                  {service.price}
                </p>
              )}
              <Link
                href={pricing ? "/contact" : `/services#${service.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"
              >
                {pricing ? "Get a Free Quote" : "Explore Service"}
                <ArrowRight aria-hidden="true" className="w-4 h-4 shrink-0" />
              </Link>
            </article>
          );
        })}
      </div>
      {pricing && (
        <p className="text-sm leading-relaxed text-slate-300">
          {PRICING_DISCLAIMER}
        </p>
      )}
    </div>
  );
}
