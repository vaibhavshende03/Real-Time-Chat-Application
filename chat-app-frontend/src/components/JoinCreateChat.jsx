import React, { useState } from "react";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinRoomApi } from "./services/RoomService";
import useChatContext from "../context/chatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {
  const [details, setdetails] = useState({
    roomId: "",
    userName: "",
  });
  const {
    roomId,
    userName,
    setRoomId,
    setCurrentUser,
    connected,
    setConnected,
  } = useChatContext();

  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setdetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  }
  function validateForm() {
    if (details.userName === "" || details.roomId === "") {
      toast.error("Invalid Input!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinRoomApi(details.roomId);

        toast.success("Joined..."); // Call the API
        //set the roomId and userName in the context
        setCurrentUser(details.userName);
        setRoomId(room.roomId);

        setConnected(true); // Set connected to true
        //forward to the chat page
        navigate("/chat");
      } catch (error) {
        if (
          error.response?.status === 400 &&
          error.response?.data === "Room Not Found!!"
        ) {
          toast.error("Room Not Found.");
        } else {
          toast.error("Error in joining room");
        }
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoomApi(details); // Call the API
        console.log(response); // Log the response data
        toast.success("Room Created Successfully");
        //set the roomId and userName in the context
        setCurrentUser(details.userName);
        setRoomId(response.roomId);
        setConnected(true); // Set connected to true
        //forward to the chat page
        navigate("/chat");
      } catch (error) {
        if (
          error.response?.status === 400 &&
          error.response?.data === "Room Already exists."
        ) {
          toast.error(
            "Room ID already exists. Please choose a different Room ID."
          );
        } else {
          console.log(error.response?.data || error.message); // Log detailed error
          toast.error("Error in creating room");
        }
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center border">
      <div className="flex flex-col gap-5 border p-10 w-full max-w-md rounded bg-gray-700 shadow-lg">
        <div>
          <img src={chatIcon} alt="chatIcon" className="w-24 mx-auto" />
        </div>
        <h1 className="text-2xl font-semibold text-center ">
          Join Room / Create Room
        </h1>
        {/* for Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Your Name
          </label>
          <input
            onChange={handleFormInputChange}
            value={details.userName}
            name="userName"
            type="text"
            id="name"
            placeholder="Enter Your Name"
            className="w-full px-4 py-2 border dark:bg-gray-600 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus::ring-blue-500"
          />
        </div>

        {/* for Room ID */}
        <div>
          <label htmlFor="roomId" className="block font-medium mb-2">
            Your Room Id / New Room Id
          </label>
          <input
            onChange={handleFormInputChange}
            value={details.roomId}
            name="roomId"
            type="text"
            id="roomId"
            placeholder="Enter Your Room Id"
            className="w-full px-4 py-2 border dark:bg-gray-600 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button  */}
        <div className="flex gap-4 item-center justify-center m-4">
          <button
            onClick={joinChat}
            className="py-2 px-4 dark:border-gray-600 dark:bg-blue-600 hover:dark:bg-blue-800 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Join Room
          </button>

          <button
            onClick={createRoom}
            className="py-2 px-4 dark:border-gray-600 dark:bg-orange-600 hover:dark:bg-orange-800 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
