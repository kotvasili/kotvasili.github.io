'use client'
import {FC, PropsWithChildren} from "react";

import {Button} from "@/components/Button";
import Arrow from "@/public/assets/arrow.svg";
import {Position} from "@/app/utils";

export const BTN: FC<PropsWithChildren> = ({children}) => {
    const onClick = () => {
        const el = document.getElementById('bb');
        if(el){
            // @ts-ignore
            window.scroll(0, Position(el, 100));
        }
    }
    return <Button buttonType="large" onClick={onClick}><Arrow/>{children}</Button>
}
