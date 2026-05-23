import React, { useState, useMemo, useRef, useEffect } from 'react';

export default function VirtualList({ 
  items, 
  itemHeight = 70, // Chiều cao mặc định của 1 dòng
  containerHeight = 500, // Chiều cao khung cuộn
  renderItem,
  buffer = 3 // Số lượng item đệm thêm để cuộn không bị giật
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  // Tính toán vị trí bắt đầu và kết thúc của các item cần render
  const { startIndex, endIndex } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
    const end = Math.min(
      items.length - 1,
      Math.floor((scrollTop + containerHeight) / itemHeight) + buffer
    );
    return { startIndex: start, endIndex: end };
  }, [scrollTop, itemHeight, containerHeight, items.length, buffer]);

  // Lấy ra đúng những item cần thiết (chỉ khoảng 10-15 item thay vì hàng ngàn)
  const visibleItems = items.slice(startIndex, endIndex + 1);

  // Tính khoảng cách để đẩy khối div xuống đúng vị trí cuộn
  const offsetY = startIndex * itemHeight;
  // Tính tổng chiều cao ảo của toàn bộ danh sách
  const totalHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      className="overflow-y-auto w-full custom-scrollbar"
      style={{ height: containerHeight, position: 'relative' }}
    >
      {/* Khung chiều cao giả để tạo thanh cuộn (Scrollbar) */}
      <div style={{ height: totalHeight, minHeight: '100%' }}>
        {/* Vùng chứa item thật, dịch chuyển theo tọa độ cuộn */}
        <div 
          style={{ 
            transform: `translateY(${offsetY}px)`,
            willChange: 'transform' // Gợi ý cho trình duyệt tối ưu render bằng GPU
          }}
          className="absolute top-0 left-0 w-full"
        >
          {visibleItems.map((item, index) => 
            // Render từng item, truyền vào data và vị trí index thật của nó
            renderItem(item, startIndex + index)
          )}
        </div>
      </div>
    </div>
  );
}