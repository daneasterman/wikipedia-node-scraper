$(function() {
  getJSON();
  // callbackFunc();
});
  
  function getJSON() {
    $.getJSON( "data/israel-arab.json", function( data ) {
      // console.log(data);
      appendInfo(data);
      // Wait for data to be appended first
      callbackFunc();
    });
  }

  function appendInfo(data) {
    data.forEach(function (obj) {
      $('ul').append('<li><div class="content"><time>'+obj.title+'</time><p class="first-para" >'+obj.para+'</p></div></div></li>');
      // <img class="thumb" id="thumb" src="'+obj.thumb+'">
    });
  }

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    var items = document.querySelectorAll(".timeline li");
    // var items = $('.timeline li');

    for (var i = 0; i < items.length; i++) {
      if ( isElementInViewport(items[i]) ) {
        items[i].classList.add("in-view");
        // items[i].addClass("in-view");

      }
    }
  }

  // listen for events
  // window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);

// });