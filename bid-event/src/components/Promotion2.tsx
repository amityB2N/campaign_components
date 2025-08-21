import React from 'react';
import { groupDataByRangePromotion2, Promotion2Item } from '../utils/groupDataByRangePromotion2';

interface Promotion2Props {
  data: Promotion2Item[];
}

const Promotion2: React.FC<Promotion2Props> = ({ data }) => {
  const grouped = groupDataByRangePromotion2(data);

  return (
    <div>
      {Object.values(grouped).map((group) => (
        <section key={group.group} className="promotion2-section mb-6">
          <h3 className="font-bold text-lg mb-2">{group.group}</h3>
          <div className="promotion2-list flex gap-4">
            {group.data.map((item, idx) => (
              <div key={idx} className="promotion2-item border rounded p-2 flex flex-col items-center">
                {item.image && <img src={item.image} alt={item.title} className="w-32 h-32 object-cover mb-2" />}
                <span className="font-medium">{item.title}</span>
                {/* 其他欄位可依需求補充顯示 */}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Promotion2; 