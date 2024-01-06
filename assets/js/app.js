(function (window, document, $, undefined) {
  "use strict";
  var Init = {
    i: function (e) {
      Init.s();
      Init.methods();
    },
    s: function (e) {
      (this._window = $(window)),
        (this._document = $(document)),
        (this._body = $("body")),
        (this._html = $("html"));
    },
    productPrices: {
      'T-Shirt': 40,
      'FCDK T-Shirt': 69,
      'FCDK Scarf': 46,
      'FCDK Gradient': 69,
    },
    methods: function (e) {
      Init.w();
      Init.showAddToCartMessage();
      Init.BackToTop();
      Init.preloader();
      Init.searchInput();
      Init.quantityHandle();
      Init.updateCartTotal();
      Init.updateCheckoutTotal();
      Init.sizeChange();
      Init.colorChange();
      Init.showReview();
      Init.initializeSlick();
      Init.formValidation();
      Init.contactForm();
      Init.videoPlay();
      Init.modalPopup();
      Init.addToCart();
    },
    w: function (e) {
      this._window.on("load", Init.l).on("scroll", Init.res);
    },
    showAddToCartMessage: function(productName) {
      const message = `<div class="add-to-cart-message"><p>${productName} has been added to your cart!</p></div>`;
      $('body').append(message);
      $('.add-to-cart-message').fadeIn().delay(2000).fadeOut('slow', function() {
        $(this).remove();
      });
    },
    BackToTop: function () {
      var btn = $("#backto-top");
      $(window).on("scroll", function () {
        if ($(window).scrollTop() > 300) {
          btn.addClass("show");
        } else {
          btn.removeClass("show");
        }
      });
      btn.on("click", function (e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: 0,
          },
          "300"
        );
      });
    },
    preloader: function () {
      setTimeout(function () { $('#preloader').hide('slow') }, 2000);
    },
    searchInput: function(){
      if ($(".input-box").length) {
          let inputBox = document.querySelector('.input-box'),
          searchIcon = document.querySelector('.search'),
          closeIcon = document.querySelector('.close-icon');
        
          // ---- ---- Open Input ---- ---- //
          searchIcon.addEventListener('click', () => {
            inputBox.classList.add('open');
          });
          // ---- ---- Close Input ---- ---- //
          closeIcon.addEventListener('click', () => {
            inputBox.classList.remove('open');
          });
      }
    },
    showReview: function(){
      $('.review-btn').on('click',function(){
        var id = $(this).attr('data-atr');
        $('.review-block').hide('slow');
        $('#'+id).show('slow');
        console.log(id)
      })
    },
    quantityHandle: function () {
      var self = this;
  
      $('.cart-items-container').on('click', '.decrement, .increment', function () {
          var qtyInput = $(this).closest(".quantity-wrap").find(".number");
          var qtyVal = parseInt(qtyInput.val());
  
          if ($(this).hasClass("decrement")) {
              qtyInput.val(qtyVal > 1 ? qtyVal - 1 : 1);
          } else {
              qtyInput.val(qtyVal + 1);
          }
  
          self.updateCartTotal();
      });
  },
    updateCartTotal: function () {
      let subtotal = 0;
      let totalItems = 0;
    
      $('.cart-item').each(function () {
        const productName = $(this).find('.name').text();
        const quantity = parseInt($(this).find('.number').val());
        subtotal += (Init.productPrices[productName] || 0) * quantity;
        totalItems += quantity;
      });
    
      let shippingCost = 0; // initialize shippingCost to 0

      if (totalItems > 0) {
        shippingCost = 10; // default base shipping cost
        if (totalItems > 4 && totalItems <= 8) {
          shippingCost += 5;
        } else if (totalItems > 8) {
          shippingCost += 10;
        }
      }
    
      const total = subtotal + shippingCost; // resulted value
    
      $('.cart-subtotal p:nth-child(2)').text(`$${subtotal.toFixed(2)}`);
      $('.cart-shipping p:nth-child(2)').text(`$${shippingCost.toFixed(2)}`);
      $('.cart-total h5:nth-child(2)').text(`$${total.toFixed(2)}`);
    },
    updateCheckoutTotal: function () {
      let subtotal = 0;
      let totalItems = 0;
    
      // calculate subtotal and count items
      $('.cart-total .checkout-item').each(function () {
        if ($(this).find('p').length > 0) {
          const itemText = $(this).find('p:first-child').text();
          const quantity = itemText in Init.productPrices ? 1 : 0;
          totalItems += quantity;
          const itemPrice = Init.productPrices[itemText] || 0;
          subtotal += itemPrice * quantity;
        }
      });
    
      let shippingCost = 10; // default
      if (totalItems > 4 && totalItems <= 8) {
        shippingCost += 5;
      } else if (totalItems > 8) {
        shippingCost += 10;
      }
    
      const total = subtotal + shippingCost;
    
      // update HTML with new values
      $('.cart-total .checkout-header').find('h5:last-child').text(`$${subtotal.toFixed(2)}`);
      $('.cart-total .checkout-shipping').find('h5:last-child').text(`$${shippingCost.toFixed(2)}`);
      $('.cart-total .checkout-total').find('h5:last-child').text(`$${total.toFixed(2)}`);
    },
    initializeSlick: function (e) {
      if ($(".teams-slider").length) {
        $(".teams-slider").slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: '0',
          infinite: true,
          cssEase: 'linear',
          autoplay: false,
          autoplaySpeed: 3000,
        });
      }
      if ($(".product-slider").length) {
        $(".product-slider").slick({
          infinite: true,
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: false,
          centerPadding: '0',
          infinite: true,
          cssEase: 'linear',
          autoplay: true,
          autoplaySpeed: 2000,
          responsive: [
            {
              breakpoint: 1599,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2,
                arrows: false,
              },
            },
            {
              breakpoint: 650,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }

    },
    videoPlay: function () {
      $(".video .play-btn").on("click", function () {
        $(".video .img-box").hide("slow");
        $(".video .video-box").show("slow");
      });
    },
    sizeChange: function () {
      $('.size li').on('click', function(){
        $('li').removeClass("active");
        $(this).addClass("active");
      });
    },
    colorChange: function () {
      $('.color li').on('click', function(){
        $('li').removeClass("coloractive");
        $(this).addClass("coloractive");
      });
    },
    formValidation: function () {
      if ($(".contact-form").length) {
        $(".contact-form").validate();
      }
    },
    contactForm: function () {
      $(".contact-form").on("submit", function (e) {
          e.preventDefault();
        if ($(".contact-form").valid()) {
          var _self = $(this);
          _self
            .closest("div")
            .find('button[type="submit"]')
            .attr("disabled", "disabled");
          var data = $(this).serialize();
          $.ajax({
            url: "./assets/mail/contact.php",
            type: "post",
            dataType: "json",
            data: data,
            success: function (data) {
              $(".contact-form").trigger("reset");
              _self.find('button[type="submit"]').removeAttr("disabled");
              if (data.success) {
                document.getElementById("message").innerHTML =
                  "<h3 class='bg-success text-white p-3 mt-3'>Email Sent Successfully</h3>";
              } else {
                document.getElementById("message").innerHTML =
                  "<h3 class='bg-success text-white p-3 mt-3'>There is an error</h3>";
              }
              $("#message").show("slow");
              $("#message").slideDown("slow");
              setTimeout(function () {
                $("#message").slideUp("hide");
                $("#message").hide("slow");
              }, 3000);
            },
          });
        } else {
          return false;
        }
      });
    },
    modalPopup: function () {
      $('.modal-popup').on('click',function(){
        $('.newsletter-popup').animate({ opacity: '1', }, 'slow', function () {
          $(this).css('z-index', 999);
        })
      })
      $('.close').on('click',function(){
        $('.newsletter-popup').animate({ opacity: '0', }, 'slow', function () {
          $(this).css('z-index', -10);
        })
      })
    },
    addToCart: function(productName, price, imagePath) {
      // Validate product details
      if (!productName || !price || !imagePath) {
          console.error("Invalid product details:", productName, price, imagePath);
          return; // Do not add the item if any detail is missing
      }
  
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      let found = cart.find(item => item.name === productName);
      if (found) {
          found.quantity += 1;
      } else {
          cart.push({ name: productName, price: price, quantity: 1, image: imagePath });
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      this.showAddToCartMessage(productName);
  },
    loadCartItems: function() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.forEach(item => {
          if (item && item.name && item.price && item.quantity && item.image) {
              // Create and append the cart item HTML only if the item is valid
              const cartItemHtml = `
                  <div class="cart-item">
                      <img src="${item.image}" alt="${item.name}">
                      <div class="about-product">
                          <a href="product-detail.html" class="name">${item.name}</a>
                          <div class="c-quantity">
                              <span class="title">Quantity:</span> 
                              <div class="quantity quantity-wrap">
                                  <input class="decrement" type="button" value="-" >
                                  <input type="text" name="quantity" value="${item.quantity}" maxlength="2" size="1" class="number">
                                  <input class="increment" type="button" value="+" >
                              </div>
                          </div>
                      </div>
                      <h5 class="price">$${item.price}</h5>
                  </div>
              `;
              $('.cart-items-container').append(cartItemHtml);
          } else {
              console.error("Invalid cart item:", item);
          }
      });
      Init.updateCartTotal();
    },
  }
  Init.i();

  $(document).on('click', '.cta-2', function(event) {
    event.preventDefault();

    const productCard = $(this).closest('.product-card');
    const productName = productCard.find('.title').text();
    const productPrice = productCard.find('.price').text().replace('$', '');
    let imagePath = productCard.find('img').attr('src');

    imagePath = imagePath.replace('products/', 'products/cart/');

    console.log(productName, productPrice, imagePath);

    Init.addToCart(productName, productPrice, imagePath);
  });

  $(document).ready(function() {
    if (window.location.href.indexOf('cart.html') > -1) {
        Init.loadCartItems();
    }
    if (window.location.href.indexOf('checkout.html') > -1) {
        Init.loadCartItems();
    }
  });

  $('<style>')
    .prop('type', 'text/css')
    .html(`\
    .add-to-cart-message {\
      position: fixed;\
      bottom: 20px;\
      right: 20px;\
      background-color: #28a745;\
      color: white;\
      padding: 10px;\
      border-radius: 5px;\
      display: none;\
      z-index: 1000;\
    }`)
    .appendTo('head');
  
})(window, document, jQuery);
