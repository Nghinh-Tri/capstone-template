export default function serviceWorker() {
    let url = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`
    navigator.serviceWorker.register(url).then(res => {
        console.warn(res)
    })
}