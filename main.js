// تعاملات فرم یا کدهای JS/TS اینجا قرار می‌گیرند.

// انیمیشن جابجایی بین صفحات بدون ریلود
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      const currentForm = document.querySelector(".form-container");
      currentForm.classList.remove("animate-flip-in");
      currentForm.classList.add("animate-flip-out");
      setTimeout(() => {
        fetch(href)
          .then((response) => response.text())
          .then((html) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const newForm = doc.querySelector(".form-container");
            currentForm.innerHTML = newForm.innerHTML;
            currentForm.classList.remove("animate-flip-out");
            currentForm.classList.add("animate-flip-in");
            // به‌روزرسانی URL بدون ریلود
            history.pushState({}, "", href);
          });
      }, 400);
    });
  });
});
