import useSWR from 'swr/immutable'
import axios from "axios";
import config from '../config/var.config';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

const usePlayer = () => {

    const fetcher = async (url) => {
        const { data } = await axios.get(url);
        
        return data;
    };

    const axiosPutResponse = async (param) => {
        const response = await axios.put(
           `${config.serverURL}api/players`,
           param
        );
        return response;
    }

    const {data: allPlayer, ...restSWR} = useSWR(`${config.serverURL}api/players`, fetcher, {refreshInterval: 1000})

    const storePlayer = useCallback(async (param) => {
        const promise = axiosPutResponse(param)
        toast.promise(promise, {
            loading:'Saving data...',
            success: 'Saved successfully',
            error: 'Failed saving'
        })
    }, [])

    return {
        ...restSWR,
        allPlayer,
        storePlayer
    }
}

export {usePlayer}