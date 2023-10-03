import Link from "next/link";
import styles from './GhostingLink.module.sass'
import GhostingLogo from '../../public/assets/ghostLogo.svg'
import GhostHand from '../../public/assets/ghostHand.svg'
export const GhostingLink = () => {
    return <Link href='https://stopghosting.me/' className={styles.ghosting_link} target='_blank'>
        <div className={styles.ghosting_icon}>
            <GhostingLogo />
            <GhostHand />
            <GhostHand />
        </div>
        <span>
            Stop Ghosting
        </span>
    </Link>
}
