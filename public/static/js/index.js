(function () {
  const button = document.querySelector('*[data-js="js-button"]');

  button.addEventListener("click", function onClick(evt) {
    alert("Javascript is working!");
  });
})();
