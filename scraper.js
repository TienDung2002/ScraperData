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
        console.log('>> Đang mở trang chủ ...');
        await page.goto(url)
        console.log('>> Đang truy cập vào: ' + url);
        /* tham số trong waitForSelector phải là id hoặc class của thẻ div cha 
        chứa toàn bộ trang web trong phần body */
        await page.waitForSelector('#header')
        console.log('>> Trang chủ đã load xong');
        
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

const scraperDetail = (browser, url) => new Promise(async(resolve, reject) => {
    try {
        let newPage = await browser.newPage()
        console.log('>> Đang mở điều hướng mới...');
        await newPage.goto(url)
        console.log('>> Đang truy cập vào: ' + url);
        await newPage.waitForSelector('#categories-content')
        console.log('>> Đã load xong #categories-content...');

        // biến sẽ chứa data của nguyên 1 trang detail
        const scapeData = {} 
    
        // lấy header data
        const headerData = await newPage.$$eval('.head .title', (el) => {
            return {
                title: el[0].querySelector('h1').innerText
            }
        })
        scapeData.header = headerData

        // lấy content item trong 1 list-item
        const detailLinks = await newPage.$$eval('.content .product-item', (els) => {
            detailLinks = els.map((el) => {
                return el.querySelector('a').href
            })
            return detailLinks
        })
        console.log('>> Đã lấy xong tất cả các sản phẩm');

        // Hàm truy cập vào link từ lấy content (truy cập vào từng item đã lấy bên detailLink)
        const accessLink = async (link) => new Promise(async(resolve, reject) => {
            try {
                let openNewTab = await browser.newPage()
                await openNewTab.goto(link)
                console.log('>> Đang truy cập: ' + link);
                await openNewTab.waitForSelector('.comment-list')
                console.log('>> Đã load .comment-list');
                
                const images = await newPage.$$eval('.comment-item', (els) => {
                    return els.map(el => {
                        return {
                            name_user: el.querySelector(' .comment-info .comment-title > p').innerText,
                            comment: el.querySelector('comment-info .comment-content').innerText
                        }
                    })
                })
                console.log(images);

                await openNewTab.close()
                console.log('>> Đã đóng tab: ' + link);
                resolve()
            } catch (error) {
                console.log('Truy cập vào link từ content lỗi => ' + error);
                reject(error)
            }
        })
        
        // lấy link từ detailLinks và chạy hàm accessLink
        for(let link of detailLinks){
            await accessLink(link)
        }
        await browser.close()
        console.log('>> Trình duyệt đã đóng');
        resolve()
    } catch (error) {
        reject(error)
    }

})

module.exports = {
    scrapeCategory,
    scraperDetail
}
