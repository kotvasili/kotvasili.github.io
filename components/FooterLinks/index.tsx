import Link from "next/link";
import styles from './FooterLinks.module.sass'
import {AnimContent} from "@/components/AnimContent";
export const FooterLinks = ({terms, privecypolicy, copyright}: {terms: string; privecypolicy: string; copyright: string}) => {
    return <AnimContent delay={2} className={styles.flinks}>
    <div className={styles.flinks_links}>
        <Link href="/terms">{terms}</Link>
        <Link href="/pp">{privecypolicy}</Link>
    </div>
    <p>{copyright}</p>
</AnimContent>
}
