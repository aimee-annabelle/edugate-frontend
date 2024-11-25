import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { ResourceDto } from "../util/types";
import { useEffect, useState } from "react";
import { addRating } from "../services/resources";
import toast from "react-hot-toast";

interface ResourceDetailsProps {
    resource: ResourceDto;
    onClose: () => void;
    getRandomImage: () => string;
}

export default function ResourceDetails({ resource, onClose, getRandomImage }: ResourceDetailsProps) {
    const [selectedRating, setSelectedRating] = useState(0);        
    const [review, setReview] = useState("");
    const [image, setImage] = useState<string | null>(null);
    useEffect(() => {
        setImage(getRandomImage());
    }, [resource]);

    const handleRatingClick = (rating: number) => {
        setSelectedRating(rating);
    };

    const renderSelectableStars = () => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        onClick={() => handleRatingClick(star)}
                        className="focus:outline-none"
                    >
                        {star <= selectedRating ? (
                            <StarIcon className="h-6 w-6 text-yellow-400 hover:text-yellow-500" />
                        ) : (
                            <StarOutlineIcon className="h-6 w-6 text-yellow-400 hover:text-yellow-500" />
                        )}
                    </button>
                ))}
            </div>
        );
    };

    const renderRatingStars = (rating: number) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    star <= rating ? (
                        <StarIcon key={star} className="h-5 w-5 text-yellow-400" />
                    ) : (
                        <StarOutlineIcon key={star} className="h-5 w-5 text-yellow-400" />
                    )
                ))}
            </div>
        );
    };

    const handleAddReview = async () => {
        console.log("Review added:", selectedRating);
        const reviewResponse = await addRating(resource._id, { rating: selectedRating, comment: review });
        if (reviewResponse) {
            toast.success("Review added successfully");
            
        } else {
            toast.error("Failed to add review");
        }
    };

    return (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col">
            <div className="p-6 border-b">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">{resource.title}</h2>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
                <div className="relative h-48 mb-6">
                    <img
                        src={image!}
                        alt={resource.title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-medium">Statistics</h3>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Read</span>
                                <span className="font-medium">{resource.views}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Downloads</span>
                                <span className="font-medium">{resource.ratings.length}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Rating</span>
                                <div className="flex items-center">
                                    {renderRatingStars(
                                        resource.ratings.length > 0 
                                            ? resource.ratings.reduce((acc, rating) => acc + rating.rating, 0) / resource.ratings.length 
                                            : 0
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium">Details</h3>
                        <div className="mt-2 space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Subject</span>
                                <span className="font-medium">{resource.subject}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Grade Level</span>
                                <span className="font-medium">{resource.gradeLevel}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Type</span>
                                <span className="font-medium">{resource.type}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium">Description</h3>
                        <p className="mt-2 text-gray-600">{resource.description}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium">Add Review</h3>
                        <div className="mt-2 space-y-2">
                        <div className="flex items-center gap-2">
                    <span className="text-gray-600">Your Rating:</span>
                    {renderSelectableStars()}
                </div>
                            <textarea 
                                placeholder="Add your review here..."
                                className="w-full h-24 border border-gray-300 rounded-md p-2"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                            />

                            <button className="bg-primary text-white px-4 py-2 rounded-md" onClick={handleAddReview}>Add Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 