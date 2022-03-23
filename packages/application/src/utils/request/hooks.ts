import {useState} from "react";
import {AxiosResponse} from "axios";


function useRequest<T = any, P = any>(requestFn: (t: T) => Promise<AxiosResponse<P>>) {
    const [data, setDate] = useState<{
        state: 'pending' | 'finish' | 'error'
        data?: P
    }>({
        state: 'pending',
        data: undefined,
    })
    const getData = (t: T) => {
        setDate({
            data: data.data,
            state: 'pending'
        })
        return new Promise(async (resolve, reject) => {
            await requestFn(t).then((res) => {
                if (res.status !== 200) {
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
