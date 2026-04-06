import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

const HeroRoom = () => {
  const rooms = [
    {
      _id: "1",
      name: "SHAFFI SUITES",
      location: "LAHORE",
      price: 70,
      rating: 4.9,
      images: ["/room1.jpg"],
    },
    {
      _id: "2",
      name: "SHAFFI SUITES",
      location: "ISLAMABAD",
      price: 80,
      rating: 4.9,
      images: ["/room2.jpg"],
    },
    {
      _id: "3",
      name: "SHAFFI SUITES",
      location: "KARACHI",
      price: 90,
      rating: 4.9,
      images: ["/room3.jpg"],
    },
    {
      _id: "4",
      name: "SHAFFI SUITES",
      location: "PESHAWAR",
      price: 100,
      rating: 4.9,
      images: ["/room4.jpg"],
    },
  ];

  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      {/* TITLE */}
      <h1 className="text-4xl md:text-[40px] font-playfair text-center">
        Featured Destination
      </h1>

      <p className="text-gray-500 mt-2 text-center max-w-xl">
        Discover premium stays with comfort and luxury vibes.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {rooms.map((room) => (
          <Link key={room._id} to={`/room/${room._id}`}>
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 group">
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={room.images[0]}
                  alt={room.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
                />

                {/* PRICE BADGE */}
                <div className="absolute top-3 right-3 bg-white text-black px-3 py-1 rounded-full text-sm shadow">
                  ${room.price}/night
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4 space-y-2">
                {/* NAME + RATING */}
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold text-lg text-gray-800">
                    {room.name}
                  </h2>

                  <div className="flex items-center gap-1 text-sm font-medium">
                    <FaStar className="text-orange-500" />
                    {room.rating}
                  </div>
                </div>

                {/* LOCATION */}
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <FaMapMarkerAlt className="text-red-500" />
                  {room.location}
                </div>

                {/* BUTTON */}
                <button
                  className="
                  cursor-pointer
    relative w-full mt-3
    bg-black text-white
    py-2 rounded-lg text-sm
    transition-all duration-300 ease-in-out
    hover:bg-[#252525]
    hover:shadow-lg
    hover:scale-[1.03]
    active:scale-95
    overflow-hidden
  "
                >
                  {/* Text */}
                  <span className="relative z-10">View Details</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* VIEW ALL */}
      <Link to="/rooms">
        <button className="cursor-pointer my-16 px-6 py-2 text-sm font-medium border border-gray-300 rounded bg-white hover:bg-gray-50 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
          View All Rooms
        </button>
      </Link>
    </div>
  );
};

export default HeroRoom;