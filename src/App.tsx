// 0 = Admin, 1 = Agent, 2 = Customer
type Role = 0 | 1 | 2;

type Participant = {
  id: string;
  name: string;
  role: Role;
};

type Message = {
  id: number;
  type: "text";
  message: string;
  sender: string;
};

type ChatRoom = {
  name: string;
  id: number;
  image_url: string;
  participant: Participant[];
};

type ChatData = {
  room: ChatRoom;
  comments: Message[];
};

const chatData: ChatData = {
  room: {
    name: "Product A",
    id: 12456,
    image_url: "https://picsum.photos/id/237/200/300",
    participant: [
      {
        id: "admin@mail.com",
        name: "Admin",
        role: 0,
      },
      {
        id: "agent@mail.com",
        name: "Agent A",
        role: 1,
      },
      {
        id: "customer@mail.com",
        name: "king customer",
        role: 2,
      },
    ],
  },
  comments: [
    {
      id: 885512,
      type: "text",
      message: "Selamat malam",
      sender: "customer@mail.com",
    },
    {
      id: 885513,
      type: "text",
      message: "Malam",
      sender: "agent@mail.com",
    },
    {
      id: 885514,
      type: "text",
      message: "Ada yang bisa saya bantu?",
      sender: "agent@mail.com",
    },
    {
      id: 885515,
      type: "text",
      message:
        "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
      sender: "customer@mail.com",
    },
    {
      id: 885516,
      type: "text",
      message: "Baik, silahkan kirimkan lampiran bukti pembayarannya",
      sender: "agent@mail.com",
    },
  ],
};

const getRoleLabel = (role: Role) => {
  switch (role) {
    case 0:
      return "Admin";
    case 1:
      return "Agent";
    case 2:
      return "Customer";
    default:
      return "Unknown";
  }
};

function App() {
  const { room, comments } = chatData;

  const getParticipant = (email: string) =>
    room.participant.find((p) => p.id === email);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r p-4">
        <h2 className="mb-4 text-3xl font-bold">Chat Room</h2>

        <div className="flex items-center gap-3">
          <img
            src={room.image_url}
            alt={room.name}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="font-medium">{room.name}</div>
            <div className="text-sm">{room.participant.length} members</div>
          </div>
        </div>

        <h3 className="mb-2 mt-6 text-sm font-semibold">Participants</h3>

        <ul>
          {room.participant.map((user) => (
            <li key={user.id} className="mb-3 flex items-center gap-2">
              <img
                src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <div className="text-sm">{user.name}</div>
                <div className="text-xs text-gray-500">
                  {getRoleLabel(user.role)}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-3 border-b p-4 text-lg font-semibold">
          <img
            src={room.image_url}
            alt={room.name}
            className="h-10 w-10 rounded-full object-cover"
          />
          <p>{room.name}</p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto bg-white p-4">
          {comments.map((msg) => {
            const sender = getParticipant(msg.sender);
            const isMe = msg.sender === "customer@mail.com"; // get current user
            return (
              <div
                key={msg.id}
                className={`0 flex max-w-xl items-start gap-3 ${
                  isMe ? "ml-auto flex-row-reverse" : ""
                }`}
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${
                    sender?.name || "User"
                  }&background=random`}
                  alt={sender?.name}
                  className="h-10 w-10 rounded-full"
                />
                <div
                  className={`rounded-lg p-3 ${
                    isMe ? "bg-green-500 text-white" : "bg-gray-100"
                  }`}
                >
                  {!isMe && (
                    <div className="mb-1 flex items-center gap-2 text-sm font-medium">
                      <p>{sender?.name}</p>
                      <span className="rounded-full px-2 py-0.5 text-xs text-green-500">
                        {getRoleLabel(sender?.role ?? 2)}
                      </span>
                    </div>
                  )}
                  <div className="text-sm">{msg.message}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="flex-1 rounded-md border p-2"
              placeholder="Type a message..."
              disabled
            />
            <button className="cursor-not-allowed rounded-md bg-green-500 px-4 py-2 text-white">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
