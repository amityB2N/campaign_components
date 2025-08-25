# Top3Section 組件說明

## 概述
`Top3Section` 是一個基於 React TypeScript 的輪播組件，用於展示商品列表。該組件支援自動輪播、手動導航和響應式設計。

## 功能特點

### 🎯 核心功能
- **自動輪播**：每 3 秒自動切換到下一張
- **手動導航**：支援箭頭按鈕和分頁點切換
- **響應式設計**：適配不同螢幕尺寸
- **商品展示**：支援商品圖片、價格、標籤等資訊

### 🎨 視覺特色
- 圓角設計的白色背景容器
- 商品標籤（ribbon）支援自定義顏色
- 平滑的過渡動畫效果
- 懸停效果和互動反饋

## 使用方式

### 基本用法
```tsx
import Top3Section from './components/Top3Section';

const MyComponent = () => {
  const data = [
    {
      tabs: [
        {
          title: "熱門商品 TOP 3",
          url: "https://example.com/top3",
          scopename: "top3_section",
          eventvalue: "hot_products"
        }
      ],
      content: [
        {
          title: "商品名稱",
          url: "https://example.com/product",
          scopename: "product",
          eventvalue: "product_click",
          image: "/images/product.jpg",
          ori_price: "NT$ 1,200",
          price: "NT$ 899",
          ribbon: "限時特價", // 可選
          label: "#FF0000"    // 可選
        }
      ]
    }
  ];

  return (
    <Top3Section
      sectionTitleImage="/images/section-title.jpg"
      data={data}
      positionId="top3-section-1"
    />
  );
};
```

## Props 說明

### Top3SectionProps

| 屬性 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `sectionTitleImage` | `string` | ✅ | 區塊標題圖片 URL |
| `data` | `Top3SectionData[]` | ✅ | 輪播數據陣列 |
| `positionId` | `string` | ✅ | 組件唯一識別碼 |

### Top3SectionData

| 屬性 | 類型 | 說明 |
|------|------|------|
| `tabs` | `Top3Item[]` | 標籤資訊陣列 |
| `content` | `Top3ContentItem[]` | 商品內容陣列 |

### Top3Item

| 屬性 | 類型 | 說明 |
|------|------|------|
| `title` | `string` | 標籤標題 |
| `url` | `string` | 連結 URL |
| `scopename` | `string` | 追蹤範圍名稱 |
| `eventvalue` | `string` | 事件值 |

### Top3ContentItem

| 屬性 | 類型 | 必填 | 說明 |
|------|------|------|------|
| `title` | `string` | ✅ | 商品標題 |
| `url` | `string` | ✅ | 商品連結 |
| `scopename` | `string` | ✅ | 追蹤範圍名稱 |
| `eventvalue` | `string` | ✅ | 事件值 |
| `image` | `string` | ✅ | 商品圖片 URL |
| `ori_price` | `string` | ✅ | 原價 |
| `price` | `string` | ✅ | 現價 |
| `ribbon` | `string` | ❌ | 標籤文字 |
| `label` | `string` | ❌ | 標籤背景色 |

## 樣式類別

### 主要容器
- `anchor_section`：錨點區塊
- `max-w-[800px]`：最大寬度限制
- `rounded-[0_0_20px_20px]`：底部圓角

### 響應式設計
- `max-[800px]:px-2`：小螢幕內邊距
- `sm:mb-8`：中等螢幕下邊距
- `md:mb-12`：大螢幕下邊距

### 輪播控制
- 自動輪播間隔：3 秒
- 過渡動畫：500ms ease-in-out
- 分頁點樣式：圓形，當前項目放大 1.25 倍

## 注意事項

1. **圖片路徑**：確保所有圖片路徑正確且可訪問
2. **數據結構**：必須按照指定的介面結構提供數據
3. **追蹤屬性**：`scopename` 和 `eventvalue` 用於數據追蹤
4. **標籤顏色**：`label` 屬性支援任何有效的 CSS 顏色值

## 範例檔案

參考 `Top3SectionExample.tsx` 檔案查看完整的使用範例。
