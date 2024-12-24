import { useState } from "react";

import React from 'react'

export default function useGet<T>() {
    const [data, setData ] = useState<T[]>([])
    const [errMsg, setErr] = useState('')
    async function getData(url: string, params: string) {
        try {
            let response = await fetch(url + params, {})
            const body = await response.json()
            if(!response.ok){
                if (body.msg) {
                    setErr(`${body.msg}`)
                    return
                }
                console.log(body.body)
                setErr(`request failed with status${response.status}`)
                return
            }
            if(body.data)
                setData(body.data)
                if (!body.data.length)
                {
                    setErr('got an empty list of data')
                    return
                }
            else {
                console.log(body)
            }
            setErr('')
        } catch(e) {
            // console.log()
            console.log((e as Error).message || e)
            setErr('Failed to get data')
        }
    }

  return {data, errMsg, getData}
}
