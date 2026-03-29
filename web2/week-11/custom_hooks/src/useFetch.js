import { useEffect, useState } from "react";

export function useFetch(url) {
    console.log(typeof(true))
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getPosts() {
        setLoading(true)
        const data = await fetch(url);
        const json = await data.json();
        setPost(json);
        setLoading(false);
    }

    useEffect(() => {
        getPosts();
    }, [url])

    useEffect(() => {
        const interval = setInterval(getPosts, 10 * 1000);
        return () => clearInterval(interval)
    }, [])

    return {
        post,
        loading
    }
}