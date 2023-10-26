'use client'
import {useEnvContext} from "next-runtime-env";
import {getParamByName} from "@/app/utils";
import styles from "@/components/AboutHero/HeadContent.module.sass";
import {HeroWrapper} from "@/components/HeroWrapper";
import './style.sass'
import {useEffect, useRef, useState} from "react";
import {Button} from "@/components/Button";
import typography from "@/app/styles/typography.module.sass";
const setPassword = async (API_URL: string, token: string, password: string): Promise<any> => {
    return fetch(`${API_URL}/identity`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token token="${token}"`
        },
        body: JSON.stringify({password})
    }).then(data => {
        if (data.status === 200 || data.status === 204) {
            return data;
        } else {
            throw data
        }
    })
}

export default function ResetPasswordPage() {
    const { NEXT_PUBLIC_API_URL } = useEnvContext();
    const token = getParamByName('token', globalThis.window?.location?.href, '#');
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState('')
    const [disabled, setDisabled] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, [])
    const submit = async () => {
        try {
            await setPassword(NEXT_PUBLIC_API_URL as string, token as string, value);
            setShowSuccess(true)
        }catch {
            setShowError(true)
        }

    }
    const onChange = (e: { target: { value: any; }; }) => {
        setValue(value)
        setDisabled(!e.target.value)
    }
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
    if(showError) {
        return <HeroWrapper className={styles.head}>
            <div className="col_group">
                <h1 className={typography.h2}>Error!</h1>
                <p>Sorry, there was a problem with your request.</p>
                <Button onClick={() => setShowError(false)}>Try again</Button>
            </div>
        </HeroWrapper>
    }
    if(showSuccess) {
        return <HeroWrapper className={styles.head}>
            <div className="col_group">
                <h1 className={typography.h2}>Your password has been successfully changed</h1>
                <p>Please, open the app and log in with your new credentials.</p>
                <a href="https://journeyapp.onelink.me/9rvJ/pyzx9izk?af_force_deeplink=true">
                    <Button >Open EVA AI app</Button>
                </a>

            </div>
        </HeroWrapper>
    }
    return <HeroWrapper className={`${styles.head} wrap`} >
        <div className="col_group">
            <h2 className={typography.h2}>Enter a new password below</h2>
            <span className="input input--minoru">
                <input className="input__field input__field--minoru" type="password" placeholder="Enter a new password" id="input-13" ref={inputRef} onChange={onChange}/>
                <label className="input__label input__label--minoru" htmlFor="input-13">
                    <span className="input__label-content input__label-content--minoru">New password</span>
                </label>
            </span>
            <Button buttonType="medium" disabled={disabled} onClick={submit}>Change password</Button>
        </div>

    </HeroWrapper>
}
export const dynamic = 'force-dynamic';
