window.siteList = [{
    logo: 'A',
    url: 'https://www.acfun.cn/'
}, {
    logo: 'B',
    url: 'https://www.bilibili.com/'
}]

positon = 0 //渲染开始的位置

// 渲染siteList
const render = () => {
    let html = ''
    for (let i = positon; i < siteList.length; i++) {
        html += `<li class="site">
            <a href="${siteList[i].url}" class="link">
                <span class="logo">${siteList[i].logo}</span>
                <span class="url">${simpleUrl(siteList[i].url)}</span>
            </a>
            <div class="modify">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiugai"></use>
                </svg>
            </div>
        </li>`
    }

    const $list = $(html)

    $list.insertBefore($('.addCard'))

    $list.on('click', (e) => {
        if (e.target.nodeName === 'A') return
        console.log(e);

        const siteTarget = e.currentTarget
        const index = $('.siteList > .site').index(siteTarget)

        $('.layer').addClass('layerShow')

        $('.delete').on('click', () => {
            console.log(siteTarget);
            
            $(siteTarget).remove()

            $('.layer').removeClass('layerShow')

            siteList.splice(index, 1)

            positon--
        })

        $('.confirm').on('click', () => {
            const elInput = $('#newSiteInput').get(0)
            const url = elInput.value
           
            if(!url) {
                elInput.placeholder = '网址不得为空哦！'
                return               
            }

            siteList[index].url = ampleUrl(url)
            siteList[index].logo = simpleUrl(url)[0].toUpperCase()
            $(siteTarget).find('.url').text(simpleUrl(url))
            $(siteTarget).find('.logo').text(siteList[index].logo)
            
            $('.layer').removeClass('layerShow')
        })
    })

    positon = siteList.length
}

// addCard绑定收藏站点
$('.addCard').on('click', () => {
    const url = prompt('请输入收藏的网址！')

    siteList.push({
        logo: simpleUrl(url)[0].toUpperCase(),
        url: ampleUrl(url)
    })
    render()
})

$('.cancel').on('click', () => {
    $('.layer').removeClass('layerShow')
})



const simpleUrl = (url) => {
    return url.replace(/https:\/\/|http:\/\/|www\.|\/.*/g, '')
}

const ampleUrl = (url) => {
    return url.match(/^http/) ? url : `https://${url}`
}

// 打开网页第一次渲染
render()