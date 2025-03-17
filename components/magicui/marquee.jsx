import { cn } from "@/lib/utils";

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical && !reverse,
              "animate-marquee-reverse flex-row": !vertical && reverse,
              "animate-marquee-vertical flex-col": vertical && !reverse,
              "animate-marquee-vertical-reverse flex-col": vertical && reverse,
            })}>
            {children}
          </div>
        ))}
      <style jsx>{`
        .group:hover .animate-marquee,
        .group:hover .animate-marquee-reverse,
        .group:hover .animate-marquee-vertical,
        .group:hover .animate-marquee-vertical-reverse {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
