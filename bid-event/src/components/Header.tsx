import React from 'react';

interface HeaderProps {
  data: any[];
}

const Header: React.FC<HeaderProps> = ({ data }) => {
  // 依據 type 分類
  const logoData = data.filter((el) => el.type === 'logo')[0];
  const lineData = data.filter((el) => el.type === 'line')[0];
  const loginData = data.filter((el) => el.type === 'login')[0];

  return (
    <header id="pageMainHeader">
      <div className="container m-auto flex py-3">
        <div className="sm:w-1/2 md:w-4/12 text-left flex items-center">
          {logoData && (
            <a
              className="inline-block px-4 md:px-0"
              target="_blank"
              href={logoData.url}
              data-scopename={logoData.scopename}
              data-eventvalue={logoData.eventvalue}
            >
              <img className="h-[30px]" src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/landinglogo.svg" alt="logo" />
            </a>
          )}
        </div>
        <div className="md:flex sm:w-1/2 md:w-8/12 text-left md:text-right ml-auto pt-0 flex items-center justify-end">
          {lineData && (
            <a
              className="pr-3"
              href={lineData.url}
              data-scopename={lineData.scopename}
              data-eventvalue={lineData.eventvalue}
              target="_blank"
            >
              <img src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/event/coupon5000/images/linebtn.png" alt="line" />
            </a>
          )}
          {loginData && (
            <a
              className="mr-2 md:mr-2 py-1 px-2 md:px-4 rounded-md text-sm md:text-base font-medium border border-gray-700 text-gray-700 bg-transparent hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 flex items-center"
              href={loginData.url}
              data-scopename={loginData.scopename}
              data-eventvalue={loginData.eventvalue}
              target="_blank"
            >
              註冊會員
            </a>
          )}
          <div className="hidden md:inline-block align-middle text-sm sm:text-base">
            PChome會員註冊送<span className="text-base sm:text-lg">¥300</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 