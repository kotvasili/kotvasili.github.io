import {FC} from "react";
import {IAppLinksFields} from "@/contentful/generated/types";
import styles from './HeroLinks.module.sass'
import GPlay from '../../public/assets/Gplay.svg'
import AppStore from '../../public/assets/AppStore.svg'
import {CustomImage} from "@/components/CustomImage";
import {AnimContent} from "@/components/AnimContent";
import {DownloadLink} from "@/components/DownloadLink";

export const HeroLinks: FC<IAppLinksFields> = ({qrCode,gplay, appStore, universalLink, appStoreDisabled, gplayDisabled}) => {
    return <AnimContent delay={2}>
        <div className={styles.links}>
        <div className={styles.links_qr}>
            <CustomImage {...qrCode}/>
        </div>
        <a className={`${styles.links_gplay} ${gplayDisabled ? 'disabled' : ''}` } href={gplay}>
            <GPlay/>
        </a>
        <a className={`${styles.links_appstore} ${appStoreDisabled ? 'disabled' : ''}`} href={appStore}>
            <AppStore/>
        </a>
        <DownloadLink href={universalLink}>Download now</DownloadLink>
    </div>
    </AnimContent>
}
