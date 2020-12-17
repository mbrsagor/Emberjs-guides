var DivineToolbar = function (divineITSite = 'https://divineit.net/', offset = '100px', viewDitLink=true) {
    divineITSite = divineITSite.replace(/\/+$/, "")
    var style = `
        .dt-wrap {
            position: fixed;
            top: ${offset};
            right: 0;
            z-index: 9999;
            transition: right .2s ease
        }
        .dt-inner {
            position: relative;
            background: #ffffff;
            width: 300px;
            box-shadow: -1px 2px 8px -4px #444;
            border-radius: 0px 0px 0px 8px;
            border: 1px solid #ccc;
            border-right: none;
        }
        .dt-wrap.closed {
            right: -302px;
        }
        .dt-wrap.open {
            right: 0;
        }
        a.dt-knob {
            position: absolute;
            width: 48px;
            left:-48px;
            top:-1px;
            display: block;
            text-align: center;
            font-size: 18px;
            line-height: 0px;
            padding: 10px;
            background: #fff;
            border-radius: 8px 0px 0px 8px;
            box-shadow: -2px 2px 8px -4px #444;
            border: 1px solid #ccc;
            border-right: none;
            color: rgba(0, 114, 246, 0.75);
        }
        .dt-tray {
            clear:both;
            padding: 10px;
        }
        .dt-tray li {
            display: inline-block;
            width: 48%;
            text-align: center;
            margin-bottom: 10px;
            padding: 5px;
            border: 1px solid transparent;
        }
        .dt-tray li:hover {
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .dt-tray li img {
            width: 100px;
        }
        .dt-tray li span {
            display:block;
            color: #444;
            font-size: 14px;
        }
        .dt-tray li:hover span {
            color: rgba(0, 114, 246, 0.9);
        }
        .dt-bottom a {
            display: block;
            text-align: center;
            background: #eee;
            padding: 10px 0px;
            border-radius: 0px 0px 0px 8px;
        }
    `

    var ditLink = ''
    if (viewDitLink) {
        ditLink = `
            <div class="dt-bottom">
                <a href="${divineITSite}/">Visit Divine IT Website</a>
            </div>
        `
    }

    var wrapTemplate = `
        <div class="dt-inner">
            <a href="#" class="dt-knob">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </a>
            <div class="dt-tray">

            </div>
            ${ditLink}
        </div>
    `

    var styleElem = document.createElement('style')
    styleElem.innerHTML = style
    document.head.appendChild(styleElem)

    var wrapElem = document.createElement('div')
    wrapElem.className = 'dt-wrap closed'
    wrapElem.innerHTML = wrapTemplate
    document.body.appendChild(wrapElem)

    var dtKnobElement = document.querySelector('.dt-knob')
    var dtWrapElement = document.querySelector('.dt-wrap')

    dtKnobElement.addEventListener('click', function(event) {
        event.preventDefault()
        if (dtWrapElement.classList.contains('closed')) {
            dtWrapElement.classList.remove('closed')
        } else {
            dtWrapElement.classList.add('closed')
        }
    })

    function menuItemBuilder(item) {
        var imgStr = ""
        if (item.image) {
            // item.image = item.image.replace('http:', 'https:')
            imgStr = `<img src=${item.image} alt=${item.title} />`
        }
        // item.url = item.url.replace('http:', 'https:')
        return `
            <li>
                    	<a href="${item.url}" target="_blank">
			${imgStr}
                    <span>${item.title}</span>
                </a>
            </li>
        `
    }

    function buildMenuItems(items) {
        var menuStr = "<ul>"
        items.forEach(element => {
            menuStr += menuItemBuilder(element)
        })
        menuStr += "</ul>"
        document.querySelector('.dt-tray').innerHTML = menuStr
    }

    fetch(`${divineITSite}/remote_toolbar/`)
    .then(function(response) {
        return response.json()
    }).then(function (data) {
        if (data.status == 'success') {
            buildMenuItems(data.menu_items)
        }
    })
}
