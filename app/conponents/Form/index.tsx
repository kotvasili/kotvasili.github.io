'use client'
import styles from './Form.module.sass'
import typography from '../../styles/typography.module.sass'
import {IGhostingFormFields} from "@/contentful/generated/types";
import Arrow2 from './../../../public/assets/Arrow2.svg'
import {useForm, Form} from "react-hook-form";
import {Button} from "@/app/conponents/Button";
import {useCallback, useId, useState} from "react";
import Lock from '../../../public/assets/Lock.svg'
import {Bubble} from "@/app/conponents/Bubble";
const isValidEmail = (email: string) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
export const StoryForm = (props: IGhostingFormFields) => {
    const [submitted, setSubmitted] = useState(false)
    const {
        register,
        handleSubmit,
        control,
        setError,
        reset,
        formState: {
            isSubmitting,
            isValid, errors,
            isDirty} } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange'
    });
    const inpId = useId();
    const textId = useId();
    const onSubmit = useCallback(async (data: any) =>   {
        try {
            await fetch('/api/story', {
                method: "post",
                body: JSON.stringify(data)
            }).then(res => {
                if (res.status === 200) {
                    setSubmitted(true)
                    reset()
                }
                else {
                    setError('server', {
                        type: "server",
                        message: 'Sorry! We were unable to submit your story. Try again later',
                    });
                }
            })

    } catch (e) {
        setError('server', {
            type: "server",
            message: 'Sorry! We were unable to submit your story. Try again later',
        });
    }}, [reset, setError]);


    return <div className={styles.form_wrapper} id="form">
        <div className={styles.form_step_container}>
            <div className={styles.form_step_container_inner}>
                <p className={styles.form_step}>step 1</p>
                <Arrow2 />
            </div>
        </div>
        <div className={styles.form_container}>
            <h3 className={typography.h3}>{props.title}<span>{props.title2}</span></h3>
            {/* @ts-ignore */}
            <Form className={styles.form_form} onSubmit={handleSubmit(onSubmit)} control={control}>
                {
                    submitted ? <>
                        <h3 className={typography.h3}>Thank you </h3>
                        <p>Your story have been submitted successfully</p>
                    </> : <>
                        <label className={styles.input_label} htmlFor={textId}>{props.storyLabel}</label>
                        <textarea className={`${styles.input_input} ${styles.input_textarea}`}
                                  {...register("story", { required: true, maxLength: 700 })}
                                  id={textId}
                                  aria-invalid={errors.story ? "true" : "false"}
                                  placeholder="Type here"
                                  rows={7}
                        />
                        {errors.story && errors.story.type === "required" && <span>This is required</span>}
                        {errors.story && errors.story.type === "maxLength" && <span>Max length exceeded</span> }
                        <label className={styles.input_label} htmlFor={inpId}>{props.emailLabel}</label>
                        <input type="email"
                               aria-invalid={errors.email ? "true" : "false"}
                               className={styles.input_input} id={inpId}
                               {...register("email", { required: true, validate: isValidEmail  })}
                               placeholder="Type here"
                        />
                        {errors.email && errors.email.type === "required" && <span>This is required</span>}
                        {errors.email && errors.email.type === "validate" && <span>Not valid email</span> }
                        {/* @ts-ignore */}
                        {errors.server && errors.server.type === "server" && <span className='bold'><b>{errors?.server?.message}</b></span> }
                        <Button text={props.cta} className={styles.form_submit} disabled={isSubmitting || !isValid || (!!errors.name || !!errors.story)}/>
                    </>
                }
            </Form>
            <div className={styles.form_footer}>
                <Lock />
                {props.formInfo}
            </div>
        </div>
        <Bubble className='bubble-10 rot20 blur10 op06' offset={25}/>
        <Bubble className='bubble-11' />
    </div>
}
