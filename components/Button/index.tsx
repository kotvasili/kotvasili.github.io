'use client'
import styles from './Button.module.sass'
import {motion} from "framer-motion";
import {ButtonHTMLAttributes, FC, PropsWithChildren} from "react";
export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>{
    buttonType?: 'small' | 'medium' | 'large',
}
export const Button: FC<ButtonProps> = ({buttonType = 'medium', children, className, onClick}) => {
    return <motion.button onClick={onClick} whileTap={{scale: 0.95}} className={`${styles.button} ${buttonType} ${className}`}>{children}</motion.button>
}
