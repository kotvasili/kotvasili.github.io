'use client'
import {getParamByName} from "@/app/utils";
import {useEffect, useState} from "react";
import {HeroWrapper} from "@/components/HeroWrapper";
import styles from "@/components/AboutHero/HeadContent.module.sass";
import '../reset-password/style.sass'
import typography from "@/app/styles/typography.module.sass";
import {useEnvContext} from "next-runtime-env";

const confirmEmail = async (API_URL: string, token: string, authToken: string): Promise<any> => {
    return fetch(`${API_URL}/notifications/confirmation/electronicmail`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token token="${authToken}"`
        },
        body: JSON.stringify(token)
    }).then(data => {
        if (data.status === 200 || data.status === 204) {
            return data;
        } else {
            throw data
        }
    })
}

export default function EmailConfirmPage() {
    const { NEXT_PUBLIC_API_URL } = useEnvContext();
    const token = getParamByName('token');
    const authToken = getParamByName('auth');
    const [loaded, setLoaded] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    useEffect(() => {
        setLoaded(true)
        const fetchData = async () => {
            try{
                await confirmEmail(NEXT_PUBLIC_API_URL as string, token as string, authToken as string);
                setShowSuccess(true)
            }catch {
                setShowError(true)
            }
        }
        fetchData().catch(() => setShowError(true));
        //eslint-disable-next-line
    }, [])

    if(!loaded){
        return <HeroWrapper className={styles.head}></HeroWrapper>
    }
    if(!token || !authToken) {
        return <HeroWrapper className={styles.head}>
            <div className="col_group">
                <h1 className={typography.h1}>Oops!</h1>
                <p>This link isn&apos;t valid anymore, please open the EVA AI app and try again.</p>
            </div>
        </HeroWrapper>
    }
    if(showSuccess){
        return <HeroWrapper className={styles.head}>
            <div className="col_group">
                <h1 className={typography.h1}>Success!</h1>
                <p>Your Email has been confirmed!</p>
            </div>
        </HeroWrapper>
    }
    if(showError){
        return <HeroWrapper className={styles.head}>
            <div className="col_group">
                <h1 className={typography.h1}>Oops!</h1>
                <p>Sorry, there was a problem with your request.</p>
            </div>
        </HeroWrapper>
    }
}
