"use client"

import React, { useState, useEffect, useRef, ReactNode } from 'react'

interface MarqueeProps {
  className?: string;
  autoFill?: boolean;
  play?: boolean;
  pauseOnHover?: boolean;
  pauseOnClick?: boolean;
  direction?: 'left' | 'right';
  speed?: number;
  children: ReactNode;
  separator?: ReactNode;
}

export default function AdvanceMarquee({
  className = "",
  autoFill = false,
  play = true,
  pauseOnHover = false,
  pauseOnClick = false,
  direction = 'left',
  speed = 50,
  children,
  separator,
}: MarqueeProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(!play);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current && contentRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContentWidth(contentRef.current.scrollWidth);
      }
    };

    updateWidths();
    window.addEventListener('resize', updateWidths);

    return () => {
      window.removeEventListener('resize', updateWidths);
    };
  }, [children]);

  useEffect(() => {
    setIsPaused(!play);
  }, [play]);

  const shouldFill = autoFill && containerWidth > 0 && contentWidth > 0 && contentWidth < containerWidth;

  const animationDuration = `${contentWidth / speed}s`;
  const animationDirection = direction === 'right' ? 'reverse' : 'normal';

  const containerClasses = `
    relative overflow-hidden whitespace-nowrap
    flex items-center
    ${className}
    ${pauseOnHover ? 'hover:[--pause-on-hover:paused]' : ''}
    ${pauseOnClick ? 'active:[--pause-on-click:paused]' : ''}
  `.trim();

  const contentClasses = `
    flex items-center
    animate-marquee
    [animation-duration:${animationDuration}]
    [animation-direction:${animationDirection}]
    [animation-play-state:var(--pause-on-hover,var(--pause-on-click,running))]
  `.trim();

  const renderContent = () => {
    const childrenArray = React.Children.toArray(children);
    const content = childrenArray.reduce((acc: ReactNode[], child, index) => {
      if (index > 0 && separator) {
        acc.push(
          <React.Fragment key={`separator-${index}`}>
            {separator}
          </React.Fragment>
        );
      }
      acc.push(
        <React.Fragment key={`child-${index}`}>
          {child}
        </React.Fragment>
      );
      return acc;
    }, []);

    if (shouldFill) {
      return (
        <>
          {content}
          {separator && <React.Fragment key="separator-end">{separator}</React.Fragment>}
          {content}
        </>
      );
    }

    return content;
  };

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      style={{ '--pause-on-hover': 'running', '--pause-on-click': 'running' } as React.CSSProperties}
    >
      <div
        ref={contentRef}
        className={contentClasses}
        style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
      >
        {renderContent()}
      </div>
      <div aria-hidden="true" className={contentClasses}>
        {renderContent()}
      </div>
    </div>
  );
}