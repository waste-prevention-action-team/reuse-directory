import axios from 'axios'

export const loadScript = (url, callback) => {
    const js = document.createElement('script')
    js.src = url
    document.head.appendChild(js)
    js.onload = callback
}

export const loadIframe = (iframe, src) => {
    axios
        .get(src)
        .then(({ data }) => {
            setTimeout(() => {
                const contents = iframe.contentDocument
                contents.querySelector('html').innerHTML = data
                contents
                    .querySelectorAll('a[href^="http://"], a[href^="https://"]')
                    .forEach((anchor) => {
                        anchor.target = '_blank'
                    })
                contents
                    .querySelectorAll('a[href^="https://www.google.com/url?q="]')
                    .forEach((anchor) => {
                        let href = anchor.href.slice(29) // 29 is the length of google url
                        const googleQueryIndex = href.lastIndexOf('&sa=')   // this is some kind of google tracking query
                        if (googleQueryIndex > -1) {
                            href = href.slice(0, googleQueryIndex)
                        }
                        anchor.href = decodeURIComponent(href)
                    })
            })
        })
        .catch(() => {
            setTimeout(() => {
                iframe.contentDocument.querySelector('html').innerHTML = 'Error loading the page'
            })
        })
}
