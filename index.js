var Crawler = require("crawler");

var c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      let products = [];
      var $ = res.$;

      products = setProducts($, products);

      console.log(products);
      console.log(products.length);
    }
    done();
  }
});

function setProducts($, products) {
  //set name and id of product
  $(".products-wp li a").each(function(i, element) {
    const $element = $(element);
    let idCurrent = $element
      .attr("data-ui-name")
      .match(/aues\.product\.(.*)\.li/)[1];
    let nameCurrent = $element.attr("href").match(/(.*)\/(.*)\/(.*)\/(.*)/)[2];
    const product = {
      name: nameCurrent,
      id: idCurrent
    };
    products.push(product);
  });

  //set price of product
  $(".info-container .price .price-new").each(function(i, element) {
    const $element = $(element);
    let priceCurrent = $element.attr("data-csscontent");
    products[i].price = priceCurrent;
  });

  return products;
}

// Queue a list of URLs
c.queue([
  "https://www.obi.de/eisenwaren-beschlaege/schrauben/c/2440",
  "https://www.obi.de/elektrogeraete/kochfelder/c/4442",
  "https://www.obi.de/moebel/betten/c/2225"
]);
