let double11Data = function () {};
// 活動頁資料tab名稱
double11Data.prototype.eventName = '';
// get page data first (不用動)
double11Data.prototype.getPageSheetData = async function () {
  // 使用真實的 API 資料
  const apiUrl = `https://www.bibian.co.jp/api/events/bbn_sheet.php?act=getgooglesheetcache&cachefilename=${this.eventName}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    // 如果 API 失敗，回傳備用的 mock 資料
    return {
      '20250701_bid': [
        {
          position: 'navigator',
          position_id: '',
          blockType: 'nav',
          section_title: '',
          type: '',
          group: '',
          group_name: '',
          hashtag: '',
          start: '',
          end: '',
          title: '新手必買',
          image: '',
          description: '',
          url: '#section01',
          label: '',
          ori_price: '',
          price: '',
          ribbon: '',
          scopename: 'bid_202507',
          eventvalue: 'nav_新手必買'
        },
        {
          position: 'navigator',
          position_id: '',
          blockType: 'nav',
          section_title: '',
          type: '',
          group: '',
          group_name: '',
          hashtag: '',
          start: '',
          end: '',
          title: 'TOP10',
          image: '',
          description: '',
          url: '#section02',
          label: '',
          ori_price: '',
          price: '',
          ribbon: '',
          scopename: 'bid_202507',
          eventvalue: 'nav_TOP10'
        },
        {
          position: 'navigator',
          position_id: '',
          blockType: 'nav',
          section_title: '',
          type: '',
          group: '',
          group_name: '',
          hashtag: '',
          start: '',
          end: '',
          title: '活動規則',
          image: '',
          description: '',
          url: '#ruleSection',
          label: '',
          ori_price: '',
          price: '',
          ribbon: '',
          scopename: 'bid_202507',
          eventvalue: 'nav_活動規則'
        }
      ]
    };
  }
}
double11Data.prototype.createSection = function (info) {
    const elDom = document.createElement("section");
    elDom.id = info.position_id;
    elDom.classList.add('flex', 'w-full', 'flex-col');
    return elDom;
}
double11Data.prototype.renderPage = function (info, blockType) {//google_sheet抓的資料
    const fragment = document.createDocumentFragment();
    const mainDom = document.querySelector("main");
    const dataArr = info.data;
    if (blockType === "header") {
        console.log( dataArr);
        const headerEl = document.querySelector("#pageMainHeader");
        dataArr.forEach((el)=>{
            console.log(el.type);
        })
        let logoData = dataArr.filter((el)=> el.type === "logo");
        let lineData = dataArr.filter((el)=> el.type === "line");
        let loginData = dataArr.filter((el)=> el.type === "login");
        headerEl.innerHTML = `
        <div class="container m-auto flex py-3">
            <div class="sm:w-1/2 md:w-4/12 text-left flex items-center">
               <a   class="inline-block px-4 md:px-0" 
                    target="_blank" 
                    href="${logoData[0].url}"
                    data-scopename="${logoData[0].scopename}" data-eventvalue="${logoData[0].eventvalue}">
                  <img class="h-[30px]" src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/landinglogo.svg" alt="">
               </a>
            </div>
            <div class="md:flex sm:w-1/2 md:w-8/12 text-left md:text-right ml-auto pt-0 flex items-center justify-end">
               <a 
                    class="pr-3" 
                    href="${lineData[0].url}" 
                    data-scopename="${lineData[0].scopename}" data-eventvalue="${lineData[0].eventvalue}" target="_blank">
                <img src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/event/coupon5000/images/linebtn.png" alt="">
               </a>
               <a 
                class="mr-2 md:mr-2 py-1 px-2 md:px-4 rounded-md text-sm md:text-base font-medium border border-gray-700 text-gray-700 bg-transparent 
                    hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-gray-700 flex items-center" 
                    href="${loginData[0].url}" data-scopename="${loginData[0].scopename}" data-eventvalue="${loginData[0].eventvalue}" target="_blank">註冊會員</a>
               <div class="hidden  md:inline-block align-middle text-sm sm:text-base">PChome會員註冊送<span class="text-base sm:text-lg">¥300</span></div>
            </div>
        </div>
        `;
    }
    // 如果是 NAV 就建立 NAV
    if (blockType === "nav") {
        console.log('dataArr:',dataArr);
        let currentNavData = [];
        const now = Date.now();
        // const now = new Date("2024-11-07T00:00:00").getTime();
        dataArr.forEach((obj)=>{
            if ( obj.type === "temp" && new Date(obj.start).getTime() <= now &&  now <= new Date(obj.end).getTime() ) {
                currentNavData.push(obj);
            } else if (obj.type !== "temp") {
                currentNavData.push(obj);
            }
        });
        console.log("currentNavData",currentNavData);
        const navDom = document.querySelector("#customNav");
        let navUl = document.createElement("ul");
        navUl.classList.add('w-fit','flex','mx-auto','flex-nowrap');
        navUl.innerHTML = `${currentNavData.map((item)=>`
            <a 
                href="${item.url}" target="_blank"
                class="${item.url.startsWith('#')? 'anchor_btn' : ''} font-medium bg-white py-1 px-5 w-max flex-nowrap flex main_nav_tab bid" 
                data-target="${item.url}"
                data-eventvalue="${item.eventvalue}"
                data-scopename="${item.scopename}" 
            >${item.title}</a>`).join('')}`;
        navDom.appendChild(navUl);
    } 
    // 建立banner 
    else if (blockType === "banner") {
        let now = Date.now();
        info.data.forEach((el)=>{
            el.start = new Date(el.start).getTime();
            el.end = new Date(el.end).getTime();
        });
        const fixedBtnData = info.data.filter((el) => el.type === "fixedBtn");
        const txtSliderArr = info.data.filter((el) => el.type === "left");
        const prodSliderArr = info.data.filter((el) => el.type === "right" && el.start <= now && now <= el.end );
        // const prodSliderArr = info.data.filter((el) => el.type === "right");

        this.processSliderArray(txtSliderArr);
        this.processSliderArray(prodSliderArr);
        let bgImgList = info.data.filter((el) => el.type === "bg");
        let bgImg = bgImgList.filter((obj)=> obj.start <= now && now <= obj.end);
        let currentBgItem;
        if ( bgImg.length ) {
            currentBgItem = bgImg[0];
        } else {
            currentBgItem = bgImgList[0];
        }
        const elDom = this.createSection(info);
        elDom.classList.add('anchor_section','banner_area','relative','z-[3]',`bg-[url(${currentBgItem.image})]`,'min-[800px]:h-[525px]');
        elDom.innerHTML = `<div class="max-w-[800px] w-full mx-auto relative h-full">
        <picture>
            <img src="${currentBgItem.title}" class="w-full aspect-[800/469] h-auto object-cover min-[800px]:opacity-0" loading="lazy">
        </picture>
        <div class="absolute left-0 top-0 w-full h-full flex">
            <div class="bn_left_area w-[50%] min-[800px]:w-[55%] h-full flex items-end overflow-hidden relative p-[0_0_2.5%_8%] min-[800px]:p-[0_0_4%_4%]">
                <div class="w-[96%] min-[800px]:w-[85%] h-[24%] aspect-[320/115] h-auto">
                    ${txtSliderArr.length ? `
                        <div id="bnTxtSwiper" class="swiper h-full">
                            <div class="swiper-wrapper">
                            ${txtSliderArr.map((el)=>`
                                <a 
                                    data-scopename="${el.scopename}"
                                    data-eventvalue="${el.eventvalue}"
                                    ${el.isLink ? `href="${el.url}" target="_blank"`: `data-target="${el.anchor}"`}
                                    ${el.anchor_child ? `data-subtarget="${el.anchor_child}"`:''}
                                    class="swiper-slide ${el.isLink ? '': 'anchor_btn'}"
                                >
                                    <img src="${el.image}" class="h-full object-cover mx-auto" loading="lazy" alt="${el.eventvalue}"/>
                                </a>
                            `).join('')}
                            </div>
                        </div>
                    `: ''}
                </div>
            </div>
            <div class="bn_right_area w-[50%] min-[800px]:w-[45%] h-full flex items-end p-[0_5.5%_4.5%_4%] min-[800px]:p-[0_3%_5.5%_1.5%]">
                <div class="prod_slider_box h-full w-full relative pt-[22%]">
                    ${prodSliderArr.length ? `
                        <div id="bnProdSwiper" class="swiper w-full h-full">
                            <div class="swiper-wrapper">
                            ${prodSliderArr.map((el)=>`
                                <a 
                                    ${el.isLink ? `href="${el.url}" target="_blank"`: `data-target="${el.anchor}"`}
                                    ${el.anchor_child ? `data-subtarget="${el.anchor_child}"`:''}
                                    class="swiper-slide cs_slide flex-col justify-end items-center ${el.isLink ? '': 'anchor_btn'}"
                                    data-scopename="${el.scopename}"
                                    data-eventvalue="${el.eventvalue}"
                                >
                                    <img src="${el.image}" class="w-auto h-[75%] min-[800px]:h-[78%] aspect-[1/1] object-contain" loading="lazy"/>
                                    <div 
                                        class="flex flex-col w-full h-[35%] min-[800px]:h-[24%]"
                                    >
                                        <div class="flex h-full w-full mx-auto">
                                            <div class="px-2 flex flex-col items-center justify-center w-full leading-[1.1]">
                                                <span class="max-sm:text-[12px] lg:text-[24px] mb-[2px] sm:mb-1 text-[#fff]">${el.ori_price}</span>
                                                <div class="sm:text-[22px] lg:text-[34px] font-black text-[#fff]">
                                                    ${el.price}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            `).join('')}
                            </div>
                        </div>
                            <div class="z-[4] absolute top-[44%] w-[24px] sm:w-[34px] p-1 left-0 bnSliderPrev">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="圖層_1" x="0px" y="0px" viewBox="0 0 24 28" style="enable-background:new 0 0 24 28;" xml:space="preserve">
                                    <path d="M1.1,15.9c-1.4-0.8-1.4-2.9,0-3.7L20.3,1.1c1.4-0.8,3.2,0.2,3.2,1.8v22.2c0,1.6-1.8,2.7-3.2,1.8L1.1,15.9z" fill="black" transform="scale(0.8, 0.8)"/>
                                </svg>
                            </div>
                            <div class="z-[4] absolute top-[44%] w-[24px] sm:w-[34px] p-1 right-0 bnSliderNext">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="圖層_1" x="0px" y="0px" viewBox="0 0 24 28" style="enable-background:new 0 0 24 28;" xml:space="preserve">
                                    <path d="M1.1,15.9c-1.4-0.8-1.4-2.9,0-3.7L20.3,1.1c1.4-0.8,3.2,0.2,3.2,1.8v22.2c0,1.6-1.8,2.7-3.2,1.8L1.1,15.9z" fill="black" transform="scale(-0.8, 0.8) translate(-24, 0)"/>
                                </svg>

                            </div>
                        <div class="bnSliderPagination buyjp flex justify-center mt-[6px] sm:mt-2 relative"></div>
                    `: ''}
                </div>
            </div>
        </div>
        </div>
        `;
        fragment.appendChild(elDom);
        mainDom.before(fragment);

        if ( txtSliderArr.length ) {
            setTimeout(()=>{
                new Swiper("#bnTxtSwiper", {
                    effect: "fade",
                    fadeEffect: {
                        crossFade: true,
                    },
                    autoplay: {
                    delay: 3000,
                    },
                    speed: 800,
                });
            },150)
        }    
        if ( prodSliderArr.length ) {
            setTimeout(()=>{
                new Swiper("#bnProdSwiper", {
                    autoplay: {
                        delay: 3000,
                    },
                    freeMode: false, // Disable free mode to prevent dragging multiple slides
                    speed: 800,
                    loop: true,
                    freeMode: false,
                    navigation: {
                        prevEl: ".bnSliderPrev",
                        nextEl: ".bnSliderNext",
                    },
                    pagination: {
                        el: ".bnSliderPagination",
                        clickable: true,
                        renderBullet: function (index, className) {
                            return `<span class="${className} custom_bullet"></span>`;
                        },
                    }, 
                });
            },150)
        }
    }
    // 兩個廣告板塊
    else if (blockType === "promotion1") {
        if ( !dataArr.length ) return;
        const elDom = this.createSection(info);
        this.processSliderArray(dataArr);
        let promotion2Data = this.groupDataByRangePromotion2(dataArr);
        let contentPromotion2Data = Object.entries(promotion2Data).reduce((acc, [key, item]) => {
        let now = Date.now();
            if (item.start && item.end) {
                let startDate = new Date(item.start);
                let endDate = new Date(item.end);
                if (startDate <= now && endDate >= now) {
                    if (!acc[key]) {
                        acc[key] = [];
                    }
                    acc[key].push(item);
                }
            }
            return acc;
        }, {});
        elDom.classList.add('mb-4','px-3');
        elDom.innerHTML = `
            ${Object.entries(contentPromotion2Data).map(([key, items], index) => {
              return items.map((item) => {
                  let now = Date.now();
                  let startDate = new Date(item.start);
                  let endDate = new Date(item.end);
      
                  if (startDate <= now && endDate >= now) {
                      return `
                        <div class="flex w-full items-center gap-2 sm:gap-4 max-w-[800px] mx-auto pt-2">
                            <a 
                                class="flex w-[50%] h-auto hvr_bounce ${dataArr[0].url.startsWith('#')? 'anchor_btn cursor-pointer' : ''}"
                                ${dataArr[0].isLink ? `href="${dataArr[0].url}" target="_blank"`: `data-target="${dataArr[0].anchor}"`}
                                ${dataArr[0].anchor_child ? `data-subtarget="${dataArr[0].anchor_child}"`:''}
                                data-scopename="${dataArr[0].scopename}"
                                data-eventvalue="${dataArr[0].eventvalue}"
                            >
                                <img src="${dataArr[0].image}" loading="lazy" class="flex w-full rounded-lg drop-shadow-sm" alt=""/>
                            </a>
                            <a 
                                class="flex w-[50%] h-auto hvr_bounce ${dataArr[1].isLink ? '': 'anchor_btn cursor-pointer'}"
                                ${dataArr[1].isLink ? `href="${dataArr[1].url}" target="_blank"`: `data-target="${dataArr[1].anchor}"`}
                                ${dataArr[1].anchor_child ? `data-subtarget="${dataArr[1].anchor_child}"`:''}
                                data-scopename="${dataArr[1].scopename}"
                                data-eventvalue="${dataArr[1].eventvalue}"
                            >
                                <img src="${dataArr[1].image}" loading="lazy" class="flex w-full rounded-lg drop-shadow-sm" alt=""/>
                            </a>
                        </div>
                        `;
                  } else {
                      // 如果該 item 不在時間範圍內，則不渲染任何內容
                      return '';
                  }
              }).join(''); // 使用 join() 將每個符合條件的 item 合併成一個字串
            }).join('')}
            `;
        fragment.appendChild(elDom);
        mainDom.appendChild(fragment);
    }
    // 單個廣告板塊
    else if (blockType === "promotion2") {
        if ( !dataArr.length ) return;
        const elDom = this.createSection(info);
        this.processSliderArray(dataArr);

        let promotion2Data = this.groupDataByRangePromotion2(dataArr);
        let contentPromotion2Data = Object.entries(promotion2Data).reduce((acc, [key, item]) => {
            //Object.entries(promotion2Data) 會遍歷 promotion2Data 並根據時間範圍過濾資料。
            // 如果多個項目有相同的 key 或有重複的資料被推入 acc，就會造成覆蓋。
            
            let now = Date.now();
            // let now = new Date("2025-02-04T00:00:00");
            // let now = new Date("2025-02-08T00:00:00");
            if (item.start && item.end) {
                let startDate = new Date(item.start);
                let endDate = new Date(item.end);
                if (startDate <= now && endDate >= now) {
                    // acc[key] = item;  // Keep the original key and value
                    // 如果 item 開始和結束時間在有效時間範圍內，加入 acc
                    if (!acc[key]) {
                        // 如果 acc 中還沒有這個 key，則創建一個新的陣列
                        acc[key] = [];
                    }
                    acc[key].push(item); // 將符合條件的 item 加入對應的 key 下
                }
            }
            return acc;
        }, {});
          console.log("contentPromotion2Data",contentPromotion2Data);
          elDom.innerHTML = `
          ${Object.entries(contentPromotion2Data).map(([key, items], index) => {
              // 這裡處理每個符合條件的 item（由於可能有多個 item，這是陣列）
              return items.map((item) => {
                  let now = Date.now();
                  let startDate = new Date(item.start);
                  let endDate = new Date(item.end);
      
                  if (startDate <= now && endDate >= now) {
                      // 只有在時間範圍內才渲染該區塊
                      return `
                      <div class="w-full px-3">
                          <a 
                              class="flex w-full max-w-[800px] mx-auto h-auto hvr_bounce mb-3 ${dataArr[0].url.startsWith('#')? 'anchor_btn cursor-pointer' : ''}"
                            ${dataArr[0].isLink ? `href="${dataArr[0].url}" target="_blank"`: `data-target="${dataArr[0].anchor}"`}
                            ${dataArr[0].anchor_child ? `data-subtarget="${dataArr[0].anchor_child}"`:''}
                              data-scopename="${dataArr[0].scopename}"
                              data-eventvalue="${dataArr[0].eventvalue}"
                          >
                              <img src="${dataArr[0].image}" loading="lazy" class="flex w-full" alt=""/>
                          </a>
                      </div>
                      `;
                  } else {
                      // 如果該 item 不在時間範圍內，則不渲染任何內容
                      return '';
                  }
              }).join(''); // 使用 join() 將每個符合條件的 item 合併成一個字串
          }).join('')}
          `;
        fragment.appendChild(elDom);
        mainDom.appendChild(fragment);
    }
    else if (blockType === "toolbar") {
        let btns = dataArr.filter((el)=> el.type === 'icon');
        let menuItems = dataArr.filter((el)=> el.type === 'menu');
        let ToolBarDom = document.getElementById("pageToolBar");
        ToolBarDom.innerHTML=`
            <div class="toolbar_nemu">
                <div class="close_box">
                    <img id="closeBarMenuBtn" src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/event/2024bid_1101event/image/icon_1111close.svg" class="w-[36px]" />
                </div>
                <ul class="grid grid-cols-3 gap-2 w-[calc(100%-32px)] mx-auto mb-4">
                ${menuItems.map((item)=>`<li class="w-full">
                    <a 
                        href="${item.url}" target="_blank"
                        class="block w-full text-white border border-solid rounded-[20px] py-2 text-center max-[380px]:text-[13px] text-[14px]"
                        data-scopename="${item.scopename}"
                        data-eventvalue="${item.eventvalue}"
                    >
                        ${item.title}
                    </a></li>`).join('')}
                </ul>
            </div>
            <ul class="tb_menu_list">
                ${btns.map((item)=>`<li>
                    <a 
                        href="${item.url}" target="_blank"
                        class="block w-full"
                        data-scopename="${item.scopename}"
                        data-eventvalue="${item.eventvalue}"
                    >
                    <img src="${item.image}" class="w-full"/>
                    </a></li>`).join('')}
                <li class="toggleMenuBtn">
                    <a>
                    <img src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/buy_jp/images/event/2024/1201/images/mb_icon_more.png" class="w-full"/>
                    </a>
                </li>
                <li class="goTopBtn">
                    <a>
                    <img src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/buy_jp/images/event/2024/1201/images/mb_icon_top.png"" class="w-full"/>
                    </a>
                </li>
            </ul>
        `;
        const menuListBtm = ToolBarDom.querySelector(".toolbar_nemu");
        ToolBarDom.querySelector(".goTopBtn").addEventListener("click",()=>{
            this.goPageTop();
        });
        ToolBarDom.querySelector(".toggleMenuBtn").addEventListener("click",()=>{
            menuListBtm.classList.toggle("show");
        });

        ToolBarDom.querySelector("#closeBarMenuBtn").addEventListener("click",()=>{ 
            menuListBtm.classList.remove("show");
        });

        // toolbar_nemu
    }
    //  建立A_2框
    else if (blockType === "typeA_2"){
        let sortData = this.groupDataByRange(dataArr);
        const allStart = new Date(dataArr[0].start).getTime();
        const allEnd = new Date(dataArr[dataArr.length-1].end).getTime();
        const now = Date.now();
        // const now = new Date("2024-11-15T00:00:00").getTime();
        if ( now <= allEnd ) {
            const elDom = this.createSection(info);
            elDom.classList.add('anchor_section','px-3','mb-5','md:mb-12');
            elDom.innerHTML = `
            <div class="w-full max-w-[800px] mx-auto">
                <img src="${dataArr[0].section_title_image}" class="w-full h-auto aspect-[800/133]"/>
                <div class="flex flex-col w-full bg-white rounded-[0_0_20px_20px] sm:rounded-[0_0_40px_40px] overflow-hidden">
                   <ul class="flex justify-center gap-1 py-2 sm:py-5 px-1 sm:px-2">
                        ${Object.entries(sortData).map(([key, item], index) => {
                            const startTime = new Date(item.start).getTime();  // 轉換成時間戳
                            const endTime = new Date(item.end).getTime();      // 轉換成時間戳
                            const basicStyle = 'flex flex-col w-full items-center justify-center border-solid border rounded-md leading-[1.2] py-2 text-[12px] sm:text-[16px] lg:text-[20px]';
                            // let isSameDay = false;
                            // if ( new Date(item.start).getDate() === new Date(item.end).getDate() ) isSameDay = true;
                            // console.log("isSameDay",isSameDay);
                            let timeTitle = "";
                            // if (isSameDay) {
                            //     timeTitle = `${new Date(item.start).getMonth() + 1}/${new Date(item.start).getDate()}`; // 轉換成 month / date 之類的日期
                            // } else {
                                timeTitle = `${new Date(item.start).getMonth() + 1}/${new Date(item.start).getDate()} - ${new Date(item.end).getMonth() + 1}/${new Date(item.end).getDate()}`; // 轉換成 month / date 之類的日期
                            // }
                            return `
                                   ${ now <= endTime && now >= startTime ? 
                                        ` <li 
                                            class="flex w-[25%] sm:w-[20%] h-auto clnd_tab cursor-pointer" 
                                            data-starttime="${item.start}" 
                                            data-endtime="${item.end}" 
                                            data-order="${key}">
                                <div class="border-[#ff5b00] bg-[#ff5b00] text-white ${basicStyle}">
                                            <span class="flex justify-center w-full">
                                                <img class="w-[12px] sm:w-[24px]" src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/event/2024fmmart_1002event/images/icon_clock.svg"/>
                                                ${timeTitle}
                                            </span>
                                         </div></li>
                                        ` : 
                                        now < startTime ?  `<li 
                                            class="flex w-[25%] sm:w-[20%] h-auto clnd_tab cursor-pointer" 
                                            data-starttime="${item.start}" 
                                            data-endtime="${item.end}" 
                                            data-order="${key}"><div class="${basicStyle} border-[#FF5B00] bg-[#FFF2EB] text-[#FF5B00]">
                                        <span>${timeTitle}</span>
                                        </div></li>` : 
                                        `<li 
                                            class="flex w-[25%] sm:w-[20%] h-auto clnd_tab cursor-pointer" 
                                            data-starttime="${item.start}" 
                                            data-endtime="${item.end}" 
                                            data-order="${key}"><div class="${basicStyle} text-[#676767] border-[#676767] bg-[#E5E5E5]">
                                        <span>${timeTitle}</span>
                                        </div></li>`}
                                       
                            `;
                        }).join('')
                        }
                   </ul>
                   <div id="panelContainer${info.position_id}" class=""></div>
                </div>
            </div>
            `;
            mainDom.appendChild(elDom);
    
            const boxWrapper = document.querySelector(`#panelContainer${info.position_id}`);
            const fragmentChild = document.createDocumentFragment();
            Object.entries(sortData).map(([key, item], index)  => {
                    const items = item.data;
                    const firstOne = items.shift();
                    const newPanel = document.createElement("div");
                    newPanel.classList.add('daySalePanel','flex','flex-col','hidden','px-2','sm:px-8');
                    newPanel.dataset.order = key;
                    newPanel.dataset.start = firstOne.start;
                    newPanel.dataset.end = firstOne.end;
                    newPanel.innerHTML = `
                    <div class="flex w-full mb-8 sm:mb-12 text-[#394B62] gap-[2px] bg-[#D4F0F0]">
                        <div class="w-full flex w-[50%] pr-1 sm:pr-2 bg-white">
                            <a 
                                href="${firstOne.url}" target="_blank"
                                data-scopename="${firstOne.scopename}"
                                data-eventvalue="${firstOne.eventvalue}"
                                class="flex flex-col w-full"
                            >
                                <p class="text-[#E81C24] flex items-center text-[12px] sm:text-[20px]">
                                    <span class="bg-[#E81C24] w-1 sm:w-2 w-1 h-1 sm:h-2 rounded-lg inline-block mr-1"></span>
                                    ${firstOne.label}
                                </p>
                                <img src="${firstOne.image}" loading="lazy" class="max-w-full w-full my-1 object-cover" />
                                <div class="flex flex-1 flex-col">
                                    <div class="flex flex-col flex-1">
                                        <p class="text-[13px] sm:text-[18px] md:text-[24px] leading-[1.25]">${firstOne.title}</p>
                                        <span class="${firstOne.ori_price.includes('$')? 'line-through':''} text-[#c1c1c1] text-[13px] md:text-[24px]">${firstOne.ori_price}</span>
                                    </div>
                                        <div class="flex items-end justify-between pb-[2%]">
                                            <div class="text-[#FF000F] font-medium leading-[1]">
                                            <span class="lg:text-[20px]">${firstOne.price}</span>
                                            </div>
                                            <img
                                                class="w-[16px] sm:w-[28px]"
                                                src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/event/2024fmmart_1002event/images/icon_play.svg" alt="">
                                        </div>
                                </div>
                            </a>
                        </div>
                        <div class="w-[65%] sm:w-[50%] bg-white pl-1 sm:pl-2">
                            <ul class="h-full w-full grid grid-cols-1 grid-rows-3 gap-[2px] bg-[#D4F0F0]">
                            ${items.map((el,i)=>`
                                <a href="${el.url}" target="_blank" class="flex bg-white items-center"
                                data-scopename="${el.scopename}"
                                data-eventvalue="${el.eventvalue}">
                                    <div 
                                        class="w-[62%] flex flex-col h-full max-sm:py-[2px] justify-between"
                                    >
                                        <p class="text-[#E81C24] flex items-center max-sm:text-[12px] lg:text-[20px] mb-1 ${i == 0 ? '':'pt-[2%]'}">
                                           <img src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/event/2024fmmart_1002event/images/icon_fire.svg"
                                            class="w-[10px] sm:w-[18px] mr-1"/>
                                          ${el.label}
                                        </p>
                                        <p class="flex flex-1 leading-[1.25] text-[13px] sm:text-[24px]">${el.title}</p>
                                        <div class="flex justify-between items-end w-full pb-[2%]">
                                            <div class=" w-full flex flex-col">
                                                <span class="text-[12px] sm:text-[24px] text-[#c1c1c1]">${el.ori_price}</span>
                                                <span class="text-[#FF000F] leading-[1.25] font-medium max-sm:text-[14px] lg:text-[20px]">${el.price}</span>
                                            </div>
                                             <img
                                                class="w-[16px] sm:w-[28px]"
                                                src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/event/2024fmmart_1002event/images/icon_play.svg" alt="">
                                        </div>
                                    </div>
                                    <img src="${el.image}" loading="lazy" class="w-[38%] aspect-[1/1]"/>
                                </a>
                            `).join('')}
                            </ul>
                        </div>
                    </div>
                `;
                fragmentChild.appendChild(newPanel);
            });
            boxWrapper.appendChild(fragmentChild);  // Append all at once
             
            const fiveTabs = document.querySelectorAll(".clnd_tab");
            const dayPanels = document.querySelectorAll(".daySalePanel");

            // Function to handle tab activation
            function tapTab(tab, panel) {
                    fiveTabs.forEach(tab => tab.classList.remove('active'));
                    dayPanels.forEach(panel => panel.classList.add('hidden'));
                    tab.classList.add('active');
                    panel.classList.remove('hidden');
            }

            // Event listener for tab clicks
            fiveTabs.forEach(tab => {
                    tab.addEventListener('click', function() {
                    const orderNum = this.dataset.order;
                    const panel = [...dayPanels].find(panel => panel.dataset.order === orderNum);
                    if (panel) {
                        tapTab(this, panel);
                    }
                    });
            });

            function initializeTabs() {
                    let isActiveSet = false;
                    fiveTabs.forEach(tab => {
                      const tabStartTime = new Date(tab.dataset.starttime).getTime();
                      const tabEndTime = new Date(tab.dataset.endtime).getTime();
                      const orderNum = tab.dataset.order;
                      const panel = [...dayPanels].find(panel => panel.dataset.order === orderNum);
                
                      if (!panel) return;
                
                      if (tabStartTime <= now && now <= tabEndTime) {
                        tapTab(tab, panel);
                        isActiveSet = true;
                      } else if (tabEndTime < now) {
                        panel.classList.add("hidden");
                      } else if ( tabEndTime > now) {
                        panel.classList.add("yet");
                      }
                    });
                    if (!isActiveSet) {
                      tapTab(fiveTabs[0], dayPanels[0]);
                    }
            }
            initializeTabs();
        }
    }
    // 建立typeB版型 ( B框 )
    else if (blockType === "typeB") {
        const elDom = this.createSection(info);
        elDom.classList.add('items-center','anchor_section','mb-2','sm:mb-8','md:mb-12','max-[800px]:px-2');
        elDom.innerHTML = `
        <div class="w-full max-w-[800px] mx-auto">
            <img src="${dataArr[0].section_title_image}" class="w-full h-auto aspect-[800/133]"/>
            <div class="w-full rounded-[0_0_20px_20px] sm:rounded-[0_0_40px_40px] overflow-hidden bg-white md:pl-8">
                <div class="swiper swiper-container p-3 mt-3 md:mt-8 md:mb-12" id="swiper-${info.position_id}">
                    <div class="swiper-wrapper">
                       ${dataArr.map((item)=>`
                        <div class="swiper-slide rounded-lg overflow-hidden h-auto shadow-[0px_0px_9.38px_0px_#FF5B0040]">
                            <a 
                                class="flex flex-col items-center"
                                href="${item.url}" target="_blank" 
                                data-scopename="${item.scopename}" 
                                data-eventvalue="${item.eventvalue}"
                            >
                            <div class="relative">
                                ${item.ribbon? `<span class="absolute bottom-[0%] left-0 z-[2] bg-[#FF5005] text-[#FAFF00] text-[12px] sm:text-[18px] px-3">${item.ribbon}</span>`:``}
                                <img src="${item.image}" class="aspect-[1/1] w-full" loading="lazy">
                            </div>
                                ${item.label? `<span class="bg-[#FF5B00] w-full text-white max-sm:text-[12px] leading-[2] text-center truncate">${item.label}</span>`:''}
                                <div class="w-full p-2">
                                    <h4 class="text-[13px] sm:text-[18px] text-[#1D324C] text-center">${item.title}</h4>
                                </div>
                            </a>
                        </div>
                       `).join('')}
                    </div>
                </div>
                    <div id="${info.position_id}Pgn" class="sw-pagination flex justify-center relative mt-5 mb-5 md:mb-8"></div>
            </div>
        </div>
        `;
        mainDom.appendChild(elDom);
        new Swiper(`#swiper-${info.position_id}`, {
            slidesPerView: 2.5, // Show 2.5 slides
            spaceBetween: 12, /// 調整幻燈片之間的間距
            slidesPerGroup: 1, // 每次滑動時進行的幻燈片數量
            loop: true, // Enable looping
            freeMode: true, // 禁用自由模式，防止拖動多個幻燈片!!
            longSwipes: true, // 禁用長滑動!!
            shortSwipes: true, // 啟用短滑動
            resistanceRatio: 0, // 防止在邊界處出現抗拒效果
            speed: 200, /// 設置幻燈片過渡的速度
            // loopAdditionalSlides: 2,
            pagination: {
              el: `#${info.position_id}Pgn`,
              clickable: true,
              renderBullet: function (index, className) {
                  return `<span class="${className} bullet_type_b"></span>`;
              },
            },
            breakpoints: {
                640: {
                    slidesPerView: 3.5, // Set to 3 slides when screen width >= 640px
                }
            }
        });
    }
    // 建立typeC版型 ( C框 - 1 & 2 )
    else if (blockType === "typeC" || blockType === "typeC_2" ) {
        const sortData = this.groupDataTypeC(dataArr, blockType);
        if (blockType === "typeC") {
            Object.entries(sortData).map(([key, item], index) => {
                item.moreBtn = item.data.pop();
            });
        }
        
        const elDom = this.createSection(info);
        elDom.classList.add('items-center','anchor_section','px-2','mb-2','sm:mb-8','md:mb-12');
        elDom.innerHTML = `
            <div class="w-full max-w-[800px] mx-auto">
                <img src="${dataArr[0].section_title_image}" class="w-full h-auto aspect-[800/133]"/>
                <div class="w-full p-3 bg-white rounded-[0_0_20px_20px] sm:rounded-[0_0_40px_40px]">
                    <div class="prodGridBox mt-2 w-full md:w-[90%] lg:w-[83%] mx-auto"></div>
                </div>
            </div>
        `;
        fragment.appendChild(elDom);
        mainDom.appendChild(fragment);

        const prodGridBoxEl = elDom.querySelector(".prodGridBox");
        Object.entries(sortData).map(([key, item], index) => {
            const gridEl = document.createElement('div');
            gridEl.classList.add('prodPanel');
            if (index !== 0) gridEl.classList.add('hidden');
            gridEl.dataset.group = `group${key}`;
    
            // 根據 blockType 來決定要顯示的內容
            gridEl.innerHTML = `
                <ul class="grid grid-cols-3 gap-2 overflow-hidden">
                    ${item.data.map((obj) => `
                        <li class="bg-white block w-full">
                            <a
                                class="flex flex-col items-center justify-center w-full h-full"
                                href="${obj.url}"
                                target="_blank"
                                data-eventvalue="${obj.eventvalue}"
                                data-scopename="${obj.scopename}"
                            >
                                <img src="${obj.image}" loading="lazy" class="aspect-[1/1] w-full h-auto"/>
                                <p class="text-white bg-[#FF6F32] text-center truncate w-full px-1 text-[13px]">${obj.label}</p>
                                <div class="flex flex-col items-center w-full pt-1 pb-2">
                                    <p class="flex-1 text-center sm:text-[18px] w-full">${obj.title}</p>
                                </div>
                            </a>
                        </li>
                    `).join('')}
                </ul>
                ${ blockType === "typeC_2"
                        ? `<ul class="w-full flex justify-center items-center mt-2 sm:mt-6 mb-3 sm:mb-4 gap-1 sm:gap-3">
                            ${item.hashtags.map((tag) => `
                                <li>
                                    <a 
                                        href="${tag.url}" target="_blank"
                                        data-scopename="${tag.scopename}"
                                        data-eventvalue="${tag.eventvalue}"
                                        class="flex border-solid border border-2 border-black text-black rounded-[4px] sm:rounded-md text-[12px] 
                                        sm:text-[16px] md:text-[20px] bg-[#FFF053] px-2 leading-[1.5]  hover:bg-white hover:text-[#5a68ff] hover:border-[#5a68ff]"
                                    >${tag.hashtag}</a>
                                </li>
                            `).join('')}
                        </ul>`
                        : `<div class="w-full mt-3 mb-4">
                                <a 
                                    class="mx-auto flex items-center justify-center w-[40%] border border-solid border-black border-2 rounded-md p-2"
                                    data-eventvalue="${item.moreBtn.eventvalue}"
                                    data-scopename="${item.moreBtn.scopename}"
                                    href="${item.moreBtn.url}" target="_blank"
                                >
                                <span class="max-sm:text-[13px] lg:text-[24px] text-[#1D324C]">${item.moreBtn.title}</span>
                                <img src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/event/2024fmmart_1002event/images/gray_arrow.svg" 
                                class="sm:mt-[0.25ch] block max-sm:w-[9px] w-[12px] lg:w-[16px] ml-1"/>
                                </a>
                        </div>`
                }
            `;
            prodGridBoxEl.appendChild(gridEl);
        });

        // 綁定 tabs 的邏輯
        let tabList = elDom.querySelectorAll('.pd_sub_tab');
        const subTabListEl = elDom.querySelector(".subTabList");
        const pdSectionList = elDom.querySelectorAll(".prodPanel");
        tabList.forEach((el) => {
            el.addEventListener('click', function () {
                tabList.forEach((item) => item.classList.remove('active'));
                this.classList.toggle('active');

                let tabOffset = this.offsetLeft;
                let tabWidth = this.offsetWidth;
                const containerWidth = subTabListEl.clientWidth;
                const scrollPosition = tabOffset - containerWidth / 2 + tabWidth / 2;
                subTabListEl.scrollTo({
                    left: scrollPosition,
                    behavior: "smooth",
                });

                let groupId = this.dataset.group;
                pdSectionList.forEach((panel) => {
                    if (panel.dataset.group === groupId) {
                        panel.classList.remove('hidden');
                    } else {
                        panel.classList.add('hidden');
                    }
                });
            });
        });
    }
    //  建立typeD (D框)
    else if (blockType === "typeD") {
        const elDom = this.createSection(info);
        elDom.classList.add('items-center','anchor_section','max-[800px]:px-2','mb-2','sm:mb-8','md:mb-12');
        elDom.innerHTML = `
        <div class="block w-full max-w-[800px]">
            <img src="${dataArr[0].section_title_image}" class="w-full h-auto aspect-[800/133]"/>
            <div class="w-full rounded-[0_0_20px_20px] sm:rounded-[0_0_40px_40px] overflow-hidden bg-white pl-2 sm:pl-5 pt-5">
                <div class="swiper swiper-container" id="swiper-${info.position_id}">
                    <div class="swiper-wrapper">
                       ${dataArr.map((item)=>`
                        <div class="swiper-slide rounded-md overflow-hidden h-auto">
                            <a ${item.label !== "N" ? `data-label="${item.label}"` : ""} 
                                class="flex flex-col items-center relative w-full ${item.label === "N" ? '':'alertBtn'}"
                                href="${item.url}" target="_blank" 
                                data-scopename="${item.scopename}" 
                                data-eventvalue="${item.eventvalue}"
                            >
                                <img src="${item.image}" class="aspect-[1/1] w-full h-auto rounded-[20px] sm:rounded-[40px] mb-1" loading="lazy">
                                <div class="w-full">
                                    <h4 class="max-sm:text-[13px] lg:text-[20px] bg-[${item.ori_price}] rounded-[50px] text-center text-white leading-[2]">${item.title}</h4>
                                    <div class="max-sm:text-[12px] sm:text-[18px] p-1">
                                        ${item.description}
                                    </div>
                                </div>
                            </a>
                        </div>
                       `).join('')}
                    </div>
                    <div class="${info.position_id}_cdp flex justify-center relative my-5 sm:my-8"></div>
                </div>
            </div>
        </div>
        `
        fragment.appendChild(elDom);
        mainDom.appendChild(fragment);
        // 
        new Swiper(`#swiper-${info.position_id}`, {
            slidesPerView: 2.5, 
            spaceBetween: 8, // Adjust space between slides as needed
            slidesPerGroup: 1, // Number of slides to advance at once
            loop: true, // Enable looping
            freeMode: false, // Disable free mode to prevent dragging multiple slides
            longSwipes: false, // Disable long swipes
            shortSwipes: true, // Enable short swipes
            resistanceRatio: 0, // Prevent resistance effect at boundaries
            speed: 200, // Set speed of slide transition
            loopAdditionalSlides: 2,//額外加的不能放2.5
            pagination: {
              el: `.${info.position_id}_cdp`,
              clickable: true,
              renderBullet: function (index, className) {
                  return `<span class="${className} bullet_type_d bid"></span>`;
              },
            },
            breakpoints: {
                640: {
                    slidesPerView: 2.6, // Set to 3 slides when screen width >= 640px
                }
            }
        });
    }
    //  建立typeD2 (D-2框)
    else if (blockType === "typeD_2") {
        const elDom = this.createSection(info);
        elDom.classList.add('items-center','anchor_section','max-[800px]:px-2','mb-2','sm:mb-8','md:mb-12');
        elDom.innerHTML = `
        <div class="block w-full max-w-[800px]">
            <img src="${dataArr[0].section_title_image}" class="w-full h-auto aspect-[800/133]"/>
            <div class="w-full rounded-[0_0_20px_20px] sm:rounded-[0_0_40px_40px] overflow-hidden bg-white pl-2 sm:pl-5 pt-5">
                <div class="swiper swiper-container" id="swiper-${info.position_id}">
                    <div class="swiper-wrapper">
                       ${dataArr.map((item)=>`
                        <div class="swiper-slide rounded-md overflow-hidden h-auto">
                            <a 
                                class="flex flex-col items-center relative w-full"
                                href="${item.url}" target="_blank" 
                                data-scopename="${item.scopename}" 
                                data-eventvalue="${item.eventvalue}"
                            >
                                <img src="${item.image}" class="aspect-[1/1] w-full h-auto rounded-[20px] sm:rounded-[40px] mb-1" loading="lazy">
                                <div class="w-full">
                                    <h4 class="max-sm:text-[13px] lg:text-[20px] bg-[${item.ori_price}] rounded-[50px] text-center text-white leading-[2]">${item.title}</h4>
                                    <div class="max-sm:text-[12px] sm:text-[18px] p-1">
                                        ${item.description}
                                    </div>
                                </div>
                            </a>
                        </div>
                       `).join('')}
                    </div>
                    <div class="${info.position_id}_cdp flex justify-center relative my-5 sm:my-8"></div>
                </div>
            </div>
        </div>
        `
        fragment.appendChild(elDom);
        mainDom.appendChild(fragment);
        // 
        new Swiper(`#swiper-${info.position_id}`, {
            slidesPerView: 2.5, 
            spaceBetween: 8, // 調整幻燈片之間的間距
            slidesPerGroup: 1, // 每次滑動時進行的幻燈片數量
            loop: true, // 啟用循環模式
            freeMode: true, // 禁用自由模式，防止拖動多個幻燈片
            longSwipes: true, // 禁用長滑動
            shortSwipes: true, // 啟用短滑動
            resistanceRatio: 0, // 防止在邊界處出現抗拒效果
            speed: 200, // 設置幻燈片過渡的速度
            // loopAdditionalSlides: 2.5,
            pagination: {
                el: `.${info.position_id}_cdp`, // 設定分頁點的容器，根據 position_id 動態生成對應的類名
                clickable: true, // 啟用分頁點的點擊功能，允許用戶點擊跳轉到特定幻燈片
                renderBullet: function (index, className) {
                    // 自定義渲染每個分頁點的樣式
                    return `<span class="${className} bullet_type_d bid"></span>`;
                    // 返回一個帶有自定義類名的 <span> 元素，這些類名可以用來設置分頁點的樣式
                },
            },
            
            breakpoints: {
                640: {
                    slidesPerView: 2.6, // 當螢幕寬度 >= 640px 時，設置為顯示 2.6 張幻燈片
                }
            }
        });        
    }
    // 建立typeE版型 ( E框 )
    else if (blockType === "typeE") {
        const elDom = this.createSection(info);
        elDom.classList.add('items-center','anchor_section','mb-2','sm:mb-8','md:mb-12','max-[800px]:px-2');
        let contentData = this.groupedTypeEData(dataArr);
        console.log("contentData",contentData)
        elDom.innerHTML = `        
        <div class="w-full max-w-[800px] mx-auto">
            <img src="${dataArr[0].section_title_image}" class="w-full h-auto aspect-[800/133]"/>
            <div class="w-full rounded-[0_0_20px_20px] sm:rounded-[0_0_40px_40px] overflow-hidden bg-white md:pl-8">
            <!--p-3 -->
            <div class="swiper swiper-container px-3 mt-3 md:mt-8 md:mb-12" id="swiper-${info.position_id}">
                <ul class="swiper-wrapper">
                        ${Object.entries(contentData).map(([key, item],index)=>`
                                <li class="swiper-slide overflow-hidden h-auto">
                                    <div class="bg-[#E4E4E4] p-3">
                                        <a class="hover:opacity-50 transition"
                                            href="${item.tabs[0].url}" target="_blank"
                                            data-scopename="${item.tabs[0].scopename}"
                                            data-eventvalue="${item.tabs[0].eventvalue}">
                                            <h3 class="text-2xl font-bold mb-3 border-b-2 border-black inline-block">${item.tabs[0].title}</h3>
                                        </a>
                                        ${item.content.length? `
                                            <ul class=" list-disc text-[15px] space-y-3 list-none">
                                                ${item.content.map((el)=>`
                                                    <li>
                                                        <a class="flex items-stretch relative"
                                                            href="${el.url}" target="_blank"
                                                            data-scopename="${el.scopename}"
                                                            data-eventvalue="${el.eventvalue}">

                                                            <div class="w-[38%] relative">
                                                                ${el.ribbon? `<span class="absolute top-0 left-0 z-[2] bg-[${el.label}] text-white font-bold text-[12px] sm:text-[18px] px-2 py-1">${el.ribbon}</span>`:``}
                                                                <img src="${el.image}" alt="${el.title}" class="h-full w-full object-cover bg-white">
                                                            </div>

                                                            <div class="w-[62%] flex flex-col justify-between pl-[6px]">
                                                                <p class="text-[14px] text-[#787878] leading-snug">${el.title}</p>
                                                                <p class="text-base text-gray-800 line-through">${el.ori_price}</p>
                                                                <p class="text-xl font-bold text-black">${el.price}</p>
                                                            </div>

                                                            </a>
                                                    </li>
                                                `).join('')}
                                            </ul>`: ''
                                        }
                                    </div>        
                                </li>
                            `).join('')}
             
                    
                               
                    
                </ul>
            </div>
            <div id="${info.position_id}Pgn" class="sw-pagination flex justify-center relative mt-5 mb-5 md:mb-8"></div>            </div>
        </div>
        `;
        mainDom.appendChild(elDom);
        new Swiper(`#swiper-${info.position_id}`, {
            slidesPerView: 1.2,
            spaceBetween: 5,
            loop: true,
            grid: {
                rows: 1,
                fill: "row"
            },
            // pagination: {
            //     el: `#${info.position_id}Pgn`,
            //     clickable: true
            // },
            pagination: {
                el: `#${info.position_id}Pgn`, // 設定分頁點的容器，根據 position_id 動態生成對應的類名
                clickable: true, // 啟用分頁點的點擊功能，允許用戶點擊跳轉到特定幻燈片
                renderBullet: function (index, className) {
                    // 自定義渲染每個分頁點的樣式
                    return `<span class="${className} bullet_type_e bid"></span>`;
                    // 返回一個帶有自定義類名的 <span> 元素，這些類名可以用來設置分頁點的樣式
                },
            },
            navigation: false,
            breakpoints: {
                820: {
                    spaceBetween: 16,
                    slidesPerView: 2.5,
                    grid: {
                        rows: 1
                    }
                },
                620: {
                    slidesPerView: 1,
                    grid: {
                        rows: 1
                    }
                }
            }
        });
    }
    else if ( blockType === "sidebar") {
        if ( !dataArr.length ) return;
        const sideBarDom = document.createElement("div");
        this.processSliderArray(dataArr);
        sideBarDom.classList.add('fixed_sidebar','w-fit','h-auto','fixed','z-[99]','end-0','top-[150px]','hidden','md:block');
        sideBarDom.innerHTML = `
        <img src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/bbcstore/images/store/event/2024buyjp_0101event/images/closearrow.png" 
        class="cursor-pointer closeSideBtn w-[28px] c fixed right-0 top-[110px]" />
        
        <div class="showSideBtn bg-[#ffffffc4] p-2 rounded-[10px_0_0_10px]"> 
            <div>
                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.27767 7.2999L7.75067 1.22071L1.27767 7.2999Z" fill="white"/>
                <path d="M1.27767 7.2999L7.75067 1.22071" stroke="black" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round"/>
                <path d="M1.27736 7.29858L7.93036 12.7374" stroke="black" stroke-opacity="0.7" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </div>
        </div>
        <div class="slideListBox drop-shadow-lg">
            <ul class="side_list rounded-[20px_0_0_20px] overflow-hidden">
            <!--last:rounded-[0_0_8px_8px] last:bg-[#1D324C] last:text-white -->
            ${dataArr.map((item)=>`
                <li class="[&:not(:first-child)]:border-t [&:not(:first-child)]:border-dashed [&:not(:first-child)]:border-[#fff] bg-[#000] bg-opacity-70 text-white">
                <a 
                    class="${item.url.startsWith('#')? 'anchor_btn' : ''} font-medium p-2 w-full flex justify-center items-center cursor-pointer" 
                    ${item.isLink ? `href="${item.url}" target="_blank"`: `data-target="${item.anchor}"`}
                    ${item.anchor_child ? `data-subtarget="${item.anchor_child}"`:''}

                    data-eventvalue="${item.eventvalue}"
                    data-scopename="${item.scopename}" 
                >${item.title}</a>`
            
            
            
            ).join('')}
                </li>
                    <li class="bg-[#000] bg-opacity-70 text-white">
                        <a class="flex flex-col items-center justify-center   border-t border-dashed border-[#fff] text-[25px] tracking-wide font-medium p-2 pt-4 w-full flex justify-center items-center cursor-pointer gotopBtn">
                            <div style="width: 20px; height: 16px;">
                                <svg width="20" height="16" viewBox="0 0 100 100">
                                    <polygon points="50,10 90,90 10,90" fill="white" />
                                </svg>
                            </div>
                            <span>TOP</span>
                        
                        </a>
                    </li>
            </ul>
        </div>
        `;
        document.body.appendChild(sideBarDom);
        
        const sideBar = sideBarDom.querySelector(".slideListBox");
        const closeBtn = sideBarDom.querySelector(".closeSideBtn");
        const showBtn = sideBarDom.querySelector(".showSideBtn");

        closeBtn.addEventListener("click",function(){
            sideBar.classList.add("hide");
            this.classList.add('hidden');
            showBtn.classList.add("show");
        });
        showBtn.addEventListener("click",function(){
            sideBar.classList.remove("hide");
            this.classList.remove("show");
            closeBtn.classList.remove("hidden");
        });
    
        const goTopBtn = document.querySelector(".gotopBtn");
        goTopBtn.addEventListener("click",function(){
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
        });
    }
    else if (blockType === "rule") {
        const elDom = this.createSection(info);
        elDom.classList.add('items-center','anchor_section','px-2','mb-5','sm:mb-8','md:mb-12');
        let contentData = this.groupedRuleData(dataArr);
        // console.log("contentData",contentData)
        elDom.innerHTML = `
        <div class="bg-white rounded-[20px] sm:rounded-[40px] flex flex-col items-center py-5 sm:py-8 w-full max-w-[800px]">
            <div class="text-[28px] sm:text-[30px] text-black font-bold">${info.section_title}</div>
            <div class="w-full flex flex-col">
                <ul class="flex flex-wrap gap-1 justify-center my-2 sm:my-4 ruleTabList sm:max-w-[96%] mx-auto">
                    ${Object.entries(contentData).map(([key, item],index)=>`
                        <li 
                            class="rule_btn ${index === 0 ? 'active': ''} flex justity-center items-center text-center md:text-[18px] cursor-pointer"
                            data-group="group${key}"
                            data-scopename="${item['tabs'][0].scopename}"
                            data-eventvalue="${item['tabs'][0].eventvalue}"
                        >
                            ${item['tabs'][0].title}</li>`
                    ).join('')}
                </ul>
                ${Object.entries(contentData).map(([key, item],index)=>`
                    <div 
                        class="rule_panel p-4 mb-4 ${index === 0 ? '': 'hidden'} lg:text-[18px]"
                       data-group="group${key}"
                    >
                        <div class="rule_li_title mt-3 my-2">活動名稱：</div>
                        <div class="indent-[1.25ch] font-medium">${item.name[0].title}</div>
                        <div class="rule_li_title mt-3 my-2">活動期間：</div>
                        <div class="pl-[1.25ch]">${item.time[0].title}</div>
                        ${item.rule.length? `
                            <div class="rule_li_title mt-3 my-2">活動規則：</div>
                            <ul class="indent-[1.25ch] pl-[2.75ch]">
                            ${item.rule.map((el)=>`<li class="indent-[-2ch]">${el.title}</li>`).join('')}</ul>`: ''
                        } 
                        ${item.usage.length ? `
                            <div class="rule_li_title mt-3 my-2">折價券使用規則：</div>
                            <ul class="indent-[1.25ch] pl-8 list-disc">
                            ${item.usage.map((el)=>`<li class="indent-[0]">${el.title}</li>`).join('')}</ul>`: ''
                        }
                        ${item.notice.length? `
                            <div class="rule_li_title mt-3 my-2">注意事項：</div>
                            <ul class="indent-[1.25ch] pl-8 list-disc text-[15px]">
                            ${item.notice.map((el)=>`<li class="indent-[0]">${el.title}</li>`).join('')}</ul>`: ''
                        }
                    </div>
                `).join('')}
            </div>
        </div>
        `;
        fragment.appendChild(elDom);
        mainDom.appendChild(fragment);
                    
    elDom.querySelector(".ruleTabList").addEventListener("click", (e) => {
            if (e.target.matches(".rule_btn")) {
              this.toggleRulePanel(e.target.dataset.group);
            }
        });

        
      $('[data-fancybox="gallery"]').fancybox({
        // Options will go here
        });
    }
    else if (blockType === "qa") {
        const elDom = this.createSection(info);
        elDom.classList.add('items-center','anchor_section','px-2','mb-2','sm:mb-8','md:mb-12');
        // let contentData = this.groupedRuleData(dataArr);
        // console.log("contentData",contentData)
        elDom.innerHTML = `
        <div class="bg-white rounded-[20px] sm:rounded-[40px] flex flex-col items-center py-5 sm:py-8 w-full max-w-[800px]">
            <div class="text-[28px] sm:text-[30px] text-black font-bold pb-2 md:pb-4 relative">
            ${dataArr[0].section_title}
            <a class="w-max absolute left-[16s0px] md:left-[240px] bottom-[8px] md:bottom-[18px]"
            href="${dataArr[0].group_name}" target="_blank"
            data-scopename="${dataArr[0].scopename}"
            data-eventvalue="${dataArr[0].group}">
               <span class="text-sm md:text-lg rounded-2xl border-[2px] text-[#39ADFF] border-solid border-[#39ADFF] px-[4px] md:px-2 py-[2px]">
               ${dataArr[0].group}</span><!--看更多&gt;-->
            </a>
            </div>
            <div class="w-full flex flex-col">
                <ul class="flex flex-wrap  w-[96%] md:w-[94%] m-auto pb-6">
                ${dataArr.map((item)=>`
                <li class="[&:not(:last-child)]:mb-4 w-full shadow-[1px_1px_1px_2px_#eee] rounded-lg">
                    <div class="px-4 py-2 md:py-4 flex justify-between items-center rounded-t-lg bg-[#FFF053] ">
                            <div class="flex w-[96%] m-auto items-start">
                                <span class="font-semibold inline-block w-[30px]  text-2xl md:text-3xl align-text-bottom pb-[2px]" style='font-family: "Noto Serif TC", "Noto Sans TC", serif; line-height:0.8;'>Q.</span>
                                <h4 class="ml-2 font-semibold text-xl md:text-2xl">${item.title}</h4>
                            </div>
                    </div>
                    <div class="answer text-start px-4 py-2 md:p-4  items-start rounded-b-lg bg-[#fff]"><!-- cursor-pointer-->
                        <div class="flex w-[96%] m-auto items-start">
                            <span class="font-semibold inline-block w-[30px]  text-2xl md:text-3xl align-text-bottom pb-[2px] text-[#000]" style='font-family: "Noto Serif TC", "Noto Sans TC", serif; line-height:0.8;'>A.</span>
                            <h4 class="ml-2 font-[400] md:text-lg">${item.description}</h4>
                        </div>
                    </div>
                    </li>
                `).join('')}

               
                </ul>
            </div>
        </div>
        `;
        fragment.appendChild(elDom);
        mainDom.appendChild(fragment);
             
        
    }
}

double11Data.prototype.goPageTop = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

double11Data.prototype.processSliderArray = (arr) => {
    arr.forEach((el) => {
        if (el.url.startsWith("#")) {
            el.isLink = false;
            [el.anchor, el.anchor_child] = el.url.split(",");
        } else {
            el.isLink = true;
        }
    });
};

double11Data.prototype.toggleRulePanel = function (group) { 
    document.getElementById("ruleSection").querySelectorAll(".rule_btn").forEach((tab) => {
        tab.classList.remove("active");
        if (tab.dataset.group === group) {
          tab.classList.add("active");
        }
      });
    // 移除所有 .rule_panel 的 show class
    document.getElementById("ruleSection").querySelectorAll(".rule_panel").forEach((panel) => {
      if (panel.dataset.group == group) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    });
}

//
double11Data.prototype.loadHeaderAndFooter = async function () {
    console.log(`${doubleEleven.eventName}`);
    // 使用split方法分割字串，並返回前兩個部分拼接的結果 ((20250201_bid_dev只取20250201_bid))
    function getSubstringBeforeSecondUnderscore(str) {
    const parts = str.split('_');
    if (parts.length >= 2) {
        return parts[0] + '_' + parts[1];  // 返回第一和第二部分拼接的結果
    }
    return str;  // 如果沒有兩個底線，返回原字符串
    }

    const isDev = window.location.href.slice(0, 10) === "https://de" || window.location.href.slice(0, 10) === "http://127";
    const footerUrl = isDev 
      ? 'https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/bbcstore/images/store/event/bid_common/http_dev/drug_footer.html'
      : 'https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/bbcstore/images/store/event/bid_common/http_www/drug_footer.html';
    
    const headerUrl = isDev 
      ? 'https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/bbcstore/images/store/event/bid_common/http_dev/header.html?v=1'
      : 'https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/bbcstore/images/store/event/bid_common/http_www/header.html?v=1';
  
    // Load footer
    fetch(footerUrl)
      .then(response => response.text())
      .then(data => {
        document.querySelector('footer').innerHTML = data;
        this.executeScripts(document.querySelector('footer'));
        // 以防萬一 手動修改LINE連結
        document.querySelectorAll(".ftrLineUrl").forEach((url)=>{
          url.href = "https://maac.io/2zAHV";
        })
      })
      .catch(error => console.error('Error loading footer:', error));
  
    // Load header 免費註冊(日標有判斷是否有登入的機制寫在S3) start---------
    fetch(headerUrl)
        //  使用 fetch 下載頭部 HTML，插入到頁面中 #pageMainHeader 標籤。
        // 修改頭部中各個元素的 data-scopename 和 data-eventvalue 屬性，用來標註不同的操作按鈕（例如註冊、LINE 按鈕、LOGO 按鈕）。
      .then(response => response.text())
      .then(data => {
        const headerElement = document.querySelector('#pageMainHeader');
        headerElement.innerHTML = data;
        this.executeScripts(headerElement);
        const btnScopeName = "header"; // 設定scopename
        document.querySelectorAll('.headerRegister').forEach(el => {
          el.setAttribute('data-scopename', getSubstringBeforeSecondUnderscore(`${doubleEleven.eventName}`));
          el.setAttribute('data-eventvalue', `${btnScopeName}_免費註冊`);
        });
        document.querySelectorAll('.headerLineButton').forEach(el => {
          el.setAttribute('data-scopename', getSubstringBeforeSecondUnderscore(`${doubleEleven.eventName}`));
          el.setAttribute('data-eventvalue', `${btnScopeName}_LINE`);
        });
        document.querySelectorAll('.header-logo > a').forEach(el => {
          el.setAttribute('data-scopename', getSubstringBeforeSecondUnderscore(`${doubleEleven.eventName}`));
          el.setAttribute('data-eventvalue', `${btnScopeName}_LOGO`);
        });
      })
      .catch(error => console.error('Error loading header:', error));
}

// 執行script
double11Data.prototype.executeScripts = function(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => {
      const newScript = document.createElement('script');
      if (script.src) {
        newScript.src = script.src;
      } else {
        newScript.textContent = script.textContent;
      }
      document.head.appendChild(newScript).parentNode.removeChild(newScript);
    });
}

double11Data.prototype.adjustScrollPositionForHash = function() {
    const headerHeight = document.querySelector("header").offsetHeight;
    const targetId = window.location.hash.slice(1); // Get the ID from the URL hash
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        window.scrollTo({
            top: targetSection.offsetTop - headerHeight,
            behavior: "smooth" // Add smooth scroll behavior for better UX
        });
    } else {
        console.error(`Section with ID ${targetId} not found.`);
    }
}


const padZero = (num) => (num < 10 ? "0" + num : num);
function updateCountdown(allStart,allEnd, prodList, dayElement,hourElement,minuteElement) {
    const now = Date.now();
    console.log('now',now);
    // const now = new Date("2024-10-07T16:59:59").getTime();
    if (now < allStart) {
      // Countdown to the first period's start
      const timeDifference = allStart - now;
      dayElement.textContent = padZero(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
      hourElement.textContent = padZero(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      minuteElement.textContent = padZero(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
      prodList[0].classList.remove('hidden');
    } else if (now > allEnd) {
      // 活動結束的情況
      document.querySelector(".countdown_box ").innerHTML= `<strong>- 優惠活動已結束 -</strong>`;
    } else {
      let currentStart;
      let currentEnd;
      prodList.forEach((card) => {
        const cardStart = new Date(card.dataset.start).getTime();
        const cardEnd = new Date(card.dataset.end).getTime();
        if (cardStart <= now && now <= cardEnd) {
            currentStart = cardStart;
            currentEnd = cardEnd;
        }
      });
      if ( currentStart && currentEnd ) {
        const timeDifference = currentEnd - now;
        if (timeDifference <= 0) {
            clearInterval(interval);
            updateCountdown(allStart, allEnd, prodList, dayElement,hourElement,minuteElement);
            return;
        }
        dayElement.textContent = padZero(Math.floor(timeDifference / (1000 * 60 * 60 * 24)));
        hourElement.textContent = padZero(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        minuteElement.textContent = padZero(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)));
        //
        document.querySelector(".prefixTextDollar").innerHTML = "優惠倒數";
        document.querySelector(".suffixTextDollar").classList.add("hidden");
        prodList.forEach((card) => {
            const cardStart = new Date(card.dataset.start).getTime();
            const cardEnd = new Date(card.dataset.end).getTime();
            if (cardStart <= now && now <= cardEnd) {
              card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }
        });
      } else {
        return;
      }

    }
}
// Function to group by position and collect blockType and associated data
double11Data.prototype.groupDataByPosition = function(data) {
    return data.reduce((acc, item) => {
      const positionKey = item.position; // Extract position as key
  
      // Initialize the position object if not already present
      if (!acc[positionKey]) {
        acc[positionKey] = {
          position: item.position,
          position_id: item.position_id,
          blockType: item.blockType, // Capture blockType
          section_title: item.section_title, // Capture blockType
          data: [] // Collect all associated data here
        };
      }
  
      acc[positionKey].data.push(item); // Push the entire object
  
      return acc;
    }, {});
}
//
double11Data.prototype.groupDataByGroup = function(data) {
    return data.reduce((acc, item) => {
      const group  = item.group; // Extract position as key
        if (!acc[group]) {
            acc[group] = [];
        }
    acc[group].push(item);
    return acc;
    }, {});
}
// 
double11Data.prototype.groupDataByRange = function(data) {
    return data.reduce((acc, item) => {
      const group  = item.group; // Extract position as key
    // If this datetime is not already a key, create it
    if (!acc[group]) {
        acc[group] = { 
          start: item.start,
          end: item.end,
          data:[]
        };
    }
    // Push the current item into the array for this datetime

    acc[group].data.push(item);
    
    return acc;
    }, {});
}

// blockType : promotion2 時間設定
double11Data.prototype.groupDataByRangePromotion2 = function(data) {
    return data.reduce((acc, item) => {
      const group  = item.group; /// 提取 `group` 作為分組的 key
     // 如果該 `group` 還沒有存在於累積器中，則創建它
    if (!acc[group]) {
        acc[group] = { 
          group: item.group,
          start: item.start,// 設定該分組的開始時間
          end: item.end,
          data:[], // 初始化一個空數組來存儲這個分組的數據
        };
    }
    // 將當前項目（`item`）推入到對應 `group` 的數據陣列中
    acc[group].data.push(item);
    
    return acc;// 返回累積結果
    }, {});// 初始值是一個空對象
}
// 整理typeC or typeC_2
double11Data.prototype.groupDataTypeC = function(data, type) {
    return data.reduce((acc, item) => {
        const group  = item.group;
        if (!acc[group]) {
            acc[group] = {
                group: item.group,
                group_name: item.group_name,
                data: [],
                hashtags: type !== "typeC" ? [] : undefined, // 只有 type 不是 "typeC" 才有 hashtags
            };
        }
        if (type === "typeC" || !item.hashtag) {
            acc[group].data.push(item);
        } else {
            acc[group].hashtags.push(item);
        }
        return acc;
    }, {});
}
// 整理typeＥ
double11Data.prototype.groupedTypeEData  = function(data) {
    return data.reduce((result, item) => {
        const groupKey = item.group;
    
        // 初始化 group 如果尚未存在於 result
        if (!result[groupKey]) {
          result[groupKey] = {
            tabs: [],
            content: []
          };
        }
    
        // 創建一個 type 對應陣列的映射表
        const typeEMapping = {
          'tab': 'tabs',
          'content': 'content'
        };
    
        // 根據 type 動態將物件推入對應的陣列
        const typeEKey = typeEMapping[item.type];
        if (typeEKey) {
          result[groupKey][typeEKey].push(item);
        }
    
        return result;
    }, {});
}
// 整理活動則
double11Data.prototype.groupedRuleData  = function(data) {
    return data.reduce((result, item) => {
        const groupKey = item.group;
    
        // 初始化 group 如果尚未存在於 result
        if (!result[groupKey]) {
          result[groupKey] = {
            tabs: [],
            rule: [],
            usage: [],
            notice: [],
            time: [],
            name: []
          };
        }
    
        // 創建一個 type 對應陣列的映射表
        const ruleMapping = {
          'tab': 'tabs',
          'rule': 'rule',
          'notice': 'notice',
          'usage': 'usage',
          'time': 'time',
          'name': 'name'
        };
    
        // 根據 type 動態將物件推入對應的陣列
        const ruleKey = ruleMapping[item.type];
        if (ruleKey) {
          result[groupKey][ruleKey].push(item);
        }
    
        return result;
    }, {});
}
//
const doubleEleven = new double11Data();
(async () => {
    doubleEleven.eventName = '20250701_bid'; /* 使用正確的 eventName */
    let isDev = window.location.href.startsWith('https://www.bibian.co.jp/') ? false : true;
    if (isDev) {
        doubleEleven.eventName = `${doubleEleven.eventName}_dev`;
    }
    const data = await doubleEleven.getPageSheetData();
    const pageData = doubleEleven.groupDataByPosition(data[doubleEleven.eventName]);
    console.log("pageData",pageData);
    // TODO:: 看看有沒有需要整理資料
    Object.keys(pageData).forEach((key) => {//Object.keys(pageData) 會返回 pageData 物件的所有鍵（key），這是一個包含 pageData 物件所有屬性名稱的陣列。
        if (pageData[key] && pageData[key]["blockType"]) { // 確保 pageData[key] 存在並且有 blockType
            // console.log("pageData[key]['blockType']",pageData[key]["blockType"]);
            // console.log("pageData[key]",pageData[key]);
            doubleEleven.renderPage(pageData[key], pageData[key]["blockType"]);
        }else{
            console.error("Uncaught (in promise) ReferenceError: key is not defined")
        }
    });
    
    doubleEleven.loadHeaderAndFooter();

    // document.querySelectorAll(".alertBtn").forEach((btn)=>{
    //     btn.addEventListener("click",function(e){
    //          e.preventDefault();
    //          const itemUrl = this.href;
    //          alert(`您即將連至日本原始網站！【提醒您】有看到喜歡的商品，記得回來找本站代購。`); // 彈出提示
    //          window.open(itemUrl, '_blank','noopener,noreferrer'); // 在新標籤頁中打開鏈接
    //     });
    //  });

     document.querySelectorAll(".alertBtn").forEach((btn) => {
        btn.addEventListener("click", function(e) {
            e.preventDefault(); // 防止默認行為
            const itemUrl = this.href;

            // 防呆處理：抓取 data-label 屬性，若無此屬性則返回空字串
            const itemLabel = this.getAttribute('data-label') || '';  // 如果 data-label 屬性不存在，設為空字串

            // 如果 itemLabel 存在且非空，才顯示 alert
            if (itemLabel.trim() !== "") {
                // alert(itemLabel); // 彈出提示訊息
                // 顯示確認框
                const userConfirmed = confirm(itemLabel); // 顯示包含"確認"和"取消"的對話框

                if (userConfirmed) {
                    // 用戶點擊了"確認"
                    window.open(itemUrl, '_blank', 'noopener,noreferrer'); // 在新標籤頁中打開鏈接
                } else {
                    // 用戶點擊了"取消"
                    console.log("用戶取消了操作");
                }
            } else {
                console.warn('未獲得有效的 data-label 屬性，使用默認行為'); // 可選的防呆訊息，方便除錯
            }
    
            // window.open(itemUrl, '_blank', 'noopener,noreferrer'); // 在新標籤頁中打開鏈接
        });
    });

     // scroll event
     let headerHeight = document.querySelector('header').clientHeight;
    
     const goTopBtn = document.querySelector(".gotopBtn");
     window.addEventListener("scroll", debounce(() => {
         setActiveTab(headerHeight);
         const scrollPosition = window.scrollY;
         const viewportHeight = window.innerHeight;
         if (scrollPosition > viewportHeight) {
             if (goTopBtn) goTopBtn.classList.remove("hidden");
         } else {
             if (goTopBtn) goTopBtn.classList.add("hidden");
         }
         const mainElement = document.querySelector('.stickBg');
        //  const scrollPosition = window.scrollY; // 获取当前滚动位置
         const mainOffset = mainElement.offsetTop;// 获取 main 元素的位置
     
         if (scrollPosition >= mainOffset) {
             mainElement.classList.add("move");
         } else {
             mainElement.classList.remove("move");
         }
     }, 0));
    
    const anchorBtnList =  document.querySelectorAll(".anchor_btn");
    const anchorSectionAll = document.querySelectorAll('.anchor_section');
    anchorBtnList.forEach((el)=>{
        el.addEventListener('click',function (event) {
            event.preventDefault(); // Prevent the default link behavior
            let target = this.dataset.target.slice(1);
            let headerHeight = document.querySelector('header').clientHeight;
            anchorSectionAll.forEach((item)=>{
                if (item.id === target ) {
                    let targetPosition = item.getBoundingClientRect().top + window.scrollY - headerHeight;
                    setTimeout(function () {
                        window.location.hash = '#'+target;
                        window.scrollTo({
                        top: targetPosition,
                        }); 
                    }, 100)
                    const subTargetId = el.dataset.subtarget;
                    if (subTargetId){
                        if (target === 'ruleSection') {
                            doubleEleven.toggleRulePanel(subTargetId);
                        } else {
                            let taSection = document.getElementById(target);
                            let tabList = taSection.querySelectorAll('.pd_sub_tab');
                            const subTabListEl = taSection.querySelector(".subTabList");
                            const pdSectionList = taSection.querySelectorAll(".prodPanel");
                            tabList.forEach((el) => {
                                if ( el.dataset.group === subTargetId ) {
                                    el.classList.add('active');
                                    let tabOffset = el.offsetLeft;
                                    let tabWidth = el.offsetWidth;
                                    const containerWidth = subTabListEl.clientWidth;
                                    const scrollPosition = tabOffset - containerWidth / 2 + tabWidth / 2;
                                    subTabListEl.scrollTo({
                                        left: scrollPosition,
                                        behavior: "smooth",
                                    });
                                    pdSectionList.forEach((panel) => {
                                        if (panel.dataset.group === subTargetId) {
                                            panel.classList.remove('hidden');
                                        } else {
                                            panel.classList.add('hidden');
                                        }
                                    });
                                } else {
                                    el.classList.remove('active');
                                }
                            });
                        }
                    } 
                }
            });
        })
    });

    function debounce(func, delay) {
        let timeout;
        return function() {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
        };
    }
    // 活動頁導覽列active設定
    function setActiveTab(headerHeight) {
        let isActiveSet = false;
        anchorSectionAll.forEach((section) => {
            let scrollPosition = window.scrollY + headerHeight;
            let sectionTop = section.offsetTop - headerHeight;
            let sectionId = section.id;
            let sectionBottom = sectionTop + section.offsetHeight;
        
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom) {
                anchorBtnList.forEach((btn) => btn.classList.remove("active"));
                let activeTab = document.querySelector(
                `.anchor_btn[data-target="#${sectionId}"]`
                );    
                if (activeTab)  {
                    activeTab.classList.add("active");
                    scrollToTab(activeTab);
                }
                isActiveSet = true;
            }
            });
        if (!isActiveSet) {
            anchorBtnList.forEach((btn) => btn.classList.remove("active"));
            scrollToTab("top");
        }
    }

    function scrollToTab(tab) {
        let tabOffset = tab.offsetLeft;
        let tabWidth = tab.offsetWidth;
        let navElWrapper = document.querySelector("#customNav");
        let drugEventNavbarWidth = navElWrapper.clientWidth;
      
        // Calculate the scroll position to center the active tab
        let scrollTo = tabOffset - (drugEventNavbarWidth / 2) + (tabWidth / 2);
        if (tab === "top") {
          navElWrapper.scrollTo({
            left: 0
          });
        }
        // Smoothly scroll to the calculated position
        navElWrapper.scrollTo({
          left: scrollTo
        });
    }

})();

window.addEventListener("load",function(){
    if (window.location.hash) {
        setTimeout(doubleEleven.adjustScrollPositionForHash, 500);
    }
});