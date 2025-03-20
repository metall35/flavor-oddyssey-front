import { useEffect } from "react";
import { useIntersectionStore } from "./useStore";
import { usePathname } from "next/navigation";

const useIntersectionObserver = () => {
    const { targetRef, isVisible, setTargetRef, setIsVisible } = useIntersectionStore()
    const pathname = usePathname()

    useEffect(() => {
        const targetNode = targetRef

        if (!targetNode || !(targetNode instanceof Element)) {
            console.error("targetRef no es un elemento válido:", targetNode);
            return;
        }

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (pathname == "/") {
                    if (entry.isIntersecting) {
                        setIsVisible(false);
                    } else {
                        setIsVisible(true);
                    }
                } else {
                    setIsVisible(true)
                }
            });
        };

        const observer = new IntersectionObserver(callback, { threshold: 0.5 });

        observer.observe(targetNode);

        return () => {
            observer.disconnect();
        };
    }, [targetRef, setIsVisible]);

    return {
        targetRef,
        isVisible,
        setTargetRef
    }
}

export default useIntersectionObserver