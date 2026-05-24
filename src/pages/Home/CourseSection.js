import { useState } from "react";
import useCourses from '../../hooks/useCourses';
import useCategories from "../../hooks/useCategories";
import CourseGrid from '../../components/course/CourseGrid';
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { HOME_COURSE_LIMIT } from "../../constants/pagination";

const CourseSection = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { courses, isLoading, error } = useCourses({ categoryId: selectedCategoryId, limit: HOME_COURSE_LIMIT });
  const { categories } = useCategories();

  return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="mb-10">
				<h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
					Khám phá Khóa học
				</h2>
				<p className="text-gray-500 mb-6">
					Chọn một chủ đề và bắt đầu hành trình học tập của bạn.
				</p>

				<div className="flex flex-wrap gap-2">
					{categories.map(c => (<button key={c.id} onClick={() =>
								setSelectedCategoryId(
									selectedCategoryId === c.id ? null : c.id
								)
							}
							className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
								selectedCategoryId === c.id
									? 'bg-brand text-white border-brand'
									: 'bg-white text-gray-600 border-gray-200 hover:border-brand hover:text-brand'
							}`}
						>
							{c.name}
						</button>
					))}
				</div>
			</div>

			{error ? (
				<div className="text-center py-20 text-red-500 bg-red-50 rounded-2xl border border-red-100">
					<p className="font-medium">Đã có lỗi xảy ra:</p>
					<p>{error}</p>
				</div>
			) : (
				<CourseGrid courses={courses} isLoading={isLoading} skeletonCount={4} />
			)}
			<div className="mt-10 text-center">
				<Link to="/search" className="inline-flex items-center gap-2 text-brand font-semibold hover:underline">
					Xem tất cả khoá học
					<ArrowRight size={18} />
				</Link>
			</div>
		</section>
	)
}

export default CourseSection;