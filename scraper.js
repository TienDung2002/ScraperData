const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage()
        console.log('>> Mở tab mới ...');
        await page.goto(url)
        console.log('>> Đang truy cập vào: ' + url);
        /* tham số trong waitForSelector phải là id hoặc class của thẻ div cha 
        chứa toàn bộ trang web trong phần body */
        await page.waitForSelector('.flurry-container')
        console.log('>> Web đã load xong');
        resolve()
    } catch (error) {
        console.log('Lỗi ở scrapeCategory', error);
        reject(error)
    }
});

module.exports = scrapeCategory;
