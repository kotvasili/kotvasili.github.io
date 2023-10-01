'use client'
import Link from "next/link";
import {Button} from "@/components/Button";
import {usePathname} from "next/navigation";
import {FC, PropsWithChildren} from "react";

type THeaderLink = {
    href: string;
    text?: string
    onClick?: any
}
export const HeaderLink:FC<THeaderLink & PropsWithChildren> = ({href, text, children, onClick}) => {
    const pathname = usePathname()
    return <Link href={href} prefetch onClick={onClick}>
        <Button buttonType="small" className={pathname === href ? 'active': ''}>{text || children}</Button>
    </Link>
}
