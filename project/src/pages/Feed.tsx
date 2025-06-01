import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CreatePost from "../components/feed/CreatePost";
import Post from "../components/feed/Post";
import { useSocket } from "../providers/SocketProvider";
import { useAuth, useUser } from "@clerk/clerk-react";

interface Author {
  _id: string;
  name: string;
  avatar: string;
  role: string;
}

interface CommentType {
  _id: string;
  author: Author;
  content: string;
  createdAt: string;
}

interface PostType {
  _id: string;
  author: Author;
  content: string;
  image?: string;
  likes: string[];
  comments: CommentType[];
  createdAt: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentingPostId, setCommentingPostId] = useState<string | null>(null);
  const { socket } = useSocket();
  const { userId } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    console.log("Psted Updsates");
    console.log(posts);
  }, [posts]);

  useEffect(() => {
    if (!socket) return;

    // Fetch initial posts
    const fetchPosts = () => {
      socket.emit("getAllPosts");
      setLoading(true);
    };

    fetchPosts();

    // Listen for incoming posts
    socket.on("postList", (fetchedPosts: PostType[]) => {
      console.log("Anser", fetchedPosts);
      setPosts(fetchedPosts);
      setLoading(false);
    });

    // Listen for new posts from other clients
    socket.on("newPost", (newPost: PostType) => {
      setPosts((prev) => [newPost, ...prev]);
    });

    // Listen for post updates (likes)
    socket.on("postLiked", (updatedPost: PostType) => {
      setPosts((prev) =>
        prev.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    });

    // Listen for new comments
    socket.on(
      "commentAdded",
      ({ postId, comment }: { postId: string; comment: CommentType }) => {
        setPosts((prev) =>
          prev.map((post) =>
            post._id === postId
              ? { ...post, comments: [...post.comments, comment] } // Append new comment
              : post
          )
        );
      }
    );

    // Error handling
    socket.on("postError", (error) => {
      console.error("Post error:", error);
      setLoading(false);
    });

    return () => {
      socket.off("postList");
      socket.off("newPost");
      socket.off("postLiked");
      socket.off("commentAdded");
      socket.off("postError");
    };
  }, [socket]);

  const handleLike = (postId: string) => {
    if (!userId) return;
    socket?.emit("likePost", { postId, userId });
  };

  const handleComment = (postId: string, content: string) => {
    if (!user || !content.trim()) return;

    socket?.emit("addComment", {
      postId,
      userId: user.id, // Send userId correctly
      content,
      username: user.fullName, // Get the full name from the user object
      avatar: user.imageUrl, // Get the avatar URL
    });

    setCommentingPostId(null);
  };

  const handleCommentClick = (postId: string) => {
    setCommentingPostId(commentingPostId === postId ? null : postId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <CreatePost />

          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              No posts yet. Be the first to share your legal insights!
            </motion.div>
          ) : (
            posts.map((post) => (
              <Post
                key={post._id}
                post={post}
                currentUserId={userId}
                onLike={handleLike}
                onComment={handleComment}
                showComments={commentingPostId === post._id}
                onCommentClick={() => handleCommentClick(post._id)}
              />
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Feed;
