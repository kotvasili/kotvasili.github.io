import styles from './TextCard.module.sass'
export const TextCard = ({text, className = ''}: {text: string; className?: string}) => {
    return <div className={`${styles.textCard} ${className}`}>{text}</div>
}
