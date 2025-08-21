import { useState, useEffect } from 'react';

export function usePageSheetData(eventName: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      const apiUrl = `https://www.bibian.co.jp/api/events/bbn_sheet.php?act=getgooglesheetcache&cachefilename=${eventName}`;
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError('資料取得失敗');
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [eventName]);

  return { data, loading, error };
} 