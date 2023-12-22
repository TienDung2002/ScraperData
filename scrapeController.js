const scraper = require('./scraper');

const scrapeController = async (browserInstance) => {
    // Lấy link ở trang muốn cào data
    const url = 'https://gamikey.com/streaming';
    try {
        let browser = await browserInstance;
        // Gọi hàm cào ở scraper.js
        await scraper(browser, url);
    } catch (e) {
        console.log("Lỗi ở scrap controller" + e);
    }
};

module.exports = scrapeController;
