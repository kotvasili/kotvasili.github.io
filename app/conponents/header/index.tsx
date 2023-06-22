import styles from './header.module.sass'
import Logo from 'public/assets/Sitelogo.svg';
export const Header = () => {
    return <header className={styles.header}>
        <p>EVA AI SPECIAL</p>
        <Logo />
        <p>say no to ghosting</p>
    </header>
}
