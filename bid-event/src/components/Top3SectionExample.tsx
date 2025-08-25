import React from 'react';
import Top3Section from './Top3Section';

// 範例數據
const exampleData = [
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
        title: "超值商品 A",
        url: "https://example.com/product-a",
        scopename: "product_a",
        eventvalue: "product_a_click",
        image: "/images/product-a.jpg",
        ori_price: "NT$ 1,200",
        price: "NT$ 899",
        ribbon: "限時特價",
        label: "#FF0000"
      },
      {
        title: "熱銷商品 B",
        url: "https://example.com/product-b",
        scopename: "product_b",
        eventvalue: "product_b_click",
        image: "/images/product-b.jpg",
        ori_price: "NT$ 800",
        price: "NT$ 599",
        ribbon: "熱銷",
        label: "#FF6B35"
      },
      {
        title: "新品推薦 C",
        url: "https://example.com/product-c",
        scopename: "product_c",
        eventvalue: "product_c_click",
        image: "/images/product-c.jpg",
        ori_price: "NT$ 1,500",
        price: "NT$ 1,299"
      }
    ]
  },
  {
    tabs: [
      {
        title: "精選推薦",
        url: "https://example.com/featured",
        scopename: "featured_section",
        eventvalue: "featured_products"
      }
    ],
    content: [
      {
        title: "精選商品 D",
        url: "https://example.com/product-d",
        scopename: "product_d",
        eventvalue: "product_d_click",
        image: "/images/product-d.jpg",
        ori_price: "NT$ 2,000",
        price: "NT$ 1,599",
        ribbon: "精選",
        label: "#4CAF50"
      },
      {
        title: "特價商品 E",
        url: "https://example.com/product-e",
        scopename: "product_e",
        eventvalue: "product_e_click",
        image: "/images/product-e.jpg",
        ori_price: "NT$ 1,800",
        price: "NT$ 1,299",
        ribbon: "特價",
        label: "#FF9800"
      }
    ]
  }
];

const Top3SectionExample: React.FC = () => {
  return (
    <div>
      <Top3Section
        sectionTitleImage="/images/section-title.jpg"
        data={exampleData}
        positionId="top3-section-1"
      />
    </div>
  );
};

export default Top3SectionExample;
