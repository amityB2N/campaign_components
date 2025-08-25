import React, { useState, memo, useMemo } from 'react';

interface BannerItem {
  image: string;
  title: string;
  start: number | string;
  end: number | string;
  type?: string;
  url?: string;
  ori_price?: string;
  price?: string;
  eventvalue?: string;
  scopename?: string;
  isLink?: boolean;
  anchor?: string;
  anchor_child?: string;
}

interface BannerProps {
  bannerData: BannerItem[];
}

// 背景圖元件
const BannerBg: React.FC<{ bgItem: BannerItem }> = memo(({ bgItem }) => (
  <picture>
    <img
      src={bgItem.title}
      className="w-full aspect-[800/469] h-auto object-cover min-[800px]:opacity-0"
      loading="lazy"
      alt="banner"
    />
  </picture>
));

// 左側輪播元件
const BannerLeftSlider: React.FC<{
  txtSliderArr: BannerItem[];
  leftIdx: number;
  onPrev: () => void;
  onNext: () => void;
}> = memo(({ txtSliderArr, leftIdx, onPrev, onNext }) => {
  if (txtSliderArr.length === 0) return null;
  const item = txtSliderArr[leftIdx];
  return (
    <div className="h-full flex items-center">
      <button onClick={onPrev}>&lt;</button>
      <a
        data-scopename={item.scopename}
        data-eventvalue={item.eventvalue}
        href={item.isLink ? item.url : undefined}
        target={item.isLink ? '_blank' : undefined}
        className={item.isLink ? '' : 'anchor_btn'} rel="noreferrer"
      >
        <img
          src={item.image}
          className="h-full object-cover mx-auto"
          loading="lazy"
          alt={item.eventvalue}
        />
      </a>
      <button onClick={onNext}>&gt;</button>
    </div>
  );
});

// 右側輪播元件
const BannerRightSlider: React.FC<{
  prodSliderArr: BannerItem[];
  rightIdx: number;
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}> = memo(({ prodSliderArr, rightIdx, onPrev, onNext, onDotClick }) => {
  if (prodSliderArr.length === 0) return null;
  const item = prodSliderArr[rightIdx];
  return (
    <div className="h-full flex items-center relative">
      {/* 左箭頭 */}
      <div className="z-[4] absolute top-[44%] w-[24px] sm:w-[34px] p-1 left-0 bnSliderPrev cursor-pointer" onClick={onPrev}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="圖層_1" x="0px" y="0px" viewBox="0 0 24 28" xmlSpace="preserve">
          <path d="M1.1,15.9c-1.4-0.8-1.4-2.9,0-3.7L20.3,1.1c1.4-0.8,3.2,0.2,3.2,1.8v22.2c0,1.6-1.8,2.7-3.2,1.8L1.1,15.9z" fill="black" transform="scale(0.8, 0.8)"/>
        </svg>
      </div>
      
      {/* 右箭頭 */}
      <div className="z-[4] absolute top-[44%] w-[24px] sm:w-[34px] p-1 right-0 bnSliderNext cursor-pointer" onClick={onNext}>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="圖層_1" x="0px" y="0px" viewBox="0 0 24 28" xmlSpace="preserve">
          <path d="M1.1,15.9c-1.4-0.8-1.4-2.9,0-3.7L20.3,1.1c1.4-0.8,3.2,0.2,3.2,1.8v22.2c0,1.6-1.8,2.7-3.2,1.8L1.1,15.9z" fill="black" transform="scale(-0.8, 0.8) translate(-24, 0)"/>
        </svg>
      </div>

      {/* 點點導航 */}
      {prodSliderArr.length > 1 && (
        <div className="z-[4] absolute bottom-[10%] left-1/2 transform -translate-x-1/2 flex space-x-2">
          {prodSliderArr.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === rightIdx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => onDotClick(index)}
            />
          ))}
        </div>
      )}

      <a
        href={item.isLink ? item.url : undefined}
        target={item.isLink ? '_blank' : undefined}
        className={`swiper-slide cs_slide flex-col justify-end items-center ${item.isLink ? '' : 'anchor_btn'}`}
        data-scopename={item.scopename}
        data-eventvalue={item.eventvalue} rel="noreferrer"
      >
        <img
          src={item.image}
          className="w-auto h-[75%] min-[800px]:h-[78%] aspect-[1/1] object-contain"
          loading="lazy"
          alt={item.eventvalue}
        />
        <div className="flex flex-col w-full h-[35%] min-[800px]:h-[24%]">
          <div className="flex h-full w-full mx-auto">
            <div className="px-2 flex flex-col items-center justify-center w-full leading-[1.1]">
              <span className="max-sm:text-[12px] lg:text-[24px] mb-[2px] sm:mb-1 text-[#fff]">{item.ori_price}</span>
              <div className="sm:text-[22px] lg:text-[34px] font-black text-[#fff]">
                {item.price}
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
});

const Banner: React.FC<BannerProps> = ({ bannerData }) => {
  // const now = Date.now();
  const now = new Date("2025-06-01T12:00:00").getTime(); // 模擬6月1日時間

  // 用 useMemo 避免不必要的重算
  const { currentBgItem, txtSliderArr, prodSliderArr } = useMemo(() => {
    const bgImgList = bannerData.filter((el) => el.type === 'bg');
    const bgImg = bgImgList.filter((obj) => {
      const start = new Date(obj.start).getTime();
      const end = new Date(obj.end).getTime();
      return start <= now && now <= end;
    });
    const currentBgItem = bgImg.length ? bgImg[0] : bgImgList[0];
    const txtSliderArr = bannerData.filter((el) => el.type === 'left');
    const prodSliderArr = bannerData.filter(
      (el) =>
        el.type === 'right' &&
        new Date(el.start).getTime() <= now &&
        now <= new Date(el.end).getTime()
    );
    return { currentBgItem, txtSliderArr, prodSliderArr };
  }, [bannerData, now]);

  // 輪播狀態
  const [leftIdx, setLeftIdx] = useState(0);
  const [rightIdx, setRightIdx] = useState(0);

  // 輪播切換
  const nextLeft = () => setLeftIdx((prev) => (prev + 1) % txtSliderArr.length);
  const prevLeft = () => setLeftIdx((prev) => (prev - 1 + txtSliderArr.length) % txtSliderArr.length);
  const nextRight = () => setRightIdx((prev) => (prev + 1) % prodSliderArr.length);
  const prevRight = () => setRightIdx((prev) => (prev - 1 + prodSliderArr.length) % prodSliderArr.length);

  if (!currentBgItem) return null;

  return (
    <section
      className="anchor_section banner_area relative z-[3]"
      style={{ backgroundImage: `url(${currentBgItem.image})` }}
    >
      {/* 這段用來印出 bannerData JSON */}
    {/* <pre style={{ color: 'white', background: 'rgba(0,0,0,0.5)', padding: 10, maxHeight: 200, overflow: 'auto' }}>
      {JSON.stringify(bannerData, null, 2)}
    </pre> */}

      <div className="max-w-[800px] w-full mx-auto relative h-full">
        <BannerBg bgItem={currentBgItem} />
        <div className="absolute left-0 top-0 w-full h-full flex">
          {/* 左側輪播 */}
          <div className="bn_left_area w-[50%] min-[800px]:w-[55%] h-full flex items-end overflow-hidden relative p-[0_0_2.5%_8%] min-[800px]:p-[0_0_4%_4%]">
            <div className="w-[96%] min-[800px]:w-[85%] h-[24%] aspect-[320/115] h-auto">
              <BannerLeftSlider
                txtSliderArr={txtSliderArr}
                leftIdx={leftIdx}
                onPrev={prevLeft}
                onNext={nextLeft}
              />
            </div>
          </div>
          {/* 右側輪播 */}
          <div className="bn_right_area w-[50%] min-[800px]:w-[45%] h-full flex items-end p-[0_5.5%_4.5%_4%] min-[800px]:p-[0_3%_5.5%_1.5%]">
            <div className="prod_slider_box h-full w-full relative pt-[22%]">
              <BannerRightSlider
                prodSliderArr={prodSliderArr}
                rightIdx={rightIdx}
                onPrev={prevRight}
                onNext={nextRight}
                onDotClick={setRightIdx}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;