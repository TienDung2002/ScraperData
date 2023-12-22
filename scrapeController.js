const scraper = require('./scraper');

const scrapeController = async (browserInstance) => {
    // Lấy link ở trang muốn cào data
    const url = 'https://hungmobile.vn/';
    const indexs = [1, 2 ,3, 4, 5, 6, 7, 8]
    try {
        let browser = await browserInstance;
        // Gọi hàm cào ở scraper.js
        let categories = await scraper.scrapeCategory(browser, url);
        const selectedCategories = categories.filter((category, index) => indexs.some(i => i === index))

        await scraper.scraperDetail(browser, selectedCategories[0].link)

    } catch (e) {
        console.log("Lỗi ở scrapController => " + e);
    }
};

module.exports = scrapeController;
