let slideLength;
let sliderParent;
let btnPrev;
let btnNext;
let withSlideItem;
let heightSLideItem;
let currentIndexItem;

const defaultConfig = () => {
  currentIndexItem = 0;
  sliderParent = document.getElementsByClassName("myslider")[0];
  slideLength = sliderParent
    .getElementsByClassName("slider-list")[0]
    .getElementsByClassName("slider-item").length;
  withSlideItem = sliderParent.getBoundingClientRect().width;
};

// const resizeSwiper = () => {
//   new ResizeObserver(() => {
//     withSlideItem = sliderParent.getBoundingClientRect().width;
//     heightSLideItem = sliderParent.getBoundingClientRect().height;
//     const sliderList = sliderParent.getElementsByClassName("slider-list")[0];
//     console.log("sfsdfsd", sliderList)
//     const sliderItem = sliderList.getElementsByClassName("slider-item");
//     for (let i = 0; i < sliderItem.length; i++) {
//       sliderItem[i].style.width = withSlideItem + "px";
//       sliderItem[i].style.height = heightSLideItem + "px";
//     }
//     handleCurrentView(currentIndexItem);
//     sliderList.style.transitionDuration = "0ms";
//   }).observe(sliderParent);
// };

const resizeSwiper = () => {
  new ResizeObserver(entries => {

    const sliderParentRect = entries[0].contentRect;
    const withSlideItem = sliderParentRect.width;
    const heightSlideItem = sliderParentRect.height;

    const sliderList = sliderParent.querySelector(".slider-list");
    const sliderItems = sliderList.querySelectorAll(".slider-item");
    console.log("ggggggg", sliderItems)

    sliderItems.forEach(sliderItem => {
      sliderItem.style.width = withSlideItem + "px";
      sliderItem.style.height = heightSlideItem + "px";
    });

    handleCurrentView(currentIndexItem);
    // sliderList.style.transitionDuration = "0ms";
  }).observe(sliderParent);
};


const handleCurrentView = (index) => {
  
  const space = `-${index * withSlideItem}px`;
  console.log("space", space)
  const sliderList = sliderParent.getElementsByClassName("slider-list")[0];
  console.log("sliderList",sliderList.style)
  sliderList.style.transform = `translate3d(${space}, 0px, 0px)`;
  sliderList.style.transitionDuration = "400ms";
};

const handleActive = (index) => {
  if (index <= 0) {
    btnPrev.classList.add("btn_disabled");
  } else if (index >= slideLength - 1) {
    btnNext.classList.add("btn_disabled");
  } else {
    btnNext.classList.remove("btn_disabled");
    btnPrev.classList.remove("btn_disabled");
  }
};


const handleBtnNextPrev = (e) => {
  let newIndex;
  const isPrev = e === "prev";
  const isNext = e === "next";

  const disable = handleDisableBtn(isNext, isPrev);
  if (disable) return;

  if (isNext) {
    newIndex = currentIndexItem + 1;
    console.log("next-index", newIndex);
  } else if (isPrev) {
    newIndex = currentIndexItem - 1;
    console.log("prev-index", newIndex);
  } else {
    return;
  }
  currentIndexItem = newIndex;
  handleActive(newIndex);
  handleCurrentView(newIndex);
};

const handleDisableBtn = (isNext, isPrev) => {
  if (isPrev && currentIndexItem <= 0) {
    return true;
  }
  if (isNext && currentIndexItem >= slideLength - 1) {
    return true;
  }
  return false;
};

const bindingEventBtn = () => {
  btnPrev = sliderParent.getElementsByClassName("btnPrev")[0];
  btnNext = sliderParent.getElementsByClassName("btnNext")[0];
  btnPrev.onclick = () => handleBtnNextPrev("prev");
  btnNext.onclick = () => handleBtnNextPrev("next");
};

const initalSwiper = () => {
  defaultConfig();
  resizeSwiper();
  bindingEventBtn();
  handleActive(currentIndexItem);
  // handleSwiper();
  // handleTouch();
};

initalSwiper();
