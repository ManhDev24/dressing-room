import { ListChosenItem } from "../models/ListChosen.js";
import { callData } from "../utils/callData.js";
import { clotheModel } from "../models/clotheModel.js";

let clothData = new callData();
let navPills = [];
let tabPanes = [];
let dataArray = clothData.callData();
let listChosenItem = new ListChosenItem();

navPills = dataArray.navPills;
tabPanes = dataArray.tabPanes;

let renderNavPills = () => {
  let contentNavPills = "";
  let contentNavPanes = "";
  navPills.map((item) => {
    let activeClass = item.tabName === "tabTopClothes" ? "active" : "";
    let fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";
    contentNavPills += renderNavPillsItem(item, activeClass);
    contentNavPanes += `
      <div class="tab-pane container ${activeClass} ${fadeClass}" id="${item.tabName}">
        <div class="row">
          ${renderNavPanes(item.type, tabPanes)}
        </div>
      </div>`;
  });
  document.querySelector(".nav-pills").innerHTML = contentNavPills;
  document.querySelector(".tab-content").innerHTML = contentNavPanes;
};

let renderNavPillsItem = (pill, activeClass) => {
  return `
    <li class="nav-item">
        <a class="nav-link ${activeClass} btn-default"
        data-toggle="pill"
        href="#${pill.tabName}"
        >
        ${pill.showName}
        </a>
    </li>`;
};

let pushTabNameArray = (type, tabPanes) => {
  return tabPanes.filter(pane => pane.type === type);
};

let renderTabPanesItem = (arrayItem) => {
  return arrayItem.map(item => `
    <div class="col-md-3">
      <div class="card text-center">
        <img src="${item.imgSrc_jpg}" alt="${item.name}" />
        <h4><b>${item.name}</b></h4>
        <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}" data-imgsrcpng="${item.imgSrc_png}" class="changStyle">Try On</button>
      </div>
    </div>`).join('');
};

let renderNavPanes = (type, tabPanes) => {
  let arrayItem = pushTabNameArray(type, tabPanes);
  return renderTabPanesItem(arrayItem);
};

renderNavPills();

let findIndex = (type, listChosenItem) => {
  return listChosenItem.findIndex(item => item.type === type);
};

document.querySelectorAll(".changStyle").forEach((btnTry) => {
  btnTry.addEventListener("click", function () {
    let id = btnTry.getAttribute("data-id");
    let type = btnTry.getAttribute("data-type");
    let name = btnTry.getAttribute("data-name");
    let desc = btnTry.getAttribute("data-desc");
    let imgSrc_jpg = btnTry.getAttribute("data-imgsrcjpg");
    let imgSrc_png = btnTry.getAttribute("data-imgsrcpng");

    let chosenItem = new clotheModel(id, type, name, desc, imgSrc_jpg, imgSrc_png);
    let index = findIndex(chosenItem.type, listChosenItem.listArray);

    if (index !== -1) {
      listChosenItem.listArray[index] = chosenItem;
    } else {
      listChosenItem.addChosenItem(chosenItem);
    }

    renderItemForModel(listChosenItem.listArray);
  });
});

let renderItemForModel = (listChosen) => {
  listChosen.forEach(item => {
    switch (item.type) {
      case "topclothes":
        renderBikiniTop(item.imgSrc_png);
        break;
      case "botclothes":
        renderBikiniBottom(item.imgSrc_png);
        break;
      case "shoes":
        renderFeet(item.imgSrc_png);
        break;
      case "handbags":
        renderHandbags(item.imgSrc_png);
        break;
      case "necklaces":
        renderNecklace(item.imgSrc_png);
        break;
      case "hairstyle":
        renderHairstyle(item.imgSrc_png);
        break;
      case "background":
        renderBackground(item.imgSrc_png);
        break;
      default:
        break;
    }
  });
};

const renderBikiniTop = (img) => {
  let el = document.querySelector(".bikinitop");
  el.style.width = "500px";
  el.style.height = "500px";
  el.style.background = `url(${img})`;
  el.style.position = "absolute";
  el.style.top = "-9%";
  el.style.left = "-5%";
  el.style.zIndex = "3";
  el.style.transform = "scale(0.5)";
};

const renderBikiniBottom = (img) => {
  let el = document.querySelector(".bikinibottom");
  el.style.width = "500px";
  el.style.height = "1000px";
  el.style.background = `url(${img})`;
  el.style.position = "absolute";
  el.style.top = "-30%";
  el.style.left = "-5%";
  el.style.zIndex = "2";
  el.style.transform = "scale(0.5)";
};

const renderFeet = (img) => {
  let el = document.querySelector(".feet");
  el.style.width = "500px";
  el.style.height = "1000px";
  el.style.background = `url(${img})`;
  el.style.position = "absolute";
  el.style.top = "-37%";
  el.style.right = "-3.5%";
  el.style.zIndex = "1";
  el.style.transform = "scale(0.5)";
};

const renderHandbags = (img) => {
  let el = document.querySelector(".handbag");
  el.style.width = "500px";
  el.style.height = "1000px";
  el.style.background = `url(${img})`;
  el.style.position = "absolute";
  el.style.top = "-40%";
  el.style.right = "-3.5%";
  el.style.zIndex = "4";
  el.style.transform = "scale(0.5)";
};

const renderNecklace = (img) => {
  let el = document.querySelector(".necklace");
  el.style.width = "500px";
  el.style.height = "1000px";
  el.style.background = `url(${img})`;
  el.style.position = "absolute";
  el.style.top = "-35%";
  el.style.right = "-3.5%";
  el.style.zIndex = "4";
  el.style.transform = "scale(0.5)";
};

const renderHairstyle = (img) => {
  let el = document.querySelector(".hairstyle");
  el.style.width = "1000px";
  el.style.height = "1000px";
  el.style.background = `url(${img})`;
  el.style.position = "absolute";
  el.style.top = "-75%";
  el.style.right = "-57%";
  el.style.zIndex = "4";
  el.style.transform = "scale(0.15)";
};

const renderBackground = (img) => {
  document.querySelector(".background").style.backgroundImage = `url(${img})`;
};
