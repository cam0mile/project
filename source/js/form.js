(function() {
  if (!("FormData" in window)) {
    return;
  }

  if (!document.querySelector(".form")) {
    return;
  }

  var form = document.querySelector("form");
  var elements = document.querySelectorAll(".counter");
  var area = document.getElementById("area");
  var template = document.querySelector("#contact-template").innerHTML;
  var number = 0;
  var div = 0;

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    var data = new FormData(form);

    request(data, function(response) {
      console.log(response);
      });
  });

  function request(data, fn) {

    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);

    xhr.addEventListener("readystatechange", function() {
      if (xhr.readyState == 4) {
        fn(xhr.responseText);
      }
    });

    xhr.send(data);
  }


  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }


  function initNumberField(parent) {
    var input = parent.querySelector("input");
    var minus = parent.querySelector(".counter__btn--minus");
    var plus = parent.querySelector(".counter__btn--plus");
    var min = parseInt(input.getAttribute('min')) || 0;
    var max = parseInt(input.getAttribute('max'));
    var id = input.getAttribute("id");
    var x;

    //дополнительное задание от наставника =)
    if (min>max) {
      x = min;
      min = max;
      max = x;
    }

    minus.addEventListener('click', function(){
      changeNumber(false);
      if (id === "amount-persons") {
        removeFields();
      }
    });

    plus.addEventListener('click', function(){
      changeNumber(true);
      if (id === "amount-persons") {
        addFields();
      }
    });

    function changeNumber(operation) {
      var value = parseInt(input.value);
      var result;
      if (operation) {
        result = value + 1;
        minus.disabled=false;
        if (!isNaN(max)){
          result = Math.min(result, max);
          if (value == max) {
            plus.disabled=true;
          }
        }
      } else {
        result = value - 1;
        result = Math.max(result, min);
        plus.disabled=false;
        if (value == min) {
          minus.disabled=true;
        }
      }
      input.value = result;
    }

    function removeFields() {
      var number = parseInt(input.value);
      var children = area.children;
      var childLength = children.length;


      if (childLength == min) {
        return;
      }
      if (number >= min) {
        area.removeChild(children[childLength - 1]);
      }
    }

    function addFields() {
      var number = parseInt(input.value);
      var children;
      var childLength;
      var html;
      var templateElement;

      if (number == max) {
        children = area.children;
        childLength = children.length;
        if (childLength == max) {
          return;
        }
      }
      if (number <= max) {
        html = Mustache.render(template, {
          "number": number
        });
        templateElement = document.createElement("div");
        templateElement.classList.add("contact-info");
        templateElement.innerHTML = html;

        area.appendChild(templateElement);
      }
    }
  }
})();








