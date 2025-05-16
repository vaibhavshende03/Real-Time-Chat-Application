import React, { useState, useRef, useEffect } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/chatContext";
import { useNavigate } from "react-router";
import SockJS from "sockjs-client";
import { baseUrl } from "../config/AxiosHelper";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { getMessageApi } from "./services/RoomService";
import { timeAgo } from "../config/Helper";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();
  console.log(roomId, currentUser, connected);
  const navigate = useNavigate();
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser, navigate]);
  //page init:

  //message loading

  useEffect(() => {
    async function loadMessages() {
      try {
        const messages = await getMessageApi(roomId);
        console.log(messages);
        setMessages(messages);
        // You may want to setMessages(messages) here if needed
      } catch (error) {}
    }
    if (connected) {
      loadMessages();
    }
  }, []);

  //stompClient init:
  //subscribe
  useEffect(() => {
    const connectWebScoket = () => {
      //SocksJs
      const scok = new SockJS(`${baseUrl}/chat`);
      const client = Stomp.over(scok);
      client.connect({}, () => {
        setStompClient(client);
        toast.success("connected");
        client.subscribe(`/topic/messages/${roomId}`, (message) => {
          console.log(message);
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
          //rest of the work after success receving the message
        });
      });
    };

    if (connected) {
      connectWebScoket();
    }
    //stomp client
  }, [roomId]);

  //send message handle
  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      console.log(input);
      const message = { sender: currentUser, content: input, roomId: roomId };
      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );

      setInput("");
    }
  };

  //scroll messages
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);
  function hanldeLogout() {
    stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  }
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim() !== "") {
      sendMessage();
    }
  };

  return (
    <div>
      {/* This is header */}
      <header className=" dark:border-gray-700 dark:bg-gray-800 fixed w-full h-20  shadow flex justify-around p-5 item-center">
        {/* Room Name Container*/}
        <div>
          <h1 className="text-xl font-semi-bold">
            Room: <span> {roomId}</span>
          </h1>
        </div>
        {/* Username container */}
        <div>
          <h1 className="text-xl font-semi-bold">
            User: <span> {currentUser}</span>
          </h1>
        </div>
        {/* button:leave */}
        <div>
          <button
            onClick={hanldeLogout}
            className="dark:bg-red-500 py-2 px-3 rounded-full hover:dark:bg-red-800"
          >
            Leave Room
          </button>
        </div>
      </header>

      {/* content  */}

      <main
        className="h-screen py-20 overflow-y-auto scrollbar-hide w-2/3 dark:bg-gray-900 mx-auto"
        ref={chatBoxRef}
      >
        {/* This is message container */}

        <div className="message_container">
          {messages.map((message, index) => (
            <div
              className={`flex px-10 ${
                message.sender === currentUser ? "justify-end" : "justify-start"
              }`}
              key={index}
            >
              <div
                className={`my-2 p-2 rounded max-w-xs ${
                  message.sender === currentUser
                    ? "bg-green-600"
                    : "bg-purple-600"
                }`}
              >
                <div className="flex flex-row gap-2">
                  <img
                    className="h-10 w-10"
                    src={"https://avatar.iran.liara.run/public/40"}
                    alt=""
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/40";
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">{message.sender}</p>
                    <p>{message.content}</p>
                    <p className="text-xs text-gray-300">
                      {timeAgo(message.timeStamp)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Input message container */}
      <section className=" fixed bottom-0 w-full h-20">
        <div className="flex items-center px-10 gap-4 justify-between h-full w-2/3 mx-auto py-2 dark:bg-gray-800">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && input.trim() !== "") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here"
            className="border w-full shadow dark:border-gray-800 dark:bg-gray-900 px-3 py-2 rounded-full h-full focus:outline-none focus:ring-2 focus:ring-green-500 "
          />
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center dark:bg-purple-600 px-3 py-2 rounded-full h-10 w-10 ">
              <MdAttachFile size={30} />
            </button>
            <button
              onClick={sendMessage}
              className="flex items-center justify-center dark:bg-green-600 px-3 py-2 rounded-full h-10 w-10 "
            >
              <MdSend size={30} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatPage;
