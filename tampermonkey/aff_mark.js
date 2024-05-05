// ==UserScript==
// @name         AFF标记
// @namespace    http://tampermonkey.net/
// @version      2024-05-05
// @description  Mark affiliate links with a badge
// @author       MatsuzakaSato
// @match        https://linux.do/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linux.do
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function markAffiliateLinks() {
        // 获取页面中所有的<a>标签
        const links = document.querySelectorAll('article a');
        links.forEach(link => {
            // 检查链接的href属性是否包含特定的推广参数
            if (/\?(aff=|a=|code=)|&(aff=|a=|code=)|regist#/.test(link.href)) {
                const badge = document.createElement('span');
                badge.className = 'badge badge-notification';
                badge.title = '本链接可能为推广链接';
                badge.textContent = '包含aff';
                link.appendChild(badge);
            }
        });
    }

    window.addEventListener('load', markAffiliateLinks);
})();
