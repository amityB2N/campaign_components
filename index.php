
<?php
  include_once "/home/bibian/www/event/configure.php";

  // 設定活動開始及結束時間，以及設定的警語
  $startTime = '2025-06-01 00:00:00'; // 2024-09-01 00:00:00 活動開始時間
  $endTime = '2025-06-30 23:59:59'; // 活動結束時間 // 2024-09-30 23:59:59 結束時間 => 常態活動的可以拿掉 或給空值 e.g., $endTime = '';
  $startAlertMessage = '敬請期待'; // 活動尚未開始的提醒文案
  $endAlertMessage = '活動已結束'; // 活動已經結束的提醒文案

  // 區塊內不要修改 ========== start
  $isDev = false;

  if(preg_match("/dev.bibian/", $_SERVER["SERVER_NAME"])) {
    $isDev = true;
  }
  if($_GET['is_mkt_test'] == "y") {
    $isDev = true;
  }
  if($isDev) {
    $startTime = date('Y-m-d 00:00:00', strtotime('-30 day'));  // for開發時間 
    $endTime = date('Y-m-d 23:59:59', strtotime('+90 day'));
  }

  showCampaginStartAlert($startTime, $startAlertMessage, true);
  showCampaginEndAlert($endTime, $endAlertMessage); // 結束時間 => 常態的可以拿掉，上面$endTime給空值的話就不用特別拿掉
  // 區塊內不要修改 ========== end
?>
<!DOCTYPE html>
<html lang="zh-TW">

<head>
   <meta charset="UTF-8" />

   
   <meta name="viewport" content="width=device-width, initial-scale=1.0">

   <meta http-equiv="X-UA-Compatible" content="ie=edge">



   <!-- ----- -->
   <title>【日本拍賣】現折9999吃到飽，首購50%OFF！空運全面95折↘︎各大品牌精品包、球鞋、卡牌、服飾鑑定安心購，JDirectItems Auction超值代購歡樂送！</title>

   <meta name="description" content=" PChome子公司安心購物有保障，Bibian 比比昂值得信賴的海外代標代買代購第一品牌！刷卡免海外手續費，海外購物享五大保證，消費更放心！">

   <meta name="keywords" content="比比昂,日本Yahoo拍賣,JDirectItems Auction,日本代標,日本代買,日本代購,鑑定服務">

   <meta property="og:description" content=" PChome子公司安心購物有保障，Bibian 比比昂值得信賴的海外代標代買代購第一品牌！刷卡免海外手續費，海外購物享五大保證，消費更放心！">

   <meta property="og:title" content=" 【日本拍賣】現折9999吃到飽，首購50%OFF！空運全面95折↘︎各大品牌精品包、球鞋、卡牌、服飾鑑定安心購，JDirectItems Auction超值代購歡樂送！">

   <meta property="og:site_name" content="比比昂日本拍賣代標代購，一番賞玩具公仔、相機鏡頭、音響擴大機、露營釣具、汽車改裝通通享優惠，專業玩家挖寶聖地，獨家鑑定服務新上線，立即體驗ＧＯ">

   <meta property="og:url" content="https://www.bibian.co.jp/event/2025bid_0601event/">

   <meta property="og:image" content="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/bid/images/event/2025/0601event/images/og-img.jpg">

   <meta property="og:type" content="website">
   <!-- ----- -->




   <meta property="fb:app_id" content="140253170521788" />

   <link rel="shortcut icon" href="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/pchome/www-header/image/Bibian-icon-Bidding.png?t=201905" type="image/x-icon" />
   <!-- <script src="https://cdn.tailwindcss.com"></script> -->
   <script src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/tailwind/3.4.3.js"></script>  
   <script src="https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/jquery/jquery-3.7.1.min.js"></script>  
   <!-- font -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

   <!-- 載入 Noto Sans 的 400 和 500 權重 -->
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">

   <!-- 載入 Noto Sans TC 的 400 權重 -->
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">

   <!-- font -->
   <link rel="preconnect" href="https://fonts.googleapis.com">
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

   <!-- 載入 Noto Sans 的 400 和 500 權重 -->
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">

   <!-- 載入 Noto Sans TC 的 400 權重 -->
   <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">

   <!-- swiper -->
   <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.css"/>
   <script src="https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.min.js"></script> -->
   <!-- <link rel="stylesheet" href="https://d3ku8uosgaf1fa.cloudfront.net/image/swiper/cdn_v9/swiper-bundle.min.css"/> -->
   <!-- <script src="https://d3ku8uosgaf1fa.cloudfront.net/image/swiper/cdn_v9/swiper-bundle.min.js"></script> -->
   <link rel="stylesheet" href="https://d3ku8uosgaf1fa.cloudfront.net/image/swiper/cdn_v11/swiper-bundle.min.css"/>
   <script src="https://d3ku8uosgaf1fa.cloudfront.net/image/swiper/cdn_v11/swiper-bundle.min.js"></script>
   <!-- 客製化CSS -->
   <link rel="stylesheet" href="css/style.css">

   <!-- Google Tag Manager -->

   <!-- 2023/4/01 新增------------------------ -->
   <script>
       // function gtag() { 
       //     console.log("gtag")
       //  }
       (function (w, d, s, l, i) {
           w[l] = w[l] || []; w[l].push({
               'gtm.start': new Date().getTime(),
               event: 'gtm.js'
           });
           var f = d.getElementsByTagName(s)[0],
               j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
           j.async = true;
           j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
           f.parentNode.insertBefore(j, f);
       })(window, document, 'script', 'dataLayer', 'GTM-MQ6NW7H');

       // 以下尚未測試(失敗:google_tag_manager_body)---------------
       $(document).ready(function () {
           jQuery("body").prepend('<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MQ6NW7H" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>');
       });
   </script>

   <!-- 以上Zoe 日購----------------------------------- -->
         <!-- Global site tag (gtag.js) - Google Analytics -->
         <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139954913-1"></script>
         <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
               dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", "UA-139954913-1");
         </script> -->
         <!-- 以上Zoe----------------------------------- -->
   <!--  fancybox -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css" />

</head>
<body class="">
   <header class="sticky top-0 bg-white z-[99]">
       
       <div id="pageMainHeader" class="max-w-[1200px] m-auto"></div>
       <nav id="customNav" class="flex w-full overflow-auto"></nav>
   </header>
   
   <main class="flex flex-col items-center w-full bid stickBg">
   </main>
   <footer></footer>
   <div id="pageToolBar" class="sticky bottom-0 w-full z-[9] sm:hidden"></div>

   <!-- js used in page  -->
   <script src="./js/bid_js.js?v=0601" defer></script>

    <!--  -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js"></script>

   <!-- 以上Zoe----------------------------------- -->
    <style>
      .robot_line_share_up{
         display: block;
      }
      @media screen and (min-width:768px){
         .robot_line_share_up{
            display: none;
         }
      }
    </style>
   <section class="robot_line_share_up"></section>

     <script type="text/javascript">
       if(window.location.href.slice(0, 10)=="https://de" || window.location.href.slice(0, 10)=="http://127" ){
       $('.robot_line_share_up').load('https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/pchome/common_template/common/fix/right/dev_index.html');
     }else{
       $('.robot_line_share_up').load('https://s3-ap-northeast-1.amazonaws.com/ac.ezimport.co.jp/image/pchome/common_template/common/fix/right/www_index.html');
     }
     </script>
      <!-- 藥妝商城footer 請整塊複製 end ((中間不可做任何修改-->

</body>

</html>