import { useEffect, useState } from "react";
import { ChatArea } from "@/components/chat/chat-area/ChatArea";
import { ChatUserSide } from "@/components/chat/chat-user-side/ChatUserSide";
import { ChatInfoSide } from "@/components/chat/ChatInfoSide";
import { User } from "@/lib/definations";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_UR;
const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch(baseUrl + "/api/users/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const formattedData = data.map((user: any) => ({
        id: user._id,
        name: user.name,
        username: user.username,
        description: user.bio,
      }));

      const currentUserName = JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );

      const currentUser = formattedData.find(
        (user: User) => user.username === currentUserName
      );

      setCurrentUser(currentUser);
      const otherUsers = formattedData.filter(
        (user: User) => user.username !== currentUserName
      );
      setUsers(otherUsers);

      if (otherUsers.length > 0) {
        setSelectedUser(otherUsers[0]); // Set the first user as selected by default
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentUserName = (() => {
      try {
        return JSON.parse(localStorage.getItem("currentUser") || "null");
      } catch {
        return null;
      }
    })();

    if (!currentUserName) {
      navigate("/login"); // Redirect to the login page if currentUserName is not found
    } else {
      fetchUsers();
    }
  }, [navigate]); // Added 'navigate' to the dependencies

  if (loading) return <div className="max-w-7xl mx-auto">Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!selectedUser)
    return <div className="max-w-7xl mx-auto">No users found</div>;

  return (
    <div className="flex flex-col sm:flex-row gap-2 mx-2">
      <ChatUserSide
        users={users}
        currentUser={currentUser}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <ChatArea user={selectedUser} currentUser={currentUser} />
      <div className="hidden sm:inline-block sm:flex-1 sm:basis-1/5">
        <ChatInfoSide user={selectedUser} />
      </div>
    </div>
  );
};

export default Chat;
