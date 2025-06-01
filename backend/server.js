const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const { ObjectId } = require("mongodb");
const { clerkClient, clerkMiddleware } = require("@clerk/express");
const { config } = require("dotenv");

//.env

config();

const app = express();
const server = http.createServer(app);
const PORT = 7000;
// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL in production
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// MongoDB Connection
const MONGO_URI =
  "mongodb+srv://surjitsrkumar:lawdesk@cluster0.3g5ra.mongodb.net";
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB Connected to Database");

    // Start Socket.IO after DB connection
    setupSocketIO();
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}
connectDB();

async function addPublicMetadataByEmail(clerkUserId, role) {
  try {
    // Update public metadata
    const updatedUser = await clerkClient.users.updateUserMetadata(
      clerkUserId,
      {
        publicMetadata: { role: role },
      }
    );
    console.log(
      `Successfully updated metadata for user ${updatedUser.id}:`,
      updatedUser
    );
    return updatedUser;
  } catch (error) {
    console.error(
      `Error updating user metadata for email "${clerkUserId}":`,
      error
    );
    throw error;
  }
}

// Socket.IO Connection Handler
function setupSocketIO() {
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Listen for new case events from clients
    socket.on("createpost", async (caseData) => {
      try {
        const db = client.db("lawdesk");
        const collection = db.collection("post");

        // Ensure caseData has a timestamp
        caseData.createdAt = new Date();

        // Insert case to MongoDB
        const result = await collection.insertOne(caseData);

        if (!result.acknowledged) {
          throw new Error("Insertion failed");
        }

        // Retrieve all posts sorted by creation date (newest first)
        const allPosts = await collection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        // Emit the updated post list to all clients
        io.emit("postList", allPosts);

        console.log("Case created and broadcasted:", allPosts);
      } catch (error) {
        console.error("Error creating case:", error);
        socket.emit("caseError", { message: "Failed to create case" });
      }
    });

    socket.on("getAllPosts", async () => {
      try {
        const db = client.db("lawdesk");
        const postsCollection = db.collection("post");

        console.log("getting post");

        // Retrieve all posts sorted by creation date (newest first)
        const allPosts = await postsCollection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        // Send just to this client
        console.log("getting sending");

        console.log(allPosts);

        socket.emit("postList", allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        socket.emit("postError", {
          message: "Failed to fetch posts",
          error: error.message,
        });
      }
    });

    socket.on("likePost", async ({ postId, userId }) => {
      try {
        const db = client.db("lawdesk");
        const postsCollection = db.collection("post");

        console.log("jsbisbhsbhjsb -> ", postId, userId);

        // Find the post
        const post = await postsCollection.findOne({
          _id: new ObjectId(postId),
        });

        if (!post) {
          return socket.emit("postError", { message: "Post not found" });
        }

        // Ensure 'likes' field exists
        const hasLiked = post?.likes?.includes(userId) ?? false;

        // Update the likes array
        const update = hasLiked
          ? { $pull: { likes: userId } } // Unlike
          : { $addToSet: { likes: userId } }; // Like

        const result = await postsCollection.updateOne(
          { _id: new ObjectId(postId) },
          update
        );

        if (!result.modifiedCount) {
          throw new Error("Failed to update likes");
        }

        // Get the updated post and emit it
        const updatedPost = await postsCollection.findOne({
          _id: new ObjectId(postId),
        });

        if (updatedPost) {
          io.emit("postLiked", updatedPost);
          console.log("Post liked/unliked:", updatedPost);
        }
      } catch (error) {
        console.error("Error liking post:", error);
        socket.emit("postError", { message: "Failed to like post" });
      }
    });

    socket.on("createCase", async (caseData, userid) => {
      try {
        const db = client.db("lawdesk");
        const collection = db.collection("case");
        console.log("create a case", caseData, userid);
        // Ensure caseData has a timestamp
        caseData.createdAt = new Date();
        caseData.userid = userid;
        caseData.status = "open";
        caseData.bidding = [];
        caseData.lawyer = null;
        caseData.isaccepted = null;
        // Insert case to MongoDB
        const result = await collection.insertOne(caseData);

        if (!result.acknowledged) {
          throw new Error("Insertion failed");
        }

        // Retrieve all cases sorted by creation date (newest first)
        const allCases = await collection
          .find()
          .sort({ createdAt: -1 })
          .toArray();

        // Emit the updated case list to all clients
        io.emit("newcase", allCases);

        console.log("Case created and broadcasted:", allCases);
      } catch (error) {
        console.error("Error creating case:", error);
        socket.emit("caseError", { message: "Failed to create case" });
      }
    });

    socket.on("getAllCases", async (userid) => {
      try {
        const db = client.db("lawdesk");
        const casesCollection = db.collection("case");

        console.log("Fetching cases...");

        // Construct query based on userid
        const query = userid ? { userid: userid } : {}; // Fetch all cases if userid is not provided

        // Retrieve cases sorted by creation date (newest first)
        const allCases = await casesCollection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();

        console.log("Sending cases to client...");
        socket.emit("caseList", allCases);
      } catch (error) {
        console.error("Error fetching cases:", error);
        socket.emit("caseError", {
          message: "Failed to fetch cases",
          error: error.message,
        });
      }
    });

    socket.on("getcase", async (userid, caseid) => {
      try {
        const db = client.db("lawdesk");
        const casesCollection = db.collection("case");

        console.log(`Fetching case ${caseid} for user ${userid}...`);

        // Construct query to find the specific case that belongs to the user
        const query = {
          _id: new ObjectId(caseid), // Convert string caseid to MongoDB ObjectId
          ...(userid && { userid: userid }), // Add userid condition only if userid is provided
        };

        // Find the specific case
        const caseData = await casesCollection.findOne(query);

        if (!caseData) {
          const errorMessage = userid
            ? "Case not found or doesn't belong to this user"
            : "Case not found";
          socket.emit("caseDetails", "");
        }

        console.log("Sending case data to client...");
        socket.emit("caseDetails", caseData);
      } catch (error) {
        console.error("Error fetching case:", error);
        socket.emit("caseError", {
          message: "Failed to fetch case",
          error: error.message,
        });
      }
    });
    // Case Management
    socket.on("cm-getallcases", async (userid, method) => {
      try {
        const db = client.db("lawdesk");
        const casesCollection = db.collection("case");

        console.log(
          `Fetching cases with userid: ${userid}, method: ${method}...`
        );

        let query = {};

        if (method === "pending") {
          // For pending method: get cases with status = pending, LawyerId = userid, and in bidding
          query = {
            "bidding.status": "pending",
            "bidding.LawyerId": userid,
          };
        } else if (method === "accepted") {
          // For accepted method: get cases with status = accepted and LawyerId = userid
          query = {
            "bidding.status": "accepted",
            LawyerId: userid,
          };
        } else if (userid === null || userid === undefined) {
          // If no userid provided: get all cases that don't have status "closed"
          query = { status: { $ne: "closed" } };
        } else {
          // Otherwise: get cases for the specific userid
          query = { userid: userid };
        }

        // Retrieve cases sorted by creation date (newest first)
        const allCases = await casesCollection
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();

        console.log(`Found ${allCases.length} cases. Sending to client...`);
        socket.emit("caseList", allCases);
      } catch (error) {
        console.error("Error fetching cases:", error);
        socket.emit("caseError", {
          message: "Failed to fetch cases",
          error: error.message,
        });
      }
    });

    socket.on("getAllLawyers", async (userId) => {
      try {
        const db = client.db("lawdesk");
        const usersCollection = db.collection("users");

        console.log("Fetching all lawyers");

        // Find all users who have the 'stats' field (indicating they are lawyers)
        const allLawyers = await usersCollection
          .find({ stats: { $exists: true } }) // Only users with 'stats' are lawyers
          // Sort by rating in descending order
          .toArray();

        // Send the list of lawyers to the requesting client
        socket.emit("lawyerList", allLawyers);
        console.log("Sent lawyers list to client");
      } catch (error) {
        console.error("Error fetching lawyers:", error);
        socket.emit("lawyerError", {
          message: "Failed to fetch lawyers",
          error: error.message,
        });
      }
    });

    socket.on("getLawyerProfile", async (lawyerId) => {
      try {
        const db = client.db("lawdesk");
        const lawyersCollection = db.collection("users");
        console.log(lawyerId);

        const lawyer = await lawyersCollection.findOne({
          clerkUserId: lawyerId,
        });
        console.log(lawyer);

        if (!lawyer) {
          return socket.emit("lawyerProfile", null);
        }

        socket.emit("lawyerProfile", lawyer);
        console.log("Sent lawyer profile to client");
      } catch (error) {
        console.error("Error fetching lawyer profile:", error);
        socket.emit("lawyerError", {
          message: "Failed to fetch lawyer profile",
          error: error.message,
        });
      }
    });

    socket.on("getAllplaces", async () => {
      try {
        const db = client.db("lawdesk");
        const lawyersCollection = db.collection("places");

        console.log("Fetching all places");

        // Get all lawyers (you might want to add filters later)
        const places = await lawyersCollection.find().toArray();

        // Send to requesting client
        socket.emit("placesList", places);
        console.log("Sent lawyers list to client");
      } catch (error) {
        console.error("Error fetching lawyers:", error);
        socket.emit("lawyerError", {
          message: "Failed to fetch lawyers",
          error: error.message,
        });
      }
    });

    socket.on("bidding", async (caseid, userid, amount, proposal) => {
      try {
        console.log("New bid received:", { caseid, userid, amount, proposal });

        const db = client.db("lawdesk");
        const casesCollection = db.collection("case");

        // Create the bid object
        const newBid = {
          lawyerId: userid,
          amount: amount,
          proposal: proposal,
          status: "pending",
          timestamp: new Date(), // Add timestamp for tracking
        };

        // Update the case by adding the bid to its bids array
        const updateResult = await casesCollection.updateOne(
          { _id: new ObjectId(caseid) }, // Find the case by ID
          {
            $push: { bidding: newBid }, // Add the new bid to bids array
          }
        );

        if (updateResult.matchedCount === 0) {
          console.log("No case found with ID:", caseid);
          return socket.emit("bidError", {
            message: "Case not found",
            caseid: caseid,
          });
        }

        console.log("Bid successfully added to case:", caseid);

        // Fetch and return the updated case
        const updatedCase = await casesCollection.findOne({
          _id: new ObjectId(caseid),
        });
        socket.emit("bidSuccess", {
          message: "Bid submitted successfully",
          case: updatedCase,
        });

        // Broadcast to all connected clients about the new bid
        socket.broadcast.emit("newBid", {
          caseid: caseid,
          bid: newBid,
        });
      } catch (error) {
        console.error("Error processing bid:", error);
        socket.emit("bidError", {
          message: "Failed to process bid",
          error: error.message,
          caseid: caseid,
        });
      }
    });

    // Get Lawyers

    socket.on("get-lawyer", async (lawyerid) => {
      try {
        const db = client.db("lawdesk");
        const lawyersCollection = db.collection("users"); // Assuming your collection is named "lawyers"

        console.log(`Fetching lawyer with ID: ${lawyerid}...`);

        // Construct query to find the specific lawyer
        const query = {
          clerkUserId: lawyerid, // Convert string lawyerid to MongoDB ObjectId
        };

        // Find the specific lawyer
        const lawyerData = await lawyersCollection.findOne(query);

        if (!lawyerData) {
          throw new Error("Lawyer not found");
        }

        console.log("Sending lawyer data to client...");
        socket.emit("get-lawyer-response", lawyerData);
      } catch (error) {
        console.error("Error fetching lawyer:", error);
        socket.emit("lawyerError", {
          message: "Failed to fetch lawyer",
          error: error.message,
        });
      }
    });

    // Add comment to post
    socket.on(
      "addComment",
      async ({ postId, userId, username, avatar, content }) => {
        const db = client.db("lawdesk");
        const postsCollection = db.collection("post");

        // Ensure the post exists
        const post = await postsCollection.findOne({
          _id: new ObjectId(postId),
        });

        if (!post) {
          return socket.emit("postError", { message: "Post not found" });
        }

        // Create new comment
        const newComment = {
          _id: new ObjectId(),
          author: {
            id: userId,
            name: username,
            avatar: avatar,
          },
          content,
          createdAt: new Date().toISOString(),
        };

        // Add comment to the post
        const result = await postsCollection.updateOne(
          { _id: new ObjectId(postId) },
          { $push: { comments: newComment } }
        );

        if (!result.modifiedCount) {
          throw new Error("Failed to add comment");
        }

        // Emit just the new comment, not the entire array
        io.emit("commentAdded", {
          postId,
          comment: newComment, // Send just the new comment
        });
      }
    );

    // Dashboard
    // Dashboard Initialization - All data in users collection
    socket.on("dashboard:init", async ({ userId }) => {
      try {
        const db = client.db("lawdesk");

        console.log(userId);

        // Fetch user data
        const user = await db.collection("users").findOne(
          { clerkUserId: userId },
          {
            projection: {
              profile: 1,
              stats: 1,
            },
          }
        );

        if (!user) {
          return socket.emit("dashboard:error", { message: "User not found" });
        }

        // Fetch total number of posts by the user
        const totalPosts = await db
          .collection("posts")
          .countDocuments({ authorId: userId });

        // Fetch cases where the user is either the poster or a lawyer
        const casesInvolved = await db.collection("case").countDocuments({
          $or: [{ userid: userId }, { "bidding.lawyerId": userId }],
        });

        const acceptedCases = await db.collection("case").countDocuments({
          $or: [
            { userid: userId, status: "accepted" }, // Cases user posted & accepted
            { lawyer: userId, status: "accepted" }, // Cases where user is an accepted lawyer
          ],
        });

        // Fetch recent posts by the user
        const recentPosts = await db
          .collection("posts")
          .find({ authorId: userId })
          .sort({ createdAt: -1 })
          .limit(5)
          .toArray();

        // Fetch recent cases where the user is either the poster or lawyer
        const recentCases = await db
          .collection("case")
          .find({
            $or: [{ userid: userId }, { "bidding.lawyerId": userId }],
          })
          .sort({ createdAt: -1 })
          .limit(5)
          .toArray();

        // Merge and sort activities by timestamp (most recent first)
        const activities = [...recentPosts, ...recentCases]
          .map((item) => ({
            type: item.content ? "post" : "case", // Identify type
            title: item.title || "New Post", // Use title if available
            createdAt: item.createdAt,
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10); // Limit to 10 recent activities

        // Combine stats
        const stats = {
          ...user.stats,

          casesInvolved,
          totalPosts,
          acceptedCases,
        };
        console.log("Out is ->", stats, activities);

        // Emit all data to the client
        socket.emit("dashboard:profile", user.profile || {});
        socket.emit("dashboard:stats", stats);
        socket.emit("dashboard:activities", activities);
      } catch (error) {
        console.error("Dashboard initialization error:", error);
        socket.emit("dashboard:error", {
          message: "Failed to load dashboard data",
        });
      }
    });

    // Add new activity to user's document
    socket.on("addActivity", async ({ userId, message, type = "update" }) => {
      try {
        const db = client.db("lawdesk");
        const newActivity = {
          message,
          type,
          timestamp: new Date(),
        };

        const result = await db.collection("users").updateOne(
          { clerkUserId: userId },
          {
            $push: {
              activities: {
                $each: [newActivity],
                $position: 0,
                $slice: 20, // Keep only last 20 activities
              },
            },
          }
        );

        if (result.modifiedCount === 1) {
          io.emit("dashboard:activity:new", newActivity);
        }
      } catch (error) {
        console.error("Error adding activity:", error);
      }
    });

    // Update user stats
    socket.on("updateStats", async ({ userId, stats }) => {
      try {
        const db = client.db("lawdesk");
        await db
          .collection("users")
          .updateOne(
            { clerkUserId: new ObjectId(userId) },
            { $set: { stats } }
          );
        socket.emit("dashboard:stats:updated", stats);
      } catch (error) {
        console.error("Error updating stats:", error);
      }
    });

    // Update user profile
    socket.on("updateProfile", async ({ userId, profile }) => {
      try {
        const db = client.db("lawdesk");
        await db
          .collection("users")
          .updateOne({ clerkUserId: userId }, { $set: { profile } });
        socket.emit("dashboard:profile:updated", profile);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    });

    //------------------ Chat App

    socket.on("join-user", async (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined their room`);
    });

    // Handle initial data request
    socket.on("request-initial-data", async (userId) => {
      const db = client.db("lawdesk");
      try {
        const chats = await db
          .collection("chats")
          .find({ participants: userId })
          .sort({ updatedAt: -1 })
          .toArray();

        const onlineUsers = Array.from(io.sockets.adapter.rooms.keys()).filter(
          (room) => room.startsWith("user_")
        );

        socket.emit("initial-data", { chats, onlineUsers });
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    });

    // Create new chat
    socket.on("create-chat", async ({ participants }) => {
      const db = client.db("lawdesk");
      try {
        // Check if chat already exists
        const existingChat = await db.collection("chats").findOne({
          participants: { $all: participants, $size: participants.length },
        });

        if (existingChat) {
          return socket.emit("chat-created", existingChat);
        }

        // Create new chat
        const newChat = {
          participants,
          createdAt: new Date(),
          updatedAt: new Date(),
          lastMessage: null,
          unreadCount: participants.reduce(
            (acc, p) => ({ ...acc, [p]: 0 }),
            {}
          ),
        };

        const result = await db.collection("chats").insertOne(newChat);
        const createdChat = await db
          .collection("chats")
          .findOne({ _id: result.insertedId });

        // Notify all participants
        participants.forEach((userId) => {
          io.to(userId).emit("chat-created", createdChat);
        });
      } catch (error) {
        console.error("Error creating chat:", error);
      }
    });

    // Send message
    socket.on("send-message", async (message) => {
      const db = client.db("lawdesk");
      try {
        // Save message to database
        await db.collection("messages").insertOne(message);

        // Update chat metadata
        await db.collection("chats").updateOne(
          { _id: message.chatId },
          {
            $set: {
              lastMessage: message.content,
              updatedAt: new Date(),
            },
            $inc: {
              [`unreadCount.${message.sender}`]: 0, // Ensure field exists
              [`unreadCount.${message.receiver}`]: 1,
            },
          }
        );

        const updatedChat = await db
          .collection("chats")
          .findOne({ _id: message.chatId });

        // Broadcast to all participants
        updatedChat.participants.forEach((userId) => {
          io.to(userId).emit("receive-message", message);
          io.to(userId).emit("chat-updated", updatedChat);
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    // Mark messages as read
    socket.on("mark-messages-read", async ({ chatId, userId }) => {
      const db = client.db("lawdesk");
      try {
        // Update messages read status
        await db
          .collection("messages")
          .updateMany(
            { chatId, sender: { $ne: userId }, read: false },
            { $set: { read: true } }
          );

        // Update chat unread count
        await db
          .collection("chats")
          .updateOne(
            { _id: chatId },
            { $set: { [`unreadCount.${userId}`]: 0 } }
          );

        const updatedChat = await db
          .collection("chats")
          .findOne({ _id: chatId });
        io.to(chatId).emit("chat-updated", updatedChat);
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    });

    // Add user
    socket.on("createUser", async (userdetails, role) => {
      const db = client.db("lawdesk");
      try {
        const { email, clerkUserId } = userdetails;

        // Check if user already exists
        const existingUser = await db
          .collection("users")
          .findOne({ clerkUserId });

        if (existingUser) {
          console.log("User already exists:", clerkUserId);
          socket.emit("userCreateError", { message: "User already exists" });
          return;
        }

        // If user doesn't exist, proceed with creation
        console.log("User created successfully:", userdetails);
        console.log(
          `New user created - ID: ${clerkUserId}, Email: ${email}, Role: ${role}`
        );

        const result = await db.collection("users").insertOne(userdetails);
        addPublicMetadataByEmail(clerkUserId, role);
        console.log("User stored in database with ID:", result.insertedId);
        socket.emit("userCreateSuccess", { message: "Success" });
      } catch (error) {
        console.error("Error handling user creation:", error);
        socket.emit("userCreateError", { message: "Error creating user" });
      }
    });

    // Bid Accept

    socket.on("bid-accept", async ({ caseId, lawyerId, userId }, callback) => {
      try {
        const db = client.db("lawdesk");
        const casesCollection = db.collection("case");

        console.log(
          `Accepting bid for case ${caseId} by lawyer ${lawyerId} for user ${userId}...`
        );

        // Verify the case exists, is open, and belongs to the user
        const existingCase = await casesCollection.findOne({
          _id: new ObjectId(caseId),
          userid: userId, // Ensure the case belongs to this user
          status: "open",
        });

        if (!existingCase) {
          throw new Error(
            "Case not found, not owned by you, or not open for bidding"
          );
        }

        // Verify the lawyer is in the bidding array
        const lawyerBid = existingCase.bidding.find(
          (bid) => bid.lawyerId === lawyerId
        );

        if (!lawyerBid) {
          throw new Error("This lawyer has not bid on your case");
        }

        // Update the case
        const updateResult = await casesCollection.updateOne(
          { _id: new ObjectId(caseId) },
          {
            $set: {
              status: "accepted",
              lawyer: lawyerId, // Set the accepted lawyer
              "bidding.$[elem].status": "accepted", // Mark this bid as accepted
              isaccepted: true, // Add update timestamp
            },
          },
          {
            arrayFilters: [{ "elem.lawyerId": lawyerId }], // Only update matching bid
          }
        );

        if (updateResult.modifiedCount === 0) {
          throw new Error("Failed to update case - please try again");
        }

        console.log(`Bid accepted successfully for case ${caseId}`);
        callback({
          success: true,
          message: "Bid accepted successfully",
          updatedCase: {
            ...existingCase,
            status: "accepted",
            LawyerId: lawyerId,
          },
        });
      } catch (error) {
        console.error("Error accepting bid:", error);
        callback({
          success: false,
          message: error.message || "Failed to accept bid",
          error: error.message,
        });
      }
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });

    // Law Lib App

    socket.on("legallaw", async (userId) => {
      try {
        const db = client.db("lawdesk");
        const laws = await db.collection("laws").find({}).toArray();

        // Manual laws data
        if (laws.length === 0) {
          const sampleLaws = [
            {
              _id: "law_1001",
              title: "Civil Rights Act",
              year: 1964,
              description:
                "Prohibits discrimination based on race, color, religion, sex, or national origin",
            },
            {
              _id: "law_1002",
              title: "Digital Privacy Act",
              year: 2022,
              description: "Regulates data collection and user privacy online",
            },
          ];
          await db.collection("laws").insertMany(sampleLaws);
          socket.emit("legallaw", sampleLaws);
        } else {
          socket.emit("legallaw", laws);
        }
      } catch (error) {
        console.error("Laws fetch error:", error);
        socket.emit("lawError", "Failed to fetch laws");
      }
    });

    // Get Previous Cases (manually implemented without separate collection)
    socket.on("pcases", async (userId) => {
      try {
        const sampleCases = [
          {
            _id: "case_2001",
            title: "Doe v. State",
            year: 2023,
            outcome: "Settled",
            summary: "Landmark privacy case",
          },
          {
            _id: "case_2002",
            title: "State v. Smith",
            year: 2022,
            outcome: "Appealed",
            summary: "Criminal procedure case",
          },
        ];
        socket.emit("previouscases", sampleCases);
      } catch (error) {
        console.error("Cases fetch error:", error);
        socket.emit("casesError", "Failed to fetch cases");
      }
    });

    // Get Court Orders (manually implemented)
    socket.on("corders", async (userId) => {
      try {
        const sampleOrders = [
          {
            _id: "order_3001",
            caseNumber: "SC-2023-001",
            judge: "Hon. Roberts",
            date: "2023-06-15",
            ruling: "Motion granted",
          },
        ];
        socket.emit("courtorders", sampleOrders);
      } catch (error) {
        console.error("Orders fetch error:", error);
        socket.emit("ordersError", "Failed to fetch orders");
      }
    });

    // Get Articles
    socket.on("articles", async (userId) => {
      try {
        const db = client.db("lawdesk");
        const articles = await db.collection("articles").find({}).toArray();

        if (articles.length === 0) {
          const sampleArticles = [
            {
              _id: "art_5001",
              title: "Recent Changes in Tax Law",
              author: "Legal Journal",
              date: "2023-10-01",
            },
          ];
          await db.collection("articles").insertMany(sampleArticles);
          socket.emit("articles", sampleArticles);
        } else {
          socket.emit("articles", articles);
        }
      } catch (error) {
        console.error("Articles fetch error:", error);
        socket.emit("articlesError", "Failed to fetch articles");
      }
    });

    // Get Documents
    socket.on("documents", async (userId) => {
      try {
        const sampleDocs = [
          {
            _id: "doc_6001",
            name: "Contract Template.docx",
            type: "template",
            size: "250KB",
          },
          {
            _id: "doc_6002",
            name: "Case Brief.pdf",
            type: "brief",
            size: "1.2MB",
          },
        ];
        socket.emit("documentation", sampleDocs);
      } catch (error) {
        console.error("Documents fetch error:", error);
        socket.emit("documentsError", "Failed to fetch documents");
      }
    });
  });
}

// REST API Endpoint (kept for backward compatibility)

// Start Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
