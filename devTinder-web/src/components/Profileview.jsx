import React from "react";

const ProfileView = ({ user }) => {
  return (
    <div className="flex items-center justify-center md:min-h-screen p-4 md:mt-3">
      <div className="bg-black text-white flex flex-col items-center border border-gray-600 shadow-2xl rounded-3xl p-10 w-96">
        <h1 className="text-5xl font-extrabold text-center mb-6 text-white drop-shadow-xl">Profile</h1>
        
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-400 shadow-2xl mb-6">
          <img src={user.photoUrl} alt="Profile" className="w-full object-cover" />
        </div>
        
        <div className="text-center space-y-3">
          <p className="text-3xl font-bold text-white drop-shadow-lg">{user.firstName} {user.lastName}</p>
          <p className="text-gray-300 text-md bg-black/40 px-3 py-2 rounded-lg shadow-md">{user.gender} | {user.age} years old</p>
          <p className="text-white mt-3 text-md px-5 italic bg-black/30 p-3 rounded-lg shadow-lg">"{user.about}"</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;