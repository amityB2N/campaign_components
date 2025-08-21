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
        className={item.isLink ? '' : 'anchor_btn'}
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
}> = memo(({ prodSliderArr, rightIdx, onPrev, onNext }) => {
  if (prodSliderArr.length === 0) return null;
  const item = prodSliderArr[rightIdx];
  return (
    <div className="h-full flex items-center">
      <button onClick={onPrev}>&lt;</button>
      <a
        href={item.isLink ? item.url : undefined}
        target={item.isLink ? '_blank' : undefined}
        className={`swiper-slide cs_slide flex-col justify-end items-center ${item.isLink ? '' : 'anchor_btn'}`}
        data-scopename={item.scopename}
        data-eventvalue={item.eventvalue}
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
      <button onClick={onNext}>&gt;</button>
    </div>
  );
});

const Banner: React.FC<BannerProps> = ({ bannerData }) => {
  const now = Date.now();

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
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;