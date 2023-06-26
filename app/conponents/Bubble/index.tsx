'use client'
import { useState, useRef, useLayoutEffect } from "react";
import {
    motion,
    useTransform,
    useSpring,
    useReducedMotion, useScroll,
} from "framer-motion";
import { LocalImage} from "@/app/conponents/CustomImage";

type ParallaxProps = {
    offset?: number;
    className: string
};

export const Bubble = ({ offset = 50, className }: ParallaxProps): JSX.Element => {
    const prefersReducedMotion = useReducedMotion();
    const [elementTop, setElementTop] = useState(0);
    const [clientHeight, setClientHeight] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();

    const initial = elementTop - clientHeight;
    const final = elementTop - offset;

    const yRange = useTransform(scrollY, [initial, final], [offset, -offset]);
    const y = useSpring(yRange, { stiffness: 400, damping: 90 });

    useLayoutEffect(() => {
        const element = ref.current!;
        const onResize = () => {
            setElementTop(
                element?.getBoundingClientRect().top + window.scrollY ||
                window.pageYOffset
            );
            setClientHeight(window.innerHeight);
        };
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [ref]);

    // Don't parallax if the user has "reduced motion" enabled
    if (prefersReducedMotion) {
        return <> <LocalImage src="/assets/buble.png"  alt="Bubble" width={300} height={300}/></>;
    }

    return (
        <motion.div ref={ref} style={{ y }} className={`bubble ${className}`}>
            <LocalImage src="/assets/buble.png"  alt="Bubble" width={300} height={300}/>
        </motion.div>
    );
};
