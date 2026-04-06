import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Fotter from "../Components/Fotter";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  // OPEN MODAL
  const openDeleteModal = (booking) => {
    setSelectedBooking(booking);
    setShowDeleteModal(true);
  };

  // DELETE
  const handleDelete = () => {
    const updated = bookings.filter((b) => b._id !== selectedBooking._id);

    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));

    setShowDeleteModal(false);
    setShowSuccessModal(true);

    setTimeout(() => {
      setShowSuccessModal(false);
      setSelectedBooking(null);
    }, 2000);
  };

  if (bookings.length === 0)
    return <p className="p-6 text-center">No booking info available.</p>;

  return (
    <>
      <Navbar />

      <div className="min-h-[70vh] py-28 px-4 md:px-16 lg:px-24 xl:px-32">
        <h1 className="text-4xl font-playfair mb-8">My Bookings</h1>

        <div className="max-w-6xl flex flex-col gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border border-gray-200 rounded-xl p-4 grid md:grid-cols-[3fr_2fr_1fr_0.5fr] gap-4 items-center"
            >
              {/* ROOM INFO */}
              <div className="flex items-center gap-4">
                <img
                  className="w-20 h-20 rounded-xl object-cover"
                  src={`/${booking.roomImage}`}
                  alt={booking.roomName}
                />

                <div>
                  <h2 className="font-semibold">{booking.roomName}</h2>
                  <p className="text-gray-500 text-sm">{booking.roomType}</p>
                  <p className="text-gray-500 text-sm">
                    {booking.guests} Guests
                  </p>
                </div>
              </div>

              {/* DATES */}
              <div className="text-gray-500 text-sm">
                <p>Check-In: {booking.checkIn}</p>
                <p>Check-Out: {booking.checkOut}</p>
              </div>

              {/* PRICE */}
              <div className="font-medium">${booking.price}</div>

              {/* DELETE */}
              <button
                onClick={() => openDeleteModal(booking)}
                className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* DELETE MODAL */}
        {showDeleteModal && selectedBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-md">
              <h2 className="text-xl font-semibold text-gray-800">
                Delete Booking
              </h2>

              <p className="text-gray-600 mt-2">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-gray-800">
                  {selectedBooking.roomName}
                </span>
                ?
              </p>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SUCCESS MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

            <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-sm text-center">
              <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl">
                ✓
              </div>

              <h2 className="text-xl font-semibold mt-4">Booking Deleted</h2>
            </div>
          </div>
        )}
      </div>

      <Fotter />
    </>
  );
};

export default Bookings;