import React, { useState, useRef } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { content: "Hello, how are you ?", sender: "Vaibhav" },
    { content: "Hi", sender: "manager" },
    { content: "Hello, how are you ?", sender: "Vaibhav" },
    { content: "Hi", sender: "manager" },
    { content: "Hello, how are you ?", sender: "Vaibhav" },
    { content: "Hi", sender: "manager" },
    { content: "Hello, how are you ?", sender: "Vaibhav" },
    { content: "Hi", sender: "manager" },
    { content: "Hello, how are you ?", sender: "Vaibhav" },
    { content: "Hi", sender: "manager" },
    { content: "Hello, how are you ?", sender: "Vaibhav" },
    { content: "Hi", sender: "manager" },
    { content: "Hello, how are you ?", sender: "Vaibhav" },
    { content: "Hi", sender: "manager" },
  ]);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [currentUser] = useState("Vaibhav");
  return (
    <div>
      {/* This is header */}
      <header className=" dark:border-gray-700 dark:bg-gray-800 fixed w-full h-20  shadow flex justify-around p-5 item-center">
        {/* Room Name Container*/}
        <div>
          <h1 className="text-xl font-semi-bold">
            Room:<span>Family Room</span>
          </h1>
        </div>
        {/* Username container */}
        <div>
          <h1 className="text-xl font-semi-bold">
            User:<span>Vaibhav Shende</span>
          </h1>
        </div>
        {/* button:leave */}
        <div>
          <button className="dark:bg-red-500 py-2 px-3 rounded-full hover:dark:bg-red-800">
            Leave Room
          </button>
        </div>
      </header>

      {/* content  */}

      <main className="h-screen py-20 overflow-y-auto scrollbar-hide w-2/3 dark:bg-gray-900 mx-auto">
        {/* This is message container */}

        <div className="message_container ">
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
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-bold">{message.sender}</p>
                    <p>{message.content}</p>
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
            type="text"
            placeholder="Type your message here"
            className="border w-full shadow dark:border-gray-800 dark:bg-gray-900 px-3 py-2 rounded-full h-full focus:outline-none focus:ring-2 focus:ring-green-500 "
          />
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center dark:bg-purple-600 px-3 py-2 rounded-full h-10 w-10 ">
              <MdAttachFile size={30} />
            </button>
            <button className="flex items-center justify-center dark:bg-green-600 px-3 py-2 rounded-full h-10 w-10 ">
              <MdSend size={30} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatPage;
