import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Fotter from "../Components/Fotter";

const AllRooms = () => {
  const [openFilters, setOpenFilters] = useState(false);

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "$ 0 to 400",
    "$ 400 to 800",
    "$ 800 to 1200",
    "$ 1200 to 1600",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  const [selectedRoomTypes, setSelectedRoomTypes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");

  // 🔥 STATIC ROOMS (API REMOVED ONLY)
  const rooms = [
    {
      _id: "1",
      name: "SHAFFI SUITES",
      location: "LAHORE",
      price: 70,
      rating: 4.9,
      review: 200,
      roomType: "Luxury Room",
      images: ["room1.jpg"],
      amenities: ["Free Wifi", "Free Breakfast"],
    },
    {
      _id: "2",
      name: "SHAFFI SUITES",
      location: "ISLAMABAD",
      price: 80,
      rating: 4.9,
      review: 200,
      roomType: "Luxury Room",
      images: ["room2.jpg"],
      amenities: ["Free Wifi", "Room Service"],
    },
    {
      _id: "3",
      name: "SHAFFI SUITES",
      location: "KARACHI",
      price: 90,
      rating: 4.9,
      review: 200,
      roomType: "Double Bed",
      images: ["room3.jpg"],
      amenities: ["Free Breakfast"],
    },
    {
      _id: "4",
      name: "SHAFFI SUITES",
      location: "PESHAWAR",
      price: 100,
      rating: 4.9,
      review: 200,
      roomType: "Family Suite",
      images: ["room4.jpg"],
      amenities: ["Free Wifi"],
    },
  ];

  const CheckBox = ({ label, selected = false, onchange = () => {} }) => (
    <label className="flex gap-2 items-center cursor-pointer mt-2 text-sm">
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onchange(e.target.checked, label)}
        className="w-4 h-4"
      />
      <span className="select-none">{label}</span>
    </label>
  );

  const RadioButton = ({ label, selected = false, onchange = () => {} }) => (
    <label className="flex gap-2 items-center cursor-pointer mt-2 text-sm">
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onchange(label)}
        className="w-4 h-4"
      />
      <span className="select-none">{label}</span>
    </label>
  );

  const renderStars = (rating) => {
    const safeRating = Number(rating || 0);
    const fullStars = Math.floor(safeRating);
    const halfStar = safeRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(0)
          .map((_, i) => (
            // <img key={"f" + i} src={assets.starIconFilled} alt="star" />
            <img key={"f" + i} src="./public/starIconFilled.svg" alt="star" />
          ))}
        {halfStar ? (
          <img src="./public/starIconOutlined.svg" alt="star" />
        ) : null}
        {Array(emptyStars)
          .fill(0)
          .map((_, i) => (
            <img key={"e" + i} src="./public/starIconOutlined.svg" alt="star" />
          ))}
      </div>
    );
  };

  // 🔥 SAME FILTER LOGIC (UNCHANGED)
  const filteredRooms = rooms
    .filter((room) => {
      if (!room) return false;

      if (
        selectedRoomTypes.length > 0 &&
        !selectedRoomTypes.includes(room.roomType)
      )
        return false;

      if (selectedPriceRanges.length > 0) {
        const price = Number(room?.price || 0);
        const priceMatch = selectedPriceRanges.some((range) => {
          const [min, max] = range.replace(/\$/g, "").split(" to ").map(Number);
          return price >= min && price <= max;
        });
        if (!priceMatch) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const priceA = Number(a?.price || 0);
      const priceB = Number(b?.price || 0);
      if (selectedSort === "Price Low to High") return priceA - priceB;
      if (selectedSort === "Price High to Low") return priceB - priceA;
      if (selectedSort === "Newest First")
        return (b?._id || "").localeCompare(a?._id || "");
      return 0;
    });

  return (
    <>
      <Navbar />
      <div className="flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-30 mb-10 px-4 md:px-16 lg:px-24 xl:px-32 gap-10">
        {/* ROOMS LIST */}
        <div className="flex-1 w-full">
          <div className="flex flex-col items-start text-left mb-5">
            <h1 className="font-playfair text-4xl md:text-[40px]">
              Hotel Rooms
            </h1>

            <p className="text-sm md:text-base text-gray-500/90 mt-2 max-w-174">
              Take advantage of our limited-time offers and special packages to
              enhance your stay.
            </p>
          </div>

          {filteredRooms?.length > 0 ? (
            filteredRooms.map((room) => (
              <Link key={room._id} to={`/room/${room._id}`}>
                <div className="flex flex-col md:flex-row items-start py-10 gap-6 border-b border-gray-300 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl w-full">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full md:w-1/2 max-h-65 rounded-xl shadow-lg object-cover cursor-pointer"
                  />

                  <div className="md:w-1/2 flex flex-col gap-2">
                    <p className="text-gray-500">{room.location}</p>

                    <p className="text-gray-800 text-3xl font-playfair cursor-pointer">
                      {room.name} ({room.roomType})
                    </p>

                    <div className="flex items-center">
                      {renderStars(room.rating)}
                      <p className="ml-2">{room.review}</p>
                    </div>

                    <p className="text-xl font-medium text-gray-700">
                      ${room.price}{" "}
                      <span className="text-gray-500 text-base">/night</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No rooms match the selected filters.</p>
          )}
        </div>

        {/* FILTERS */}
        <div className="bg-white w-full lg:w-80 border border-gray-300 text-gray-600 lg:ml-10 transition-all duration-300 hover:shadow-xl lg:sticky lg:top-24">
          {/* HEADER */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-300">
            <p className="text-base font-medium text-gray-800">FILTERS</p>

            <div className="text-xs cursor-pointer">
              <span
                onClick={() => setOpenFilters(!openFilters)}
                className="lg:hidden"
              >
                {openFilters ? "HIDE" : "SHOW"}
              </span>

              <span
                className="hidden lg:block"
                onClick={() => {
                  setSelectedRoomTypes([]);
                  setSelectedPriceRanges([]);
                  setSelectedSort("");
                }}
              >
                CLEAR
              </span>
            </div>
          </div>

          {/* BODY */}
          <div
            className={`overflow-hidden transition-all duration-500 ${
              openFilters ? "max-h-[1000px]" : "max-h-0 lg:max-h-full"
            }`}
          >
            {/* ROOM TYPE */}
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Room Type</p>

              {roomTypes.map((room, index) => (
                <CheckBox
                  key={index}
                  label={room}
                  selected={selectedRoomTypes.includes(room)}
                  onchange={(checked, label) => {
                    if (checked)
                      setSelectedRoomTypes([...selectedRoomTypes, label]);
                    else
                      setSelectedRoomTypes(
                        selectedRoomTypes.filter((r) => r !== label),
                      );
                  }}
                />
              ))}
            </div>

            {/* PRICE */}
            <div className="px-5 pt-5">
              <p className="font-medium text-gray-800 pb-2">Price Range</p>

              {priceRanges.map((range, index) => (
                <CheckBox
                  key={index}
                  label={range}
                  selected={selectedPriceRanges.includes(range)}
                  onchange={(checked, label) => {
                    if (checked)
                      setSelectedPriceRanges([...selectedPriceRanges, label]);
                    else
                      setSelectedPriceRanges(
                        selectedPriceRanges.filter((r) => r !== label),
                      );
                  }}
                />
              ))}
            </div>

            {/* SORT */}
            <div className="px-5 pt-5 pb-7">
              <p className="font-medium text-gray-800 pb-2">Sort By</p>

              {sortOptions.map((option, index) => (
                <RadioButton
                  key={index}
                  label={option}
                  selected={selectedSort === option}
                  onchange={(label) => setSelectedSort(label)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Fotter />
    </>
  );
};

export default AllRooms;
