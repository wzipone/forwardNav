const $siteList = $('.siteList')
const $addCard = $('.addCard')
const $layer = $('.layer')
const $delete = $('.layer .delete')
const $confirm = $('.modifyContainer .confirm')
const $cancel = $('.modifyContainer .cancel')
const $siteInput = $('.modifyContainer #siteInput')
const isTouchDevice = 'ontouchstart' in document.documentElement;

const data = JSON.parse(localStorage.getItem('siteArr'))
const siteArr = data || [{
    logo: 'A',
    url: 'https://www.acfun.cn/'
}, {
    logo: 'B',
    url: 'https://www.bilibili.com/'
}]


// 渲染siteList
const render = () => {
    $siteList.find('li:not(.addCard)').remove()

    siteArr.forEach((el, i) => {
        const $li = $(`<li class="site">
            <a href="${el.url}" class="link">
                <span class="logo">${el.logo}</span>
                <span class="url">${simpleUrl(el.url)}</span>
            </a>
            <div class="modify">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiugai"></use>
                </svg>
            </div>
        </li>`).insertBefore($addCard)

        const enventFn =(e) => {

            if (e.target.nodeName === 'svg' || e.target.nodeName === 'use') {
                console.log('2');
                $layer.addClass('layerShow')

                $delete.on('click', () => {
                    siteArr.splice(i, 1)
                    render()
                    $layer.removeClass('layerShow')
                })

                $confirm.on('click', () => {

                    const url = $siteInput.val() //这里使用attr()，获取不到实时的文本框值
                    siteArr[i].url = ampleUrl(url)
                    siteArr[i].logo = simpleUrl(url)[0].toUpperCase()
                    render()
                    $layer.removeClass('layerShow')
                })
            }
        }

        console.log(isTouchDevice);
        
        if(isTouchDevice){
            $li.on('touchstart', enventFn)
        }else{
            $li.on('click', enventFn)
        }
        

    })
}


// addCard绑定收藏站点
$('.addCard').on('click', () => {
    const url = prompt('请输入收藏的网址！')

    siteArr.push({
        logo: simpleUrl(url)[0].toUpperCase(),
        url: ampleUrl(url)
    })
    render()
})

$cancel.on('click', () => {
    $layer.removeClass('layerShow')
})



const simpleUrl = (url) => {
    return url.replace(/https:\/\/|http:\/\/|www\.|\/.*/g, '')
}

const ampleUrl = (url) => {
    return url.match(/^http/) ? url : `https://${url}`
}

// 打开网页第一次渲染
render()

window.onbeforeunload = () => {
    localStorage.setItem('siteArr', JSON.stringify(siteArr))
}

$(document).on('keypress', (e) => {

    if(e.target.nodeName === 'INPUT') return
    
    const {key} = e
    for (let i = 0; i < siteArr.length; i++) {
        if (siteArr[i].logo.toLowerCase() === key) {
            window.open(siteArr[i].url)
        }
    }
})