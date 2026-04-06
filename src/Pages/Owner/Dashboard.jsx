// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import OwnerLayout from "../../Components/OwnerLayout";

// const Dashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("bookings")) || [];
//     setBookings(data);
//   }, []);

//   if (!user || user.role !== "owner") {
//     return <Navigate to="/" />;
//   }

//   // 💰 Revenue calculation
//   const totalRevenue = bookings.reduce((sum, b) => {
//     return sum + (Number(b.price) || 0);
//   }, 0);

//   return (
//     <OwnerLayout>
//       <h1 className="text-3xl font-bold">Dashboard</h1>
//       <p className="text-gray-500">Welcome back {user.email}</p>

//       {/* STATS */}
//       <div className="grid md:grid-cols-2 gap-4 mt-6">
//         <div className="bg-white p-5 rounded-xl shadow">
//           Total Bookings: {bookings.length}
//         </div>

//         <div className="bg-white p-5 rounded-xl shadow">
//           Revenue: ${totalRevenue}
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white mt-6 rounded-xl shadow overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3">Room</th>
//               <th className="p-3">Amount</th>
//               <th className="p-3">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {bookings.map((b, i) => (
//               <tr key={i} className="border-t">
//                 <td className="p-3">{b.roomName}</td>
//                 <td className="p-3">${b.price}</td>
//                 <td className="p-3">{b.paymentStatus || "paid"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </OwnerLayout>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import OwnerLayout from "../../Components/OwnerLayout";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  if (!user || user.role !== "owner") {
    return <Navigate to="/" />;
  }

  const totalRevenue = bookings.reduce((sum, b) => {
    return sum + (Number(b.price) || 0);
  }, 0);

  return (
    <OwnerLayout>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-gray-500">Welcome back {user.email}</p>

      {/* STATS */}
      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-5 rounded-xl shadow">
          Total Bookings: {bookings.length}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          Revenue: ${totalRevenue}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white mt-6 rounded-xl shadow overflow-hidden">
        {/* TABLE HEADER */}
        <div className="hidden md:grid grid-cols-4 bg-gray-100 text-sm font-semibold text-gray-700">
          <div className="p-3">Room</div>
          <div className="p-3">Image</div>
          <div className="p-3">Amount</div>
          <div className="p-3">Status</div>
        </div>

        {/* TABLE BODY */}
        <div className="divide-y">
          {bookings.map((b, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 p-4 hover:bg-gray-50 transition"
            >
              {/* ROOM NAME */}
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-800">{b.roomName}</span>
              </div>

              {/* IMAGE */}
              <div>
                <img
                  src={`/${b.roomImage}`}
                  alt={b.roomName}
                  className="w-14 h-14 rounded-lg object-cover border"
                />
              </div>

              {/* PRICE */}
              <div className="font-semibold text-gray-900">${b.price}</div>

              {/* STATUS */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium
              ${
                b.paymentStatus === "paid"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
                >
                  {b.paymentStatus || "paid"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OwnerLayout>
  );
};

export default Dashboard;