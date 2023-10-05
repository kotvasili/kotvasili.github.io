'use client'
import Logo from '../../public/assets/Logo.svg'
import X from '../../public/assets/x.svg'
import styles from './Header.module.sass'
import {GhostingLink} from "@/components/GhostingLink";
import Link from "next/link";
import {HeaderLink} from "@/components/HeaderLink";
import {motion} from "framer-motion";
import {FC, useEffect, useState} from "react";
import {IEvaHeaderFields} from "@/contentful/generated/types";
import {CustomImage} from "@/components/CustomImage";
import {Button} from "@/components/Button";
import Menu from '../../public/assets/Menu.svg'
import Cross from '../../public/assets/Button.svg'
import {DownloadLink} from "@/components/DownloadLink";
import fstyles from '../FooterLinks/FooterLinks.module.sass'
import {usePathname} from "next/navigation";
export const Header: FC<IEvaHeaderFields> = ({hasLoginButton, copyright, webUrl, socLinks, universalLink}) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [open, setOpen] = useState(false)
    const pathname = usePathname()
    const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <>

        <motion.header
            initial={{opacity: 0, y: '-30%'}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 2.3, duration: 0.5}}
            //@ts-ignore
            className={`${styles.header} ${['/about', '/', '/support', '/support.html'].includes(pathname) ? 'abs' : ''} ${scrollPosition > globalThis.window?.innerHeight ? "black" : ""}`}>
        <div className={styles.header_left}>
            <Link href='/'>
                <Logo />
            </Link>
            <X />
            <GhostingLink />
        </div>
        <nav className={styles.header_right}>
            <HeaderLink text="About Us" href="/about"/>
            <HeaderLink text="Brandbook" href="/brandbook"/>
            {socLinks.map(link => (
                <HeaderLink  key={link.fields.title} href={link.fields.link} blank><CustomImage {...link.fields.image}/></HeaderLink>
            ))}
            {hasLoginButton ? <>
                <hr/>
                <HeaderLink text="Log In" href={webUrl!} blank />
            </> : null
            }
            <Button buttonType="small" onClick={() => setOpen(prev => !prev)}><Menu/></Button>
        </nav>
    </motion.header>
    <div className={`${styles.menu} ${open ? 'open': ''}`}>
        <div className={styles.menu_inner}>
            <Cross onClick={() => setOpen(false)} />
            <Link href='/' onClick={() => setOpen(false)}>
                <Logo />
            </Link>
            <div className={styles.menu_links}>
                <HeaderLink text="About Us" href="/about" onClick={() => setOpen(false)}/>
                <HeaderLink text="Brandbook" href="/brandbook" onClick={() => setOpen(false)}/>
                {hasLoginButton ?
                    <HeaderLink text="Log In" href={webUrl!} blank />
                 : null
                }
            </div>
            <div className={styles.menu_soc}>
                {socLinks.map(link => (
                    <HeaderLink  key={link.fields.title} href={link.fields.link} blank ><CustomImage {...link.fields.image}/></HeaderLink>
                ))}
            </div>
            <DownloadLink href={universalLink}>Download now</DownloadLink>
            <div className={fstyles.flinks}>
                <div className={fstyles.flinks_links}>
                    <Link href="/terms" onClick={() => setOpen(false)}>Terms</Link>
                    <Link href="/pp" onClick={() => setOpen(false)}>Privacy policy</Link>
                </div>
                <p>{copyright}</p>
            </div>
        </div>
    </div>
    </>
}
