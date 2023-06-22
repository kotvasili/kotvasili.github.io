'use client'
import {Button} from "@/app/conponents/Button";
import {useCallback} from "react";

export const ScrollButton = ({text}: {text: string}) => {
    const scrollToStories = useCallback(() => {
        document.getElementById("story")?.scrollIntoView()
    }, [])
   return  <Button className='button' text={text} onClick={scrollToStories}/>
}
