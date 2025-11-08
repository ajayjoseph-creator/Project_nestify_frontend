import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatRoomModal from "../components/ChatRoomModal";
import LoadingSpinner from "./LoadingSpinner";

const OwnerInbox = () => {
  const storedUser = localStorage.getItem("user");
  const owner = storedUser ? JSON.parse(storedUser) : null;

  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConvos = async () => {
      if (!owner?._id) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://project-nestify-backend.onrender.com/api/messages/conversations/${owner._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setConversations(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch conversations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchConvos();
  }, [owner?._id]);

  const openChat = (user) => {
    setSelectedUser(user);
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen mt-28 p-4 sm:p-8 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-bold text-pink-600">💬 Inbox</h2>
          <p className="text-gray-500 text-sm">Click a user to start chatting</p>
        </div>

        {/* Chat list */}
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {loading ? (
             <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
          ) : conversations.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No conversations yet 😕</div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv._id}
                onClick={() => openChat(conv)}
                className="p-4 hover:bg-pink-50 cursor-pointer transition"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-800">{conv.name}</h3>
                  <span className="text-xs text-gray-400">
                    {new Date(conv.updatedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage || "No messages yet"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Modal */}
      {isChatOpen && selectedUser && (
        <ChatRoomModal
          isOpen={isChatOpen}
          senderId={owner._id}
          receiverId={selectedUser._id}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </div>
  );
};

export default OwnerInbox;
