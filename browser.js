const puppeteer = require("puppeteer")
const startBrowser = async () => {
    let browser 
    try {
        browser = await puppeteer.launch({
            // Có hiện chrome hay không, true là không
            headless: false,
            // Chrome sử dụng multiple layers của sandbox để tránh nội dung web không tin cậy, 
            // Nếu tin tưởng content thì set như dưới
            args: ["--disable-setuid-sandbox"],
            "ignoreHTTPSErrors": true
        })
    } catch (error) {
        console.log("Không tạo được browser => " + error);
    }
    return browser
}

module.exports = startBrowser