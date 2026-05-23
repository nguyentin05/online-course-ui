import React from 'react';
import Button from '../../common/Button';

export default function EnrollButton() {
  // Logic Optimistic UI [KT-NC4] sẽ được gắn vào đây sau
  return (
    <Button variant="primary" size="sm" className="rounded-full shadow-lg shadow-brand/20">
      Đăng ký
    </Button>
  );
}