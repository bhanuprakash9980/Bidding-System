const axios = require('axios');
const cheerio = require('cheerio');

async function amazon(val) {
  let count = 0;
  let sum = 0.0;
  await axios.get('https://www.amazon.in/s?k=' + val).then((response) => {
    let html = response.data;
    const $ = cheerio.load(html);
    $('[data-component-type=s-search-result]').each((i, el) => {
      if (count === 5) return false;
      let price = $(el).find('.a-price-whole').html();
      if (price != null) {
        count++;
        price = price.replace(/,/g, '');
        sum += parseInt(price);
      }
    });
    sum = sum / count;
  });
  return sum;
}

async function average(str) {
  var sum = await amazon(str);

  return sum;
}

module.exports = average;
