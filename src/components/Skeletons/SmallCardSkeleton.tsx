import "./skeleton.css";
function SmallCardSkeleton() {
	return (
		<div className="rounded-lg lg:w-[346px] h-[340px] w-full lg:px-0 px-4 shadow-md mb-10">
			<div className="card-image-wrapper h-3/5 w-full skeleton"></div>
			<div className="p-4 space-y-4">
				<div className="skeleton w-full h-6"></div>
				<div className="skeleton w-5/6 h-4"></div>
			</div>
			<div className="px-4 flex gap-4">
				<div className="skeleton h-5 w-12"></div>
				<div className="skeleton h-5 w-20"></div>
			</div>
		</div>
	);
}

export default SmallCardSkeleton;
