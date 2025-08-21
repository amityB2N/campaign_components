export interface Promotion2Item {
  group: string;
  start: string;
  end: string;
  // 其他欄位
  [key: string]: any;
}

export interface Promotion2Group {
  group: string;
  start: string;
  end: string;
  data: Promotion2Item[];
}

export function groupDataByRangePromotion2(data: Promotion2Item[]): Record<string, Promotion2Group> {
  return data.reduce((acc, item) => {
    const group = item.group;
    if (!acc[group]) {
      acc[group] = {
        group: item.group,
        start: item.start,
        end: item.end,
        data: [],
      };
    }
    acc[group].data.push(item);
    return acc;
  }, {} as Record<string, Promotion2Group>);
} 