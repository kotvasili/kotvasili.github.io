'use client'
import React, {useContext, useRef, PropsWithChildren, useEffect} from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation'; // Import your pathname utility
import styles from './AnimLayout.module.sass'
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context";

function FrozenRouter(props: PropsWithChildren<{}>) {
    const context = useContext(LayoutRouterContext);
    const frozen = useRef(context).current;

    return (
        <LayoutRouterContext.Provider value={frozen}>
            {props.children}
        </LayoutRouterContext.Provider>
    );
}

export const AnimLayout = (props: PropsWithChildren<{}>) => {
    const pathname = usePathname();
    const lastPageRef = useRef<HTMLCollection | null>(null);
    const currentPageRef = useRef<HTMLDivElement>(null);
    const exitAnimationDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!currentPageRef.current) return;
        if (!lastPageRef.current)
            lastPageRef.current = currentPageRef.current.children;

        exitAnimationDivRef.current?.appendChild(
            lastPageRef.current![0].cloneNode(true)
        );
        lastPageRef.current = currentPageRef.current.children;
    }, [pathname]);

    return (
        <AnimatePresence initial={false}>
            <main className={styles.main}>
                <motion.div
                    key={pathname + "exit-animation"}
                    style={{
                        position: "absolute",
                        pointerEvents: 'none',
                    }}
                    className={styles.main_content}
                    initial={{ y: 0 }}
                    animate={{
                        y: -20,
                        opacity: 0,
                    }}
                    transition={{
                        type: "linear",
                        duration: 0.3,

                    }}
                >
                    <div ref={exitAnimationDivRef} className={styles.main_content}  />
                </motion.div>

                <motion.div
                    key={pathname}
                    initial={{ y: 30, opacity: 0}}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "linear", duration: 0.4,delay: 0.3 }}
                    className={styles.main_content}
                >
                    <div ref={currentPageRef} className={styles.main_content} style={{
                        display: 'contents',
                    }}>{props.children}</div>
                </motion.div>
            </main>
        </AnimatePresence>
    );
}
