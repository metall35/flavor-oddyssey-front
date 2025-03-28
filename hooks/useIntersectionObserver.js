import { useEffect } from "react";
import { useIntersectionStore } from "./useStore";
import { usePathname } from "next/navigation";

const useIntersectionObserver = () => {
    const { targetRef, isVisible, setTargetRef, setIsVisible } = useIntersectionStore();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== "/" || !targetRef || !(targetRef instanceof Element)) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(!entry.isIntersecting),
            { threshold: 0.5 }
        );

        observer.observe(targetRef);

        return () => observer.disconnect();
    }, [targetRef, pathname, setIsVisible]);

    return { targetRef, isVisible, setTargetRef };
};

export default useIntersectionObserver;
