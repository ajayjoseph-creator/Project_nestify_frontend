import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { FaSearch, FaLock, FaUnlock,FaUsers } from "react-icons/fa";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch users", err);
    }
  };
const handleToggleBlock = async (userId, currentStatus) => {
  try {
    const res = await axiosInstance.put(
      `/admin/block/${userId}`,              
      { isBlocked: !currentStatus },         
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
      toast.success(
      `User has been ${!currentStatus ? "blocked" : "unblocked"} successfully`
    );
    console.log("✅ User updated", res.data);
    
    
    fetchUsers(); // 🔁 Refresh the user list
  } catch (err) {
    console.error("❌ Failed to update user status", err);
  }
};

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-white dark:bg-[#121212] min-h-screen">
      <div className="flex items-center justify-between mb-6">
           {/* <div className="flex items-center gap-2 text-white">
      <FaUsers />
      <h1>User Management</h1>
    </div> */}


        {/* 🔍 Search bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 border rounded-md bg-gray-100 dark:bg-[#1e1e1e] text-sm text-gray-700 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>

      <div className="overflow-x-auto rounded shadow-md">
        <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
          <thead className="bg-gray-200 dark:bg-[#2a2a2a] text-xs uppercase">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Email</th>
              <th className="py-3 px-6">Role</th>
              <th className="py-3 px-6">Joined</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr
                key={user._id}
                className={`border-b dark:border-gray-700 ${
                  index % 2 === 0 ? "bg-gray-50 dark:bg-[#1c1c1c]" : "bg-white dark:bg-[#1e1e1e]"
                }`}
              >
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6 capitalize">{user.isAdmin?"admin":"user"}</td>
                <td className="py-3 px-6">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  {user.isBlocked ? (
                    <span className="text-red-500 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Active</span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleToggleBlock(user._id, user.isBlocked)}
                    className={`px-4 py-1 text-sm rounded font-medium transition ${
                      user.isBlocked
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-red-600 text-white hover:bg-red-700"
                    }`}
                  >
                    {user.isBlocked ? (
                      <div className="flex items-center gap-1">
                        <FaUnlock /> Unblock
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <FaLock /> Block
                      </div>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
