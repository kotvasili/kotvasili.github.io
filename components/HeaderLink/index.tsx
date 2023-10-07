'use client'
import Link from "next/link";
import {Button} from "@/components/Button";
import {usePathname} from "next/navigation";
import {FC, PropsWithChildren} from "react";

type THeaderLink = {
    href: string;
    text?: string
    onClick?: any
    blank?: boolean
}
export const HeaderLink:FC<THeaderLink & PropsWithChildren> = ({href,blank = false, text, children, onClick}) => {
    const pathname = usePathname()
    return <Link href={href} prefetch onClick={onClick} target={blank ? '_blank' : '_self'} scroll={false}>
        <Button buttonType="small" className={pathname === href ? 'active': ''}>{text || children}</Button>
    </Link>
}
