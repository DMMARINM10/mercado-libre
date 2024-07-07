export const fetcher = (url) => {
    return fetch(url)
    .then((res) => {
        if(!res.ok) {
            throw new Error()
        }
        return res.json()
    });
}

export const getItem = async (id) => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/${id}`
    try {
        const resp = await fetch(url)
        if(!resp.ok) {
            return {
                error: true,
                data: null,
            }
        }
        const data = await resp.json()
        return {
            data,
            error: false
        }
    } catch (error) {
        console.error(error)
        return {
            error: true,
            data: null,
        }
    }
}