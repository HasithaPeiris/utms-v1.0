import { Server } from "socket.io";

function configSocket(server) {
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle session update event
    socket.on("sessionUpdate", (data) => {
      console.log("Session update:", data);
    });

    // Handle timetable update event
    socket.on("timetableUpdate", (data) => {
      console.log("Timetable update:", data);
    });

    // Handle resource update event
    socket.on("resourceUpdate", (data) => {
      console.log("Resource update:", data);
    });

    // Handle disconnect event
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
  return io;
}

export default configSocket;
