import {FC, PropsWithChildren} from "react";

export const HeroWrapper:FC<PropsWithChildren & {className?: string}> = ({children,className}) => {
return <div className={`hero ${className ? className : ''}`}>
    {children}
</div>
}
