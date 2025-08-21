import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';//App: 匯入要測試的主組件。

test('renders learn react link', () => {//名稱為 'renders learn react link'
  render(<App />);//渲染 React 元件到虛擬 DOM，模擬組件實際運作。
  //screen.getByText(/learn react/i) 從畫面中找出文字包含 "learn react" 的元素（不分大小寫）。 使用 /learn react/i 是一個正則表達式，i 表示 忽略大小寫。
  const linkElement = screen.getByText(/learn react/i);//screen: 提供查找畫面元素的工具，如 getByText()。
  //expect(...).toBeInTheDocument() 確認該元素是否真的存在於虛擬 DOM 中。
  expect(linkElement).toBeInTheDocument();
});
