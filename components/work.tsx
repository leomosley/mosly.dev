import { WORK } from "@/lib/constants";

export function Work() {
  return (
    <section id="work" className="w-full">
      <h2 className="mt-8 mb-2 text-xl font-bold">Work</h2>
      <div>
        {WORK.map((work, index) => (
          <div key={index} className="mb-6">
            <a
              href={work.link}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-lg font-semibold"
            >
              {work.company}
            </a>
            <p className="text-md text-neutral-400">
              {work.position} ({work.duration})
            </p>
            {work.description && (
              <p className="text-md mt-1 text-justify">{work.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
