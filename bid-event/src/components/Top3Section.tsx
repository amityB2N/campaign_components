import React, { useState, useEffect, useRef } from 'react';

interface Top3Item {
  title: string;
  url: string;
  scopename: string;
  eventvalue: string;
}

interface Top3ContentItem {
  title: string;
  url: string;
  scopename: string;
  eventvalue: string;
  image: string;
  ori_price: string;
  price: string;
  ribbon?: string;
  label?: string;
}

interface Top3SectionData {
  tabs: Top3Item[];
  content: Top3ContentItem[];
}

interface Top3SectionProps {
  data: any[];
  positionId: string;
}

// 整理 typeE 數據的函數
const groupedTypeEData = (data: any[]) => {
  return data.reduce((result: any, item: any) => {
    const groupKey = item.group;

    // 初始化 group 如果尚未存在於 result
    if (!result[groupKey]) {
      result[groupKey] = {
        tabs: [],
        content: []
      };
    }

    // 創建一個 type 對應陣列的映射表
    const typeEMapping: { [key: string]: string } = {
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
};

const Top3Section: React.FC<Top3SectionProps> = ({ data, positionId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contentData, setContentData] = useState<Top3SectionData[]>([]);
  const swiperRef = useRef<HTMLDivElement>(null);

  // 處理數據
  useEffect(() => {
    if (data && data.length > 0) {
      const grouped = groupedTypeEData(data);
      const contentArray = Object.values(grouped) as Top3SectionData[];
      setContentData(contentArray);
    }
  }, [data]);

  // 自動輪播功能
  useEffect(() => {
    if (contentData.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contentData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [contentData.length]);

  // 手動切換輪播
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % contentData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + contentData.length) % contentData.length);
  };

  if (!data || data.length === 0) {
    return null;
  }

  const sectionTitleImage = data[0]?.section_title_image;

  return (
    <section className="items-center anchor_section mb-2 sm:mb-8 md:mb-12 max-[800px]:px-2">
      <div className="w-full max-w-[800px] mx-auto">
        {sectionTitleImage && (
          <img src={sectionTitleImage} className="w-full h-auto aspect-[800/133]" alt="section title" />
        )}
        <div className="w-full rounded-[0_0_20px_20px] sm:rounded-[0_0_40px_40px] overflow-hidden bg-white md:pl-8">
          <div className="px-3 mt-3 md:mt-8 md:mb-12 relative">
            {/* 輪播容器 */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {contentData.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-[#E4E4E4] p-3">
                      {item.tabs && item.tabs.length > 0 && (
                        <a 
                          className="hover:opacity-50 transition"
                          href={item.tabs[0].url} 
                          target="_blank"
                          rel="noreferrer"
                          data-scopename={item.tabs[0].scopename}
                          data-eventvalue={item.tabs[0].eventvalue}
                        >
                          <h3 className="text-2xl font-bold mb-3 border-b-2 border-black inline-block">
                            {item.tabs[0].title}
                          </h3>
                        </a>
                      )}
                      
                      {item.content && item.content.length > 0 && (
                        <ul className="list-disc text-[15px] space-y-3 list-none">
                          {item.content.map((el, contentIndex) => (
                            <li key={contentIndex}>
                              <a 
                                className="flex items-stretch relative"
                                href={el.url} 
                                target="_blank"
                                rel="noreferrer"
                                data-scopename={el.scopename}
                                data-eventvalue={el.eventvalue}
                              >
                                <div className="w-[38%] relative">
                                  {el.ribbon && (
                                    <span 
                                      className="absolute top-0 left-0 z-[2] text-white font-bold text-[12px] sm:text-[18px] px-2 py-1"
                                      style={{ backgroundColor: el.label || '#FF0000' }}
                                    >
                                      {el.ribbon}
                                    </span>
                                  )}
                                  <img 
                                    src={el.image} 
                                    alt={el.title} 
                                    className="h-full w-full object-cover bg-white"
                                  />
                                </div>
                                
                                <div className="w-[62%] flex flex-col justify-between pl-[6px]">
                                  <p className="text-[14px] text-[#787878] leading-snug">{el.title}</p>
                                  <p className="text-base text-gray-800 line-through">{el.ori_price}</p>
                                  <p className="text-xl font-bold text-black">{el.price}</p>
                                </div>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 導航箭頭 */}
            {contentData.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* 分頁點 */}
          {contentData.length > 1 && (
            <div className="flex justify-center relative mt-5 mb-5 md:mb-8">
              {contentData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 bullet_type_e bid ${
                    index === currentSlide 
                      ? 'bg-black scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Top3Section;
