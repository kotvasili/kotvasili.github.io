import styles from './Button.module.sass'
export const Button = ({text, disabled, onClick, className = ''}: {text: string; disabled?: boolean; onClick?: () => void; className?: string}) => {
    return <button className={`${styles.button} ${className}`} onClick={onClick} disabled={disabled}>{text}</button>
}
