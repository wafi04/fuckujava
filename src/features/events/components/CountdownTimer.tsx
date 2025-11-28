"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  endTime: string;
}

export function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(endTime) - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
        setIsExpired(false);
      } else {
        setIsExpired(true);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (isExpired) {
    return (
      <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg text-center">
        <span className="text-sm font-medium">Flash Sale Berakhir</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-red-500 bg-secondary px-4 py-2 rounded-lg">
      <span className="text-lg font-medium">Berakhir dalam:</span>
      <div className="flex gap-1">
        {timeLeft.days > 0 && (
          <>
            <div className="bg-primary-foreground text-primary px-2 py-1 rounded text-sm font-bold countdown-tick">
              {timeLeft.days}d
            </div>
          </>
        )}
        <div className="bg-primary-foreground text-primary px-2 py-1 rounded text-sm font-bold countdown-tick">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <span className="text-primary-foreground">:</span>
        <div className="bg-primary-foreground text-primary px-2 py-1 rounded text-sm font-bold countdown-tick">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <span className="text-primary-foreground">:</span>
        <div className="bg-primary-foreground text-primary px-2 py-1 rounded text-sm font-bold countdown-tick">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}
