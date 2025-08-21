import React, { useEffect, useState } from 'react';

interface CountdownProps {
  start: number; // timestamp
  end: number;   // timestamp
}

const padZero = (num: number) => (num < 10 ? '0' + num : num);

const Countdown: React.FC<CountdownProps> = ({ start, end }) => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  let diff = 0;
  if (now < start) diff = start - now;
  else if (now >= start && now < end) diff = end - now;
  else diff = 0;

  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hour = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((diff / (1000 * 60)) % 60);
  const second = Math.floor((diff / 1000) % 60);

  if (diff <= 0) return <span>活動已結束</span>;

  return (
    <span>
      {padZero(day)}天 {padZero(hour)}:{padZero(minute)}:{padZero(second)}
    </span>
  );
};

export default Countdown; 