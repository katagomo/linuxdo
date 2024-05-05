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
        const links = document.querySelectorAll('article a');
        links.forEach(link => {
            // 检查链接是否已经有aff属性
            if (!link.hasAttribute('aff')) {
                if (/\?(aff=|a=|code=)|&(aff=|a=|code=)|regist#/.test(link.href)) {
                    const badge = document.createElement('span');
                    badge.className = 'badge badge-notification';
                    badge.title = '本链接可能为推广链接';
                    badge.textContent = '包含aff';
                    link.appendChild(badge);
                    // 设为已标记
                    link.setAttribute('aff', 'true');
                }
            }
        });
    }
    markAffiliateLinks();
    const observer = new MutationObserver(markAffiliateLinks);
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
})();
