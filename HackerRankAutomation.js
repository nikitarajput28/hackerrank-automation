//node HackerRankAutomation.js --url=https://www.hackerrank.com/ --config=config.json

//npm init -y
//npm install minimist
//npm install puppeteer

let minimist=require("minimist");
let fs=require("fs");
let puppeteer=require("puppeteer");

let args=minimist(process.argv);
let configJSON = fs.readFileSync(args.config, "utf-8");
let configJSO = JSON.parse(configJSON);
//console.log(config.userid);
//console.log(config.password);
//console.log(config.moderator);

//let browserKaPromise = puppeteer.launch({headless:false});//headless false means browser screen is seen
//browserKaPromise.then(function(browser){
   // let pagesKaPromise = browser.pages();
    //pagesKaPromise.then(function(pages){
        //let urlOpenKaPromise = pages[0].goto(args.url);
        //urlOpenKaPromise.then(function(urlOpen){
           // let browserCloseKaPromise = browser.close();
           // browserCloseKaPromise.then(function(){
            //    console.log("Browser closed.");
            //})
        //})
    //})
//})

async function run(){
    //start the browser
    let browser =await puppeteer.launch({
        headless:false,
         args: [
             '--start-maximized'//show full window
         ],
             defaultViewport: null
        });
    //get the tab
    let pages = await browser.pages();
    let page = pages[0];
    //open the url
    await page.goto(args.url);
    //wait and then click on login on page 1
    await page.waitForSelector("a[data-event-action='Login']");
    await page.click("a[data-event-action='Login']");
    
    //wait and then click on login on page 2
    await page.waitForSelector('div.fl-button-width-auto >a.fl-button');
    await page.click('div.fl-button-width-auto >a.fl-button');

    //type userid and password
    //await page.waitForSelector("input[name='username']");
    //await page.type("input[name='username']", configJSO.userid, {delay: 30});
    //await page.waitForSelector("input[name='password']");
    //await page.type("input[name='password']", configJSO.password, {delay: 30});
    await page.waitForSelector("#input-1",{visible:true});
    await page.type("#input-1", configJSO.userid, {delay: 30});
    await page.waitForSelector("#input-2",{visible:true});
     await page.type("#input-2", configJSO.password, {delay: 30});

     //press click on page 3
    await page.waitForSelector("button.auth-button");
    await page.click("button.auth-button");
    //click on compete
    await page.waitForSelector("a.nav-link.contests");
    await page.click("a.nav-link.contests");
    //click on manage contests
    await page.waitForSelector("a.text-link.filter-item");
    await page.click("a.text-link.filter-item");
    //click on first contest
    await page.waitForSelector("p.mmT");
    await page.click("p.mmT");

    await page.waitFor(3000);

    //click on moderators tab
    await page.waitForSelector("li[data-tab='moderators']");
    await page.click("li[data-tab='moderators']");

    //type in moderator
    await page.waitForSelector("input#moderator.wide.ui-autocomplete-input");
    await page.type("input#moderator.wide.ui-autocomplete-input", configJSO.moderators, {delay: 50});
    
    await page.keyboard.press("Enter");

    //await browser.close();
   // console.log("Browser closed."
    
}

run();