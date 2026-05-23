import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, PlayCircle, Trash2, Plus, GripVertical, Save } from 'lucide-react';

import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function LessonEditor() {
  const { courseId } = useParams(); // Lấy ID khóa học để biết đang thêm bài giảng cho khóa nào

  // State lưu trữ danh sách bài giảng (Giả lập đã có sẵn 2 bài)
  const [lessons, setLessons] = useState([
    { id: 1, title: 'Giới thiệu tổng quan', duration: '05:00', videoUrl: 'https://youtube.com/...' },
    { id: 2, title: 'Cài đặt môi trường', duration: '12:30', videoUrl: 'https://youtube.com/...' },
  ]);

  // State cho form thêm bài mới
  const [newLesson, setNewLesson] = useState({ title: '', duration: '', videoUrl: '' });
  const [isSaving, setIsSaving] = useState(false);

  // Xử lý thêm bài học vào danh sách
  const handleAddLesson = (e) => {
    e.preventDefault();
    if (!newLesson.title || !newLesson.videoUrl) return;

    const lessonToAdd = {
      id: Date.now(), // Tạo ID tạm thời
      ...newLesson
    };

    setLessons([...lessons, lessonToAdd]);
    setNewLesson({ title: '', duration: '', videoUrl: '' }); // Reset form
  };

  // Xử lý xóa bài học
  const handleDeleteLesson = (idToRemove) => {
    setLessons(lessons.filter(lesson => lesson.id !== idToRemove));
  };

  // Xử lý lưu toàn bộ giáo trình xuống Backend
  const handleSaveCurriculum = async () => {
    setIsSaving(true);
    // Giả lập API call lưu mảng lessons xuống DB
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Đã lưu giáo trình cho khóa học ${courseId}:`, lessons);
    setIsSaving(false);
    alert('Đã lưu giáo trình thành công!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/instructor/dashboard" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý Giáo trình</h1>
            <p className="text-sm text-gray-500">Sắp xếp và thêm các video bài giảng cho khóa học.</p>
          </div>
        </div>
        <Button 
          onClick={handleSaveCurriculum} 
          variant="primary" 
          isLoading={isSaving}
          className="flex items-center gap-2"
        >
          <Save size={18} /> Lưu giáo trình
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cột trái: Danh sách bài học (Chiếm 2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Danh sách bài giảng ({lessons.length})</h2>
          </div>

          {lessons.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-500">
              Chưa có bài giảng nào. Hãy thêm bài giảng đầu tiên!
            </div>
          ) : (
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div key={lesson.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm group hover:border-brand/30 transition-colors">
                  <div className="cursor-grab text-gray-400 hover:text-gray-600">
                    <GripVertical size={20} />
                  </div>
                  <div className="w-10 h-10 bg-brand/10 text-brand flex items-center justify-center rounded-lg font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{lesson.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1"><PlayCircle size={14} /> {lesson.duration || 'Chưa rõ'}</span>
                      <span className="truncate max-w-[200px] text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                        {lesson.videoUrl}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                    title="Xóa bài giảng"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cột phải: Form thêm bài học mới (Chiếm 1/3) */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-5 border-b border-gray-50 pb-2">Thêm bài mới</h2>
            
            <form onSubmit={handleAddLesson} className="space-y-4">
              <Input 
                label="Tên bài giảng *"
                placeholder="VD: Cài đặt Node.js..."
                value={newLesson.title}
                onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
                required
              />
              <Input 
                label="Thời lượng (Phút:Giây)"
                placeholder="VD: 10:30"
                value={newLesson.duration}
                onChange={(e) => setNewLesson({...newLesson, duration: e.target.value})}
              />
              <Input 
                label="Đường dẫn Video (URL) *"
                placeholder="https://youtube.com/..."
                value={newLesson.videoUrl}
                onChange={(e) => setNewLesson({...newLesson, videoUrl: e.target.value})}
                required
              />
              
              <Button type="submit" variant="outline" className="w-full mt-2 flex items-center justify-center gap-2">
                <Plus size={18} /> Thêm vào danh sách
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}