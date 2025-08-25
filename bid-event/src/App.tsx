import React from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import NavBar from './components/NavBar';
import Banner from './components/Banner';
import Top3Section from './components/Top3Section';
import Qa from './components/Qa';
import Rule from './components/Rule';
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
  const typeEData = allData.filter((item: any) => item.blockType === 'typeE');
  const qaData = allData.filter((item: any) => item.blockType === 'qa');
  const ruleData = allData.filter((item: any) => item.blockType === 'rule');

  return (
    <div className="App">
      <Header data={headerData} />
      <NavBar navData={navData} />
      <Banner bannerData={bannerData} />
      {typeEData.length > 0 && (
        <Top3Section
          data={typeEData}
          positionId="top3-section-1"
        />
      )}
      {qaData.length > 0 && (
        <Qa data={qaData} positionId="qaSection" />
      )}
      {ruleData.length > 0 && (
        <Rule data={ruleData} positionId="ruleSection" />
      )}
      <Main />
    </div>
  );
}

export default App;
