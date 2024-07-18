export const fetcher = (url) => {
    return fetch(url)
    .then((res) => {
        if(!res.ok) {
            throw new Error()
        }
        return res.json()
    });
}