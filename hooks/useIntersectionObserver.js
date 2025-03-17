import { useEffect, useRef, useState } from "react";

const useIntersectionOberserver = () => {
    const targetRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const targetNode = targetRef.current;

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
            });
        };

        const observer = new IntersectionObserver(callback, { threshold: 0.5 });

        observer.observe(targetNode);

        return () => {
            observer.disconnect();
        };
    }, []);

    return {
        targetRef,
        isVisible
    }
}

export default useIntersectionOberserver