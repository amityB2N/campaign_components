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
  sectionTitleImage: string;
  data: Top3SectionData[];
  positionId: string;
}

const Top3Section: React.FC<Top3SectionProps> = ({ sectionTitleImage, data, positionId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<HTMLDivElement>(null);

  // 自動輪播功能
  useEffect(() => {
    if (data.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % data.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.length]);

  // 手動切換輪播
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <section className="items-center anchor_section mb-2 sm:mb-8 md:mb-12 max-[800px]:px-2">
      <div className="w-full max-w-[800px] mx-auto">
        <img src={sectionTitleImage} className="w-full h-auto aspect-[800/133]" alt="section title" />
        <div className="w-full rounded-[0_0_20px_20px] sm:rounded-[0_0_40px_40px] overflow-hidden bg-white md:pl-8">
          <div className="px-3 mt-3 md:mt-8 md:mb-12 relative">
            {/* 輪播容器 */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {data.map((item, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-[#E4E4E4] p-3">
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
                      
                      {item.content.length > 0 && (
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
                                      className="absolute top-0 left-0 z-[2] bg-[#FF0000] text-white font-bold text-[12px] sm:text-[18px] px-2 py-1"
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
            {data.length > 1 && (
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
          {data.length > 1 && (
            <div className="flex justify-center relative mt-5 mb-5 md:mb-8">
              {data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${
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
