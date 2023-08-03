const logoSelector = 'h1[role="heading"] a > div > svg';
const replaceSvg = '<svg viewBox="0 0 24 24" aria-hidden="true" class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-16y2uox r-8kz0gk r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/></g></svg>';

function waitSvgLoad(mutationsList, observer) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
            // 如果有新的节点添加到DOM中，检查是否有匹配的SVG元素
            const svgElements = document.querySelectorAll(logoSelector);
            if (svgElements.length > 0) {
                observer.disconnect();
                svgElements.forEach(e => {
                    const newSVG = document.createElement('div');
                    newSVG.innerHTML = replaceSvg;

                    for (const { name, value } of e.attributes) {
                        if (name !== 'src') {
                            newSVG.setAttribute(name, value)
                        }
                    }

                    e.parentNode.replaceChild(newSVG, e)
                })
            }
        }
    }
}

const observer = new MutationObserver(waitSvgLoad);
observer.observe(document, { childList: true, subtree: true });

const head_links = document.head.querySelectorAll('link')
head_links.forEach(l => {
    if (l.rel === 'shortcut icon' || l.rel === 'icon') {
        const new_link = document.createElement('link')
        new_link.rel = l.rel
        new_link.href = 'https://abs.twimg.com/favicons/twitter.2.ico'
        l.parentNode.replaceChild(new_link, l)
    }
})



setInterval(() => {
    if (document.title.endsWith('/ X')) {
        document.title = document.title.slice(0, -2) + ' Twitter'
    }
}, 1000)
