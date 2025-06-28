import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { socket, getRoomId } from "../utils/socket";

const ChatRoomModal = ({ isOpen, senderId, receiverId, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [senderAvatar, setSenderAvatar] = useState("");
  const [receiverAvatar, setReceiverAvatar] = useState("");
  const [roomId, setRoomId] = useState("");
  const [actualSenderId, setActualSenderId] = useState("");
  const messagesEndRef = useRef(null);

  // ✅ Init sender + roomId
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const sender = senderId || loggedInUser?._id;
    if (!sender || !receiverId) return;

    setActualSenderId(sender);

    const generatedRoomId = getRoomId(sender, receiverId);
    setRoomId(generatedRoomId);
    console.log("🔁 Room ID:", generatedRoomId);
  }, [senderId, receiverId]);

  // ✅ Fetch avatars
  useEffect(() => {
    if (!actualSenderId || !receiverId) return;

    const token = localStorage.getItem("token");

    const fetchAvatars = async () => {
      try {
        const [senderRes, receiverRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/users/${actualSenderId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5000/api/users/${receiverId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSenderAvatar(
          senderRes.data.profileImage || `https://i.pravatar.cc/150?u=${actualSenderId}`
        );
        setReceiverAvatar(
          receiverRes.data.profileImage || `https://i.pravatar.cc/150?u=${receiverId}`
        );
      } catch (err) {
        console.error("❌ Error fetching avatars:", err);
      }
    };

    fetchAvatars();
  }, [actualSenderId, receiverId]);

  // ✅ Join room + fetch chat
  useEffect(() => {
    if (!roomId || !actualSenderId || !receiverId) return;

    socket.emit("join_room", roomId);

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/messages/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Error fetching chat:", err);
      }
    };

    fetchMessages();

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receive_message");
  }, [roomId, actualSenderId, receiverId]);

  // ✅ Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send
  const handleSend = () => {
    if (!input.trim()) return;

    const messageData = {
      text: input,
      senderId: actualSenderId,
      receiverId,
      propertyId: roomId,
      createdAt: new Date(),
    };

    socket.emit("send_message", messageData);
    setInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🌫️ Backdrop */}
          <motion.div
            className="fixed inset-0 backdrop-blur-md bg-black/10 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 💬 Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 bottom-6 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl z-50 rounded-2xl overflow-hidden flex flex-col border border-gray-200"
          >
            {/* Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-100 to-white">
              <h2 className="font-bold text-xl text-gray-800">💬 Chat</h2>
              <button
                onClick={onClose}
                className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition font-medium"
              >
                <span className="text-lg">✖</span> Close
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white/70">
              {messages.map((msg, i) => {
                const isSender = msg.senderId === actualSenderId;
                const avatar = isSender ? senderAvatar : receiverAvatar;

                return (
                  <div
                    key={i}
                    className={`flex items-end gap-2 ${
                      isSender ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isSender && (
                      <img
                        src={avatar}
                        alt="receiver"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    )}
                    <div
                      className={`w-fit max-w-[80%] px-4 py-2 rounded-xl shadow text-sm ${
                        isSender
                          ? "bg-blue-500 text-white rounded-br-none"
                          : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {isSender && (
                      <img
                        src={avatar}
                        alt="sender"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                    )}
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-3 flex gap-2 bg-white/90">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 ring-blue-400 shadow-sm"
              />
              <button
                onClick={handleSend}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ChatRoomModal;
