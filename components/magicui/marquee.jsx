import styles from "@/styles/marquee.module.css";
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
        "group flex overflow-hidden p-2",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      style={{
        "--duration": "40s",
        "--gap": "1rem",
        gap: "var(--gap)",
      }}>
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around",
              {
                [styles["animate-marquee"]]: !vertical && !reverse,
                [styles["animate-marquee-reverse"]]: !vertical && reverse,
                [styles["animate-marquee-vertical"]]: vertical && !reverse,
                [styles["animate-marquee-vertical-reverse"]]: vertical && reverse,
              },
              vertical ? "flex-col" : "flex-row"
            )}
            style={{ gap: "var(--gap)" }}>
            {children}
          </div>
        ))}
      <style jsx>{`
        .group:hover .${styles["animate-marquee"]},
        .group:hover .${styles["animate-marquee-reverse"]},
        .group:hover .${styles["animate-marquee-vertical"]},
        .group:hover .${styles["animate-marquee-vertical-reverse"]} {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
