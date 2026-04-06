import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerLayout from "../../Components/OwnerLayout";

const AddRoom = () => {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [successMsg, setSuccessMsg] = useState("");

  const toggleAmenity = (item) => {
    setAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!roomName || !roomType || !price) {
      alert("Please fill all required fields");
      return;
    }

    setSuccessMsg("Room added successfully (static mode)!");

    setTimeout(() => {
      setSuccessMsg("");
      navigate("/owner");
    }, 1200);

    setRoomName("");
    setRoomType("");
    setPrice("");
    setAmenities([]);
  };

  return (
    <OwnerLayout>
        {/* MAIN CONTENT */}
        <main className="flex flex-col overflow-y-auto">
          {/* SUCCESS */}
          {successMsg && (
            <div className="mb-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg border border-green-200">
              {successMsg}
            </div>
          )}

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Add New Room</h1>
            <p className="text-gray-500 mt-1">
              Create a new room listing (static UI)
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl shadow space-y-5 max-w-1xl"
          >
            {/* ROOM NAME */}
            <div>
              <label className="text-sm text-gray-600">Room Name</label>
              <input
                className="w-full mt-1 border rounded-lg p-3"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
            </div>

            {/* ROOM TYPE */}
            <div>
              <label className="text-sm text-gray-600">Room Type</label>
              <select
                className="w-full mt-1 border rounded-lg p-3"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="">Select type</option>
                <option>Single Bed</option>
                <option>Double Bed</option>
                <option>Luxury Room</option>
                <option>Family Suite</option>
              </select>
            </div>

            {/* PRICE */}
            <div>
              <label className="text-sm text-gray-600">Price / Night</label>
              <input
                type="number"
                className="w-full mt-1 border rounded-lg p-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* AMENITIES */}
            <div>
              <label className="text-sm text-gray-600">Amenities</label>

              <div className="flex flex-col gap-2 mt-2">
                {["Free Wifi", "Free Breakfast", "Room Service"].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={amenities.includes(item)}
                      onChange={() => toggleAmenity(item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Add Room
            </button>
          </form>
        </main>
    </OwnerLayout>
  );
};

export default AddRoom;
