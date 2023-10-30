'use client'
import {getParamByName} from "@/app/utils";
import {useEffect, useState} from "react";
import {HeroWrapper} from "@/components/HeroWrapper";
import styles from "@/components/AboutHero/HeadContent.module.sass";
import '../reset-password/style.sass'
import typography from "@/app/styles/typography.module.sass";
import {useEnvContext} from "next-runtime-env";

const getUser = (API_URL: string, token: string): Promise<number> => {
    return fetch(`${API_URL}/identity`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token token="${token}"`
        }
    }).then(res => {
        if (res.status === 200 || res.status === 204) {
            return res.json()
        } else {
            throw res
        }
    }).then(data => data.id);
}
const unsubscribe = async (API_URL: string, token: string, userId: number): Promise<any> => {
    const data = await fetch(`${API_URL}/subscriptions/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token token="${token}"`
        },
        body: JSON.stringify({'*': false})
    });
    if (data.status.toString().startsWith('2')) {
        return data.json();
    } else {
        throw data;
    }
}
const unsubscribeFN = async (API_URL: string, token: string): Promise<any> => {
    try {
        const userId = await getUser(API_URL, token)
        await unsubscribe(API_URL, token, userId)
    }catch (e){
        throw e
    }
}

export default function UnsubscribePage() {
    const { NEXT_PUBLIC_API_URL } = useEnvContext();
    const token = getParamByName('token', globalThis?.window?.location?.href, '#');
    const [loaded, setLoaded] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    useEffect(() => {
        setLoaded(true)
        const fetchData = async () => {
            try{
                await unsubscribeFN(NEXT_PUBLIC_API_URL as string, token as string);
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
    if(!token) {
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
