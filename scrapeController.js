const scraper = require('./scraper');

const scrapeController = async (browserInstance) => {
    // Lấy link ở trang muốn cào data
    const url = 'https://hungmobile.vn/';
    const indexs = [1, 2 ,3, 4, 5, 6, 7, 8]
    try {
        let browser = await browserInstance;
        // Gọi hàm cào ở scraper.js
        let categories = await scraper(browser, url);
        const selectedCategories = categories.filter((category, index) => indexs.some(i => i === index))
        console.log(selectedCategories);

    } catch (e) {
        console.log("Lỗi ở scrapController => " + e);
    }
};

module.exports = scrapeController;
