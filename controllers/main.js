import { ListChosenItem } from "../models/ListChosen.js";
import { clallData } from "../utils/callData.js";

let clothData = new clallData();
let navPills = [];
let tabPanes = [];
let dataArray = clothData.callData();
let listChosenItem = new ListChosenItem();

navPills = dataArray.navPills;
console.log("navPills: ", navPills);
tabPanes = dataArray.tabPanes;

let renderNavPills = () => {
  let contentNavPills = "";
  let contentNavPanes = "";
  navPills.map((item) => {
    let activeClass = item.tabName === "tabTopClothes" ? "active" : "";
    let fadeClass = item.tabName !== "tabTopClothes" ? "fade" : "";
    contentNavPills += renderNavPillsItem(item, activeClass);
    contentNavPanes += `<div class="tab-pane containner ${activeClass} ${fadeClass}" id="${
      item.tabName
    }">
    <div>
    <div class="row">
    ${renderNavPanes(item.type, tabPanes)}
      </div>
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
  let arrayItem = [];
  tabPanes.map((panes) => {
    if (panes.type === type) {
      arrayItem.push(panes);
    }
  });
  return arrayItem;
};
let renderTabPanesItem = (arrayItem) => {
  let tdContent = "";
  arrayItem.forEach((item) => {
    tdContent += `<div class="col-md-3">
        <div class="card text-center">
          <img
            src="${item.imgSrc_jpg}"
          />
          <h4><b>${item.name}</b></h4>
          <button data-id="${item.id}" data-type="${item.type}" data-name="${item.name}" data-desc="${item.desc}" data-imgsrcjpg="${item.imgSrc_jpg}"  data-imgsrcpng="${item.imgSrc_png}" class="changStyle">Thử đồ</button>
        </div>
      </div>`;
  });
  return tdContent;
};

let renderNavPanes = (type, tabPanes) => {
  let arrayItem = [];
  let elmItem = "";
  switch (type) {
    case "topclothes":
      arrayItem = pushTabNameArray(type, tabPanes);
      elmItem = renderTabPanesItem(arrayItem);
      break;
    case "botclothes":
      arrayItem = pushTabNameArray(type, tabPanes);
      elmItem = renderTabPanesItem(arrayItem);
      break;
    case "shoes":
      arrayItem = pushTabNameArray(type, tabPanes);
      elmItem = renderTabPanesItem(arrayItem);
      break;
    case "handbags":
      arrayItem = pushTabNameArray(type, tabPanes);
      elmItem = renderTabPanesItem(arrayItem);
      break;
    case "necklaces":
      arrayItem = pushTabNameArray(type, tabPanes);
      elmItem = renderTabPanesItem(arrayItem);
      break;
    case "hairstyle":
      arrayItem = pushTabNameArray(type, tabPanes);
      elmItem = renderTabPanesItem(arrayItem);
      break;
    case "background":
      arrayItem = pushTabNameArray(type, tabPanes);
      elmItem = renderTabPanesItem(arrayItem);
      break;
    default:
      break;
  }
  return elmItem;
};

renderNavPills();

let findIndex = (type, listChosenItem) => {
  let indexType = -1;
  listChosenItem.forEach((item, index) => {
    if (item.type === type) {
      indexType = index;
    }
  });
  return indexType;
};

let btnTryList = Array.from(document.querySelectorAll(".changStyle"));
btnTryList.forEach((btnTry, index) => {
  btnTry.addEventListener("click", function () {
    let id = btnTry.getAttribute("data-id");
    let type = btnTry.getAttribute("data-type");
    let name = btnTry.getAttribute("data-name");
    let desc = btnTry.getAttribute("data-desc");
    let imgsrcjpg = btnTry.getAttribute("data-imgsrcjpg");
    let imgsrcpng = btnTry.getAttribute("data-imgsrcpng");

    let chosenItem = new ListChosenItem(
      id,
      type,
      name,
      desc,
      imgsrcjpg,
      imgsrcpng
    );
    if (listChosenItem.listArray) {
      let index = findIndex(chosenItem.type, listChosenItem.listArray);

      if (index !== -1) {
        //đã tồn tại type
        listChosenItem.listArray[index] = chosenItem;
      } else {
        listChosenItem.addChosenItem(chosenItem);
      }
    }
    renderItemForModel(listChosenItem.listArray);
  });
});

let renderItemForModel = (listChosen) => {
  if (listChosen.length > 0 && listChosen) {
    listChosen.forEach((item, index) => {
      if (item.type === "topclothes") {
        renderBikiniTop(item.imgsrc_png);
      }
      if (item.type === "botclothes") {
        renderBikiniBottom(item.imgsrc_png);
      }
      if (item.type === "shoes") {
        renderFeet(item.imgsrc_png);
      }
      if (item.type === "handbags") {
        renderHandbags(item.imgsrc_png);
      }
      if (item.type === "necklaces") {
        renderNecklace(item.imgsrc_png);
      }
      if (item.type === "hairstyle") {
        renderHairstyle(item.imgsrc_png);
      }
      if (item.type === "background") {
        renderBackground(item.imgsrc_png);
      }
    });
  }
};
let renderBikiniTop = (img) => {
  document.querySelector(".bikinitop").style.width = "500px";
  document.querySelector(".bikinitop").style.height = "500px";
  document.querySelector(".bikinitop").style.background = `url(${img})`;
  document.querySelector(".bikinitop").style.position = "absolute";
  document.querySelector(".bikinitop").style.top = "-9%";
  document.querySelector(".bikinitop").style.left = "-5%";
  document.querySelector(".bikinitop").style.zIndex = "3";
  document.querySelector(".bikinitop").style.transform = "scale(0.5)";
};
let renderBikiniBottom = (img) => {
  document.querySelector(".bikinibottom").style.width = "500px";
  document.querySelector(".bikinibottom").style.height = "1000px";
  document.querySelector(".bikinibottom").style.background = `url(${img})`;
  document.querySelector(".bikinibottom").style.position = "absolute";
  document.querySelector(".bikinibottom").style.top = "-30%";
  document.querySelector(".bikinibottom").style.left = "-5%";
  document.querySelector(".bikinibottom").style.zIndex = "2";
  document.querySelector(".bikinibottom").style.transform = "scale(0.5)";
};

let renderFeet = (img) => {
  document.querySelector(".feet").style.width = "500px";
  document.querySelector(".feet").style.height = "1000px";
  document.querySelector(".feet").style.background = `url(${img})`;
  document.querySelector(".feet").style.position = "absolute";
  document.querySelector(".feet").style.top = "-37%";
  document.querySelector(".feet").style.right = "-3.5%";
  document.querySelector(".feet").style.zIndex = "1";
  document.querySelector(".feet").style.transform = "scale(0.5)";
};
let renderHandbags = (img) => {
  document.querySelector(".handbag").style.width = "500px";
  document.querySelector(".handbag").style.height = "1000px";
  document.querySelector(".handbag").style.background = `url(${img})`;
  document.querySelector(".handbag").style.position = "absolute";
  document.querySelector(".handbag").style.top = "-40%";
  document.querySelector(".handbag").style.right = "-3.5%";
  document.querySelector(".handbag").style.zIndex = "4";
  document.querySelector(".handbag").style.transform = "scale(0.5)";
};

let renderNecklace = (img) => {
  document.querySelector(".necklace").style.width = "500px";
  document.querySelector(".necklace").style.height = "1000px";
  document.querySelector(".necklace").style.background = `url(${img})`;
  document.querySelector(".necklace").style.position = "absolute";
  document.querySelector(".necklace").style.top = "-35%";
  document.querySelector(".necklace").style.right = "-3.5%";
  document.querySelector(".necklace").style.zIndex = "4";
  document.querySelector(".necklace").style.transform = "scale(0.5)";
};
let renderHairstyle = (img) => {
  document.querySelector(".hairstyle").style.width = "1000px";
  document.querySelector(".hairstyle").style.height = "1000px";
  document.querySelector(".hairstyle").style.background = `url(${img})`;
  document.querySelector(".hairstyle").style.position = "absolute";
  document.querySelector(".hairstyle").style.top = "-75%";
  document.querySelector(".hairstyle").style.right = "-57%";
  document.querySelector(".hairstyle").style.zIndex = "4";
  document.querySelector(".hairstyle").style.transform = "scale(0.15)";
};
let renderBackground = (img) => {
  document.querySelector(".background").style.backgroundImage = `url(${img})`;
};
