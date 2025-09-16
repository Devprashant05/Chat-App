import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
    const { user, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImage, setSelectedImage] = useState("");

    const handleImageUpload = async (e) => {
        const profilePic = e.target.files[0];
        if (!profilePic) {
            return;
        }

        setSelectedImage(URL.createObjectURL(profilePic));

        const formData = new FormData();
        formData.append("profilePic", profilePic);

        await updateProfile(formData);
    };

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-2xl mx-auto p-4 py-8">
                <div className="bg-base-300 rounded-xl p-6 space-y-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-semibold">Profile</h1>
                        <p className="mt-2">Your Profile Information</p>
                    </div>
                    {/* Avatar Upload Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <img
                                src={
                                    selectedImage ||
                                    user.profilePic ||
                                    "./image.png"
                                }
                                alt="Profile Image"
                                className="size-32 rounded-full object-cover border-4"
                                loading="lazy"
                            />
                            <label
                                htmlFor="avatar-upload"
                                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                                    isUpdatingProfile
                                        ? "animate-pulse pointer-events-none"
                                        : ""
                                }`}
                            >
                                <Camera className="w-5 h-5 text-base-200" />
                                <input
                                    type="file"
                                    name="avatar-upload"
                                    id="avatar-upload"
                                    className="hidden sr-only"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUpdatingProfile}
                                />
                            </label>
                        </div>
                        <p className="text-sm text-zinc-400">
                            {isUpdatingProfile
                                ? "Uploading..."
                                : "Click the camera icon to update your photo"}
                        </p>
                    </div>
                    {/* User Info */}
                    <div className="space-y-6">
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <User className="size-4" />
                                Full Name
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                                {user?.fullname}
                            </p>
                        </div>
                        <div className="space-y-1.5">
                            <div className="text-sm text-zinc-400 flex items-center gap-2">
                                <Mail className="size-4" />
                                Email
                            </div>
                            <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    {/* Additional Info */}
                    <div className="mt-6 bg-base-300 rounded-xl p-6">
                        <h2 className="text-lg font-medium mb-4">
                            Account Information
                        </h2>
                        <div className="spae-y-3 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                                <span>Member Since</span>
                                <span>{user.createdAt?.split("T")[0]}</span>
                            </div>
                            <div className="flex items-center justify-between py-2">
                                <span>Account Status</span>
                                <span className="text-green-500">Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
