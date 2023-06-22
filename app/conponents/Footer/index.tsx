import styles from './Footer.module.sass'
import Link from "next/link";
export const Footer = () => {
    return <footer className={styles.footer}>
        <Link className={styles.footer_link} href={'/terms-and-conditions'}>Terms & Conditions</Link>
        <Link className={styles.footer_link} href={'/privacy-policy'}>Privacy Policy</Link>
        <a className={styles.footer_link} href='mailto:support@evaapp.ai'>Support</a>
    </footer>
}
