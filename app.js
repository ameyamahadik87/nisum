class UI {
  addProductsToList(product) {
    const list = document.getElementById("product-list");
    // Create element
    const div = document.createElement("div");
    div.className = "product";
    // Insert cols
    div.innerHTML = `
      <div class="product-wrap">
        <div class="img-container" data-prod-id="${product.id}" data-toggle="modal" data-target="#myModal">
          <a href="#myGallery" prodID="${product.id}" class="showCarousel">
            <img src="${product.hero.href}" alt="" />
          </a>
        </div>
        <h5 class="product-title"><a href="javascript:void(0);">${product.name}</a></h5>
        <p class="clearfix"><span class="product-price"><strong>Price: <span>$</span>${
      product.priceRange.selling.high
    }</strong> <span class="strikethru">$${product.priceRange.regular.high} </span></span> <a href="" class="buy-now-btn btn btn-primary"> Add to Cart </a></p>
      </div>
    `;

    list.appendChild(div);
  }

  generateCarouselList(prodId){
    const products = Store.getProduct();
    products.groups.forEach(function(product) {
      if(prodId === product.id){
        console.log(product.images);
        product.images.forEach(function(image, index) {
          const list = document.querySelector(".carousel .carousel-inner");
          const title = document.querySelector("#galleryTitle");
          title.innerHTML = product.name;
          if(index == 0 ){
            list.innerHTML = "";
          }
          // Create element
          const div = document.createElement("div");
          div.className = index == 0 ? "item active" : "item";
          // Insert cols
          div.innerHTML = `
            <img src="${image.href}" alt="item0">
          `;

          list.appendChild(div);
        });
      }
    });
  }
}
// Local Storage Class
class Store {
  static getProduct() {
    let products;
    if (localStorage.getItem("products") === null) {
      products = [];
    } else {
      products = JSON.parse(localStorage.getItem("products"));
    }

    return products;
  }

  static displayProduct() {
    const products = Store.getProduct();
    // console.log("products>>", products);

    products.groups.forEach(function(product) {
      const ui = new UI();

      // Add product to UI
      ui.addProductsToList(product);
    });
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayProduct);

// On Modal Show generate image list for carousel
$("#myModal").on('show.bs.modal', function(e){
  let prodId = $(e.relatedTarget).data('prod-id');
  const ui = new UI();
  ui.generateCarouselList(prodId);
});

