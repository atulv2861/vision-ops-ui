import { useRef, useEffect, useCallback, useState } from 'react';
import StatCard from './StatCard';
import { useOverviewSummaryCards } from '../../../hooks/queries';
import type { OverviewCardData } from '../../../api/services/overview.service';

const AUTO_SCROLL_SPEED = 1;
const AUTO_SCROLL_INTERVAL_MS = 30;

// Static icon for all overview cards
const OverviewCardIcon = (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

function OverviewCards() {
  const { data, isLoading, isError } = useOverviewSummaryCards();
  const cardsData: OverviewCardData[] = data ?? [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const rafId = useRef<number | null>(null);
  const lastPageX = useRef(0);

  const pauseAutoScroll = isDragging;

  useEffect(() => {
    if (pauseAutoScroll || cardsData.length === 0) return;
    const el = scrollRef.current;
    if (!el) return;

    const id = setInterval(() => {
      el.scrollLeft += AUTO_SCROLL_SPEED;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      if (el.scrollLeft >= maxScroll - 1) {
        el.scrollLeft = 0;
      }
    }, AUTO_SCROLL_INTERVAL_MS);

    return () => clearInterval(id);
  }, [pauseAutoScroll, cardsData.length]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0 || !scrollRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.pageX;
    dragStartScrollLeft.current = scrollRef.current.scrollLeft;
    lastPageX.current = e.pageX;
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    const el = scrollRef.current;
    const onMove = (e: MouseEvent) => {
      e.preventDefault();
      lastPageX.current = e.pageX;
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (!el) return;
        const dx = lastPageX.current - dragStartX.current;
        const next = dragStartScrollLeft.current - dx;
        const maxScroll = el.scrollWidth - el.clientWidth;
        el.scrollLeft = Math.max(0, Math.min(next, maxScroll));
      });
    };

    const onUp = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = null;
      setIsDragging(false);
    };

    window.addEventListener('mousemove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [isDragging]);

  if (isLoading) {
    return (
      <div className="flex gap-6 mt-6 overflow-hidden">
        <div className="flex flex-nowrap gap-6 animate-pulse">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-4 h-28 min-w-[220px] shrink-0"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6 text-red-400 text-sm">
        Failed to load overview summary cards.
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className={`flex overflow-x-auto overflow-y-hidden gap-6 mt-6 scrollbar-hide select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      onMouseDown={handleMouseDown}
      role="region"
      aria-label="Overview cards"
    >
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {cardsData.map((card, index) => (
        <div key={card.id ?? index} className="min-w-[220px] shrink-0">
          <StatCard
            title={card.title}
            value={card.value}
            subtitle={card.subtitle}
            icon={OverviewCardIcon}
          />
        </div>
      ))}
    </div>
  );
}

export default OverviewCards;
