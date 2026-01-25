import { WORK } from "@/lib/constants";

export function Work() {
  return (
    <section id="work" className="w-full">
      <h2 className="mb-2 mt-8 text-xl font-bold">Work</h2>
      <div>
        {WORK.map((work, index) => (
          <div key={index} className="mb-6">
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg link font-semibold"
            >
              {work.company}
            </a>
            <p className="text-sm text-neutral-400">
              {work.position} ({work.duration})
            </p>
            {work.description && (
              <p className="mt-1 text-sm text-justify">{work.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
