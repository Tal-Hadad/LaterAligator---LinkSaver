const inputEl = document.getElementById("input");
const saveInputBtn = document.getElementById("saveInput");
const saveTabBtn = document.getElementById("saveTab");
const clearAllBtn = document.getElementById("clearAll");
const ulEl = document.getElementById("ul");

let links = JSON.parse(localStorage.getItem("links")) || [];

function renderLinks() {
  ulEl.innerHTML = "";

  links.forEach(function (link, index) {
    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = link;
    a.textContent = link;
    a.target = "_blank";
    a.rel = "noopener noreferrer";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete link");
    deleteBtn.innerHTML = `<span class="material-symbols-outlined">close</span>`;

    deleteBtn.addEventListener("click", function () {
      links.splice(index, 1);
      localStorage.setItem("links", JSON.stringify(links));
      renderLinks();
    });

    li.appendChild(a);
    li.appendChild(deleteBtn);
    ulEl.appendChild(li);
  });
}

renderLinks();

saveInputBtn.addEventListener("click", function () {
  if (
    !inputEl.value.startsWith("http://") &&
    !inputEl.value.startsWith("https://")
  ) {
    inputEl.value = "https://" + inputEl.value;
  }

  links.push(inputEl.value);
  localStorage.setItem("links", JSON.stringify(links));
  renderLinks();
  inputEl.value = "";
});

saveTabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0].url;
    links.push(currentTab);
    localStorage.setItem("links", JSON.stringify(links));
    renderLinks();
  });
});

clearAllBtn.addEventListener("dblclick", function () {
  links = [];
  ulEl.innerHTML = "";
  localStorage.removeItem("links");
});
