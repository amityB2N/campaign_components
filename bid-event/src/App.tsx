import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import { usePageSheetData } from './hooks/usePageSheetData';

function App() {
  // 假設 eventName 由 props 或常數給定
  const eventName = '20250701_bid';
  const { data, loading, error } = usePageSheetData(eventName);

  if (loading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;
  if (!data || !data[eventName]) return <div>查無資料</div>;

  // 依據資料結構分配
  const allData = data[eventName];
  const headerData = allData.filter((item: any) => item.position === 'header');
  const navData = allData.filter((item: any) => item.position === 'navigator');
  const bannerData = allData.filter((item: any) => item.position === 'banner');

  return (
    <div className="App">
      <Header data={headerData} />
      <NavBar navData={navData} />
      <Banner bannerData={bannerData} />
      <Main />
    </div>
  );
}

export default App;
