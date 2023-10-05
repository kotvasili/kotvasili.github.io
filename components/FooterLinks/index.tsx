import Link from "next/link";
import styles from './FooterLinks.module.sass'
import {AnimContent} from "@/components/AnimContent";
export const FooterLinks = ({terms, privecypolicy, copyright, customerSupport}: {terms: string; privecypolicy: string; copyright: string; customerSupport: string}) => {
    return <AnimContent delay={2} className={styles.flinks}>
    <div className={styles.flinks_links}>
        <Link href="/terms">{terms}</Link>
        <Link href="/pp">{privecypolicy}</Link>
        <Link href="/support">{customerSupport}</Link>
    </div>
    <p>{copyright}</p>
</AnimContent>
}
