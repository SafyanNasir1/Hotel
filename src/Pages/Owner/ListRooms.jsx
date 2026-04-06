import React, { useState } from "react";
import { Link } from "react-router-dom";
import OwnerLayout from "../../Components/OwnerLayout";


const ListRoom = () => {
  const [rooms, setRooms] = useState([
    {
      _id: "1",
      name: "Deluxe Room",
      type: "Luxury",
      price: 120,
      images: [],
    },
    {
      _id: "2",
      name: "Standard Room",
      type: "Single",
      price: 80,
      images: [],
    },
    {
      _id: "3",
      name: "Suite Room",
      type: "Premium",
      price: 200,
      images: [],
    },
  ]);

  const [successMsg, setSuccessMsg] = useState("");
  const [editingRoom, setEditingRoom] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  // DELETE (static)
  const handleDelete = (id) => {
    setRooms((prev) => prev.filter((room) => room._id !== id));
    setSuccessMsg("Room deleted successfully!");

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  // SAVE EDIT (static)
  const handleSave = (id) => {
    setRooms((prev) =>
      prev.map((room) =>
        room._id === id ? { ...room, name: editName, price: editPrice } : room,
      ),
    );

    setEditingRoom(null);
    setSuccessMsg("Room updated successfully!");

    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <OwnerLayout>
    <div className="flex flex-col h-screen">
      {/* TOP BAR */}
     

      <div className="flex h-full">
        {/* SIDEBAR */}
       

        {/* MAIN */}
        <div className="flex-1 p-6">
          {/* SUCCESS MSG */}
          {successMsg && (
            <div className="bg-green-500 text-white p-2 rounded mb-4">
              {successMsg}
            </div>
          )}

          <h1 className="text-3xl font-bold">Room Listings</h1>
          <p className="text-gray-500 mt-1">
            Manage all hotel rooms (static mode)
          </p>

          <p className="mt-4 text-gray-500">Total Rooms: {rooms.length}</p>

          {/* TABLE */}
          <div className="mt-6 border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id} className="border-t">
                    {/* IMAGE */}
                    <td className="p-3 text-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </td>

                    {/* TYPE */}
                    <td className="p-3 text-center">{room.type}</td>

                    {/* NAME */}
                    <td className="p-3 text-center">
                      {editingRoom === room._id ? (
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        room.name
                      )}
                    </td>

                    {/* PRICE */}
                    <td className="p-3 text-center">
                      {editingRoom === room._id ? (
                        <input
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        `$${room.price}`
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="p-3 text-center">
                      {editingRoom === room._id ? (
                        <button
                          onClick={() => handleSave(room._id)}
                          className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingRoom(room._id);
                            setEditName(room.name);
                            setEditPrice(room.price);
                          }}
                          className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(room._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </OwnerLayout>
  );
};

export default ListRoom;
