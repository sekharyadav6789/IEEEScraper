let request = require("request");
let cheerio = require("cheerio");
const puppeteer = require("puppeteer");
let cTab;
(async function fn() {
    try {
        let browserOpenPromise = puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ["--start-maximized"]
        });
        let browser = await browserOpenPromise;
        let allTabsArr = await browser.pages();
        cTab = allTabsArr[0];
        await cTab.goto("https://ieeexplore.ieee.org/Xplore/home.jsp");
        await cTab.click(".cc-btn.cc-dismiss");
        await cTab.waitForSelector("input[type='text']", {visible: true});
        await cTab.type("input[type='text']","Renewable",{delay: 100});
        await cTab.click(".fa.fa-search");
        let currentPageUrl = await cTab.url();
        console.log(currentPageUrl);
        await cTab.waitForSelector(".col.result-item-align", {visible: true});
        //await cTab.waitForSelector(".stats-Pagination_1.active",{visible: true});
        //await cTab.click(".col.result-item-align");
        // function ConsoleWalaFn(){
        //     let allElem=document.querySelectorAll(".col.result-item-align");
        //     console.log(allElem.length);
        //     let linksArr=[];
        //     for(let i=0;i<allElem.length;i++)
        //     {
        //         linksArr.push(allElem[i].getAttribute("href"));
        //     }
        //     return linksArr;
        // }
        // let linkArrPromise=cTab.evaluate(ConsoleWalaFn);
        // console.log(linkArrPromise.length);
    } catch (err) {
        console.log(err);
    }
})();