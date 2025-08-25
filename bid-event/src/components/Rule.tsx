import React, { useMemo, useState } from 'react';

interface RawRuleItem {
  section_title?: string;
  group: string;      // 分組鍵 (數字或字串)
  type: 'tab' | 'rule' | 'notice' | 'usage' | 'time' | 'name';
  title: string;      // 內容/標題
  scopename?: string; // tab 追蹤
  eventvalue?: string;// tab 追蹤
}

interface GroupedRuleData {
  tabs: RawRuleItem[];
  rule: RawRuleItem[];
  usage: RawRuleItem[];
  notice: RawRuleItem[];
  time: RawRuleItem[];
  name: RawRuleItem[];
}

interface RuleProps {
  data: RawRuleItem[];
  positionId?: string;
}

const Rule: React.FC<RuleProps> = ({ data, positionId = 'ruleSection' }) => {
  const safeData = Array.isArray(data) ? data : [];
  const sectionTitle = safeData[0]?.section_title || '';

  // 參照 bid_js.js -> groupedRuleData
  const groups = useMemo(() => {
    const result: Record<string, GroupedRuleData> = {};
    safeData.forEach((item) => {
      const key = String(item.group);
      if (!result[key]) {
        result[key] = { tabs: [], rule: [], usage: [], notice: [], time: [], name: [] };
      }
      const mapping: Record<string, keyof GroupedRuleData> = {
        tab: 'tabs',
        rule: 'rule',
        notice: 'notice',
        usage: 'usage',
        time: 'time',
        name: 'name',
      };
      const bucket = mapping[item.type];
      if (bucket) {
        result[key][bucket].push(item);
      }
    });
    // 轉成陣列以便渲染，並穩定排序 key（以數字大小或字串排序）
    return Object.entries(result)
      .sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0))
      .map(([key, value]) => ({ key, ...value }));
  }, [safeData]);

  const [activeIdx, setActiveIdx] = useState(0);

  if (groups.length === 0) return null;

  return (
    <section id={positionId} className="items-center anchor_section px-2 mb-5 sm:mb-8 md:mb-12">
      <div className="bg-white rounded-[20px] sm:rounded-[40px] flex flex-col items-center py-5 sm:py-8 w-full max-w-[800px]">
        {/* 區塊標題 */}
        <div className="text-[28px] sm:text-[30px] text-black font-bold">{sectionTitle}</div>

        <div className="w-full flex flex-col">
          {/* Tabs */}
          <ul
            className="flex flex-wrap gap-1 justify-center my-2 sm:my-4 ruleTabList sm:max-w-[96%] mx-auto"
            role="tablist"
            aria-label="活動規則分頁"
          >
            {groups.map((group, index) => (
              <li
                key={group.key}
                role="tab"
                tabIndex={index === activeIdx ? 0 : -1}
                aria-selected={index === activeIdx}
                aria-controls={`panel-${group.key}`}
                className={`rule_btn flex justity-center items-center text-center md:text-[18px] cursor-pointer px-3 py-1 rounded transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#39ADFF] ${
                  index === activeIdx
                    ? 'bg-[#39ADFF]/10 text-[#39ADFF] border border-[#39ADFF]'
                    : 'bg-transparent text-black hover:bg-black/5'
                }`}
                data-group={`group${group.key}`}
                data-scopename={group.tabs[0]?.scopename || ''}
                data-eventvalue={group.tabs[0]?.eventvalue || ''}
                onClick={() => setActiveIdx(index)}
              >
                {group.tabs[0]?.title || `群組${group.key}`}
              </li>
            ))}
          </ul>

          {/* Panels */}
          {groups.map((group, index) => (
            <div
              key={`panel-${group.key}`}
              id={`panel-${group.key}`}
              role="tabpanel"
              aria-labelledby={`tab-${group.key}`}
              className={`rule_panel p-4 mb-4 lg:text-[18px] transition-all duration-300 ease-out overflow-hidden ${
                index === activeIdx ? 'opacity-100 max-h-[2000px]' : 'opacity-0 max-h-0'
              }`}
              data-group={`group${group.key}`}
            >
              {/* 活動名稱 */}
              {group.name.length > 0 && (
                <>
                  <div className="rule_li_title mt-3 my-2">活動名稱：</div>
                  <div className="indent-[1.25ch] font-medium">{group.name[0].title}</div>
                </>
              )}

              {/* 活動期間 */}
              {group.time.length > 0 && (
                <>
                  <div className="rule_li_title mt-3 my-2">活動期間：</div>
                  <div className="pl-[1.25ch]">{group.time[0].title}</div>
                </>
              )}

              {/* 活動規則 */}
              {group.rule.length > 0 && (
                <>
                  <div className="rule_li_title mt-3 my-2">活動規則：</div>
                  <ul className="indent-[1.25ch] pl-[2.75ch] list-none">
                    {group.rule.map((el, i) => (
                      <li key={`rule-${i}`} className="indent-[-2ch]">{el.title}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* 折價券使用規則 */}
              {group.usage.length > 0 && (
                <>
                  <div className="rule_li_title mt-3 my-2">折價券使用規則：</div>
                  <ul className="indent-[1.25ch] pl-8 list-disc">
                    {group.usage.map((el, i) => (
                      <li key={`usage-${i}`} className="indent-[0]">{el.title}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* 注意事項 */}
              {group.notice.length > 0 && (
                <>
                  <div className="rule_li_title mt-3 my-2">注意事項：</div>
                  <ul className="indent-[1.25ch] pl-8 list-disc text-[15px]">
                    {group.notice.map((el, i) => (
                      <li key={`notice-${i}`} className="indent-[0]">{el.title}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rule;
