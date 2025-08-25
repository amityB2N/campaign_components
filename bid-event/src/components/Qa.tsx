import React from 'react';

interface QAItem {
  section_title: string;
  group_name: string; // link url
  scopename: string;
  group: string; // link label text
  title: string; // question
  description: string; // answer
}

interface QAProps {
  data: QAItem[];
  positionId?: string;
}

const Qa: React.FC<QAProps> = ({ data, positionId = 'qaSection' }) => {
  if (!data || data.length === 0) return null;

  const sectionTitle = data[0]?.section_title || '';
  const sectionLink = data[0]?.group_name || '';
  const scopeName = data[0]?.scopename || '';
  const linkLabel = data[0]?.group || '';

  return (
    <section id={positionId} className="items-center anchor_section px-2 mb-2 sm:mb-8 md:mb-12">
      <div className="bg-white rounded-[20px] sm:rounded-[40px] flex flex-col items-center py-5 sm:py-8 w-full max-w-[800px]">
        <div className="text-[28px] sm:text-[30px] text-black font-bold pb-2 md:pb-4 relative">
          {sectionTitle}
          {sectionLink && (
            <a
              className="w-max absolute left-[160px] md:left-[240px] bottom-[8px] md:bottom-[18px]"
              href={sectionLink}
              target="_blank"
              rel="noreferrer"
              data-scopename={scopeName}
              data-eventvalue={linkLabel}
            >
              <span className="text-sm md:text-lg rounded-2xl border-[2px] text-[#39ADFF] border-solid border-[#39ADFF] px-[4px] md:px-2 py-[2px]">
                {linkLabel}
              </span>
            </a>
          )}
        </div>
        <div className="w-full flex flex-col">
          <ul className="flex flex-wrap w-[96%] md:w-[94%] m-auto pb-6">
            {data.map((item, idx) => (
              <li key={`${item.title}-${idx}`} className="[&:not(:last-child)]:mb-4 w-full shadow-[1px_1px_1px_2px_#eee] rounded-lg">
                <div className="px-4 py-2 md:py-4 flex justify-between items-center rounded-t-lg bg-[#FFF053]">
                  <div className="flex w-[96%] m-auto items-start">
                    <span
                      className="font-semibold inline-block w-[30px] text-2xl md:text-3xl align-text-bottom pb-[2px]"
                      style={{ fontFamily: 'Noto Serif TC, Noto Sans TC, serif', lineHeight: 0.8 }}
                    >
                      Q.
                    </span>
                    <h4 className="ml-2 font-semibold text-xl md:text-2xl">{item.title}</h4>
                  </div>
                </div>
                <div className="answer text-start px-4 py-2 md:p-4 items-start rounded-b-lg bg-[#fff]">
                  <div className="flex w-[96%] m-auto items-start">
                    <span
                      className="font-semibold inline-block w-[30px] text-2xl md:text-3xl align-text-bottom pb-[2px] text-[#000]"
                      style={{ fontFamily: 'Noto Serif TC, Noto Sans TC, serif', lineHeight: 0.8 }}
                    >
                      A.
                    </span>
                    <h4 className="ml-2 font-[400] md:text-lg">{item.description}</h4>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Qa;
