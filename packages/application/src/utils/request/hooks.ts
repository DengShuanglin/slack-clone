import {useState} from "react";
import {AxiosResponse} from "axios";
import {ResponseEntity} from "./types";


function useRequest<T = any, P =any >(requestFn: (t: T) => Promise<AxiosResponse<ResponseEntity<P>>>):[{
    state: 'pending' | 'finish' | 'error'
    data?: ResponseEntity<P>
},(t: T) => Promise<ResponseEntity<P>>] {
    const [data, setDate] = useState<{
        state: 'pending' | 'finish' | 'error'
        data?: ResponseEntity<P>
    }>({
        state: 'pending',
        data: undefined,
    })
    const getData = (t: T) => {
        setDate({
            data: data.data,
            state: 'pending'
        })
        return new Promise<ResponseEntity<P>>(async (resolve, reject) => {
            await requestFn(t).then((res) => {
                console.log(res);
                if (res.status !== 200&&res.status!==201) {
                    setDate({
                        data: res.data,
                        state: 'error'
                    })
                    reject(res);
                } else {
                    setDate({
                        data: res.data,
                        state: 'finish'
                    })
                    resolve(res.data)
                }
            })
        })
    }


    return [data, getData];
}

export default useRequest;
