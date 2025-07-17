//the function can be fetchMovies for example
//or fetch movie details

import { useEffect, useState } from "react"

//should look like something like this useFetch(fetchMovies)

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const fetchData = async () => {
        try {
            setLoading(true)
            setError(null)
            const result = await fetchFunction()

            setData(result)
        }   catch(err) {
            
            setError(err instanceof Error ? err: new Error('An error occurred'))
        }   finally {
                setLoading(false)
        }
    }

    const reset = () => {
        setData(null);
        setLoading(false);
        setError(null);
    }
    //useEffect hook, is called when we wan’t to do something at the start of the component load
    useEffect(()=>{
        if(autoFetch) {
            fetchData()
        }
    }, [])

    return { data, loading, error, refetch: fetchData, reset }
}


export  default useFetch