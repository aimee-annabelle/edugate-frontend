import { useState, useEffect } from "react";
import { useAuthStore } from "../util/authStore";
import { getResources } from "../services/resources";
import { ResourceDto } from "../util/types";
import { BellIcon, Cog6ToothIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import dashboardImage from "../assets/student-and-books.svg";
import ResourceDetails from "../components/ResourceDetails";

const images = Object.values(import.meta.glob('../assets/resources/*', { eager: true })) as { default: string }[];

export default function Dashboard() {
    const [resources, setResources] = useState<ResourceDto[]>([]);
    const [selectedResource, setSelectedResource] = useState<ResourceDto | null>(null);
    const [loading, setLoading] = useState(false);
    const user = useAuthStore().user;

    async function fetchResources() {
        setLoading(true);
        const data = await getResources();
        if (data) {
            setResources(data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchResources();
    }, [user]);

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

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex].default;
    };

    return (
        <div className="flex flex-col w-full">
            {/* Header */}
            <div className="mt-6">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    {/* Search Bar */}
                    <div className="relative flex-1 max-w-2xl">
                        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Search..."
                        />
                    </div>
                    {/* Notifications and Profile */}
                    <div className="flex items-center gap-4 ml-4">
                        <div className="relative">
                            <BellIcon className="h-6 w-6 text-gray-600" />
                            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                                1
                            </span>
                        </div>
                        <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
                        <UserCircleIcon className="h-8 w-8 rounded-full text-primary object-cover" />
                    </div>
                </div>
            </div>
            {/* closing header */}
            {/* Dashboard Content */}
            <div className="flex justify-between items-center bg-primary mx-28 my-10 gap-y-4 rounded-lg">
                <div className="p-10 flex flex-col gap-y-4">
                    <h1 className="text-2xl font-semibold text-white">Welcome back, {user?.name}👋</h1>
                    <p className="text-white">Check out the latest resources as well as your favorite resources!</p>
                </div>
                <img src={dashboardImage} alt="Dashboard" className=" w-56 object-cover" />
            </div>
            <div className="mx-28">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                        Popular Now <span className="text-2xl">🔥</span>
                    </h2>
                    
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6" >
                    {loading ? (
                        <p className="text-gray-500">Loading...</p>
                    ) : resources.length === 0 ? (
                        <p className="text-gray-500">No resources found. Add your first resource!</p>
                    ) : (
                        resources.map((resource) => (
                            <div 
                                key={resource._id} 
                                className="flex flex-col bg-white rounded-lg overflow-hidden transition-transform hover:scale-105"
                                onClick={() => setSelectedResource(resource)}
                            >
                                <div className="relative bg-gray-100">
                                    <img
                                        src={getRandomImage()}
                                        alt={resource.title}
                                        className="w-full max-h-80 object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-lg mb-1 truncate" title={resource.title}>
                                        {resource.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2">
                                        Grade {resource.gradeLevel}
                                    </p>
                                    {resource.ratings.length > 0 && renderRatingStars(resource.ratings.reduce((acc, rating) => acc + rating.rating, 0) / resource.ratings.length) || renderRatingStars(0)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {selectedResource && (
                <>
                    <div 
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
                        onClick={() => setSelectedResource(null)}
                    />
                    <ResourceDetails 
                        resource={selectedResource}
                        onClose={() => setSelectedResource(null)}
                        getRandomImage={getRandomImage}
                    />
                </>
            )}
        </div>
    );
}

