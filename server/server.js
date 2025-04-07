import express from "express";
import cors from "cors";
import db from "./db.js";
import { Server } from "socket.io";
import http from "http";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// Serial communication
const port = new SerialPort({ path: "COM3", baudRate: 57600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// Socket.io logic
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Store form data on the socket
  socket.on("formData", async (data) => {
    try {
      socket.userData = data; // ✅ Store on socket
      socket.emit("status", "Form data received");
    } catch (err) {
      socket.emit("error", "Form processing failed");
    }
  });

  // Trigger enrollment via serial
  socket.on("startEnrollment", () => {
    if (!socket.userData) {
      socket.emit("error", "No form data available");
      return;
    }

    // Optional: Turn on green LED from ESP32
    // port.write("LED_GREEN_ON\n");

    port.write("ENROLL\n", (err) => {
      if (err) {
        socket.emit("error", "Sensor communication failed");
      }
    });
  });

  socket.on("disconnect", () => {
    socket.userData = null;
  });
});

// Handle serial output from ESP32
parser.on("data", async (line) => {
  line = line.trim();
  console.log(`Sensor: ${line}`);

  if (line.startsWith("SUCCESS:")) {
    const fingerprintId = parseInt(line.split(":")[1]);
    const sockets = await io.fetchSockets();

    for (const socket of sockets) {
      if (socket.userData) {
        try {
          const { name, fname, mname, dob, address, nid } = socket.userData;

          await db.execute(
            `INSERT INTO voters 
            (name, fname, mname, dob, address, nid, fingerprint_id) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [name, fname, mname, dob, address, nid, fingerprintId]
          );

          socket.emit("enrollmentSuccess", fingerprintId);
        } catch (err) {
          console.error("DB Save Error:", err.message);
          socket.emit("error", "Database save failed");
        }
      }
    }
  } else if (line.startsWith("ERROR:")) {
    const errorMsg = line.split(":")[1];
    io.emit("enrollmentError", errorMsg);

    // Optional: Control LED
    // port.write("LED_GREEN_OFF\n");
    // port.write("LED_RED_ON\n");
  }
});

server.listen(3000, () => console.log("Server running on port 3000"));
