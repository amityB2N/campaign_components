import React from 'react';

interface NavItem {
  url: string;
  title: string;
  eventvalue?: string;
  scopename?: string;
  type?: string;
  start?: string;
  end?: string;
}

interface NavBarProps {
  navData: NavItem[];
}

const NavBar: React.FC<NavBarProps> = ({ navData }) => {
  const now = Date.now();
  // 根據 temp 類型與時間篩選
  const filteredNav = navData.filter((obj) => {
    if (obj.type === 'temp' && obj.start && obj.end) {
      const start = new Date(obj.start).getTime();
      const end = new Date(obj.end).getTime();
      return start <= now && now <= end;
    }
    return obj.type !== 'temp';
  });

  return (
    <nav id="customNav">
      <ul className="w-fit flex mx-auto flex-nowrap">
        {filteredNav.map((item, idx) => (
          <a
            key={idx}
            href={item.url}
            target="_blank"
            className={`font-medium bg-white py-1 px-5 w-max flex-nowrap flex main_nav_tab bid ${item.url.startsWith('#') ? 'anchor_btn' : ''}`}
            data-target={item.url}
            data-eventvalue={item.eventvalue}
            data-scopename={item.scopename}
          >
            {item.title}
          </a>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar; 