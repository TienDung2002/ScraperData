/* Hàm này để cào data trên trang chủ (ở đây là lấy link điều hướng của từng item trên thanh nav)
 Ví dụ lấy thanh nav: từ https://hungmobile.vn/ gồm:
Điện thoại: 
...
Xiaomi: https://hungmobile.vn/dien-thoai/xiaomi
Realme: https://hungmobile.vn/dien-thoai/realme
Lenovo: https://hungmobile.vn/dien-thoai/lenovo
và ...

*/
const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage()
        console.log('>> Đang mở tab mới ...');
        await page.goto(url)
        console.log('>> Đang truy cập vào: ' + url);
        /* tham số trong waitForSelector phải là id hoặc class của thẻ div cha 
        chứa toàn bộ trang web trong phần body */
        await page.waitForSelector('#header')
        console.log('>> Web đã load xong');
        
        const dataCategory = await page.$$eval('.navigation .nav-item', els => {
            dataCategory = els.map(el => {
                return {
                    // category: el.querySelector('a').innerText,
                    // title: el.querySelector('a').title,
                    link: el.querySelector('a').href,
                    img_link: el.querySelector('img').src,
                    name: el.querySelector('.name').innerText
                }
            })
            return dataCategory
        })
        // console.log(dataCategory);
        await page.close()
        console.log('>> Tab đã đóng');

        resolve(dataCategory)
    } catch (error) {
        console.log('Lỗi ở scrapeCategory => ', error);
        reject(error)
    }
});

/* Hàm này để cào data từng link khi lấy được từ thanh nav ở trang chủ ()
Xiaomi: https://hungmobile.vn/dien-thoai/xiaomi
*/

const scraper = () => new Promise

module.exports = scrapeCategory;
