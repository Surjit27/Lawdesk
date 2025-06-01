import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";

interface Author {
  _id: string;
  name: string;
  avatar: string;
  role: string;
}

interface PostProps {
  post: {
    _id: string;
    author: Author;
    content: string;
    image?: { url: string }; // Fixed the image type to match usage
    likes: string[]; // Array of user IDs who liked
    comments: {
      _id: string;
      author: Author;
      content: string;
      createdAt: string;
    }[];
    createdAt: string;
  };
  currentUserId: string | null | undefined;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
}

const Post: React.FC<PostProps> = ({
  post,
  currentUserId,
  onLike,
  onComment,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const hasLiked = currentUserId ? post.likes.includes(currentUserId) : false;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && post._id) {
      onComment(post._id, newComment);
      setNewComment("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <div className="flex items-center mb-4">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="font-semibold">{post.author.name}</h3>
          <p className="text-gray-500 text-sm">{post.author.role}</p>
        </div>
        <span className="text-gray-400 text-sm ml-auto">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      <p className="text-gray-800 mb-4">{post.content}</p>

      {post.image && (
        <img
          src={post.image.url}
          alt="Post content"
          className="w-full rounded-lg mb-4 object-cover max-h-96"
        />
      )}

      <div className="flex items-center justify-between pt-4 border-t">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onLike(post._id)}
          className={`flex items-center ${
            hasLiked ? "text-red-500" : "text-gray-500"
          }`}
        >
          <Heart className="w-5 h-5 mr-1" />
          <span>{post.likes.length}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowComments(!showComments)}
          className="flex items-center text-gray-500 hover:text-blue-500"
        >
          <MessageCircle className="w-5 h-5 mr-1" />
          <span>{post.comments.length}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center text-gray-500 hover:text-green-500"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center text-gray-500 hover:text-yellow-500"
        >
          <Bookmark className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 pt-4 border-t">
          <div className="space-y-4 mb-4">
            {post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="flex items-start">
                  <img
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <div className="bg-gray-100 rounded-lg p-3 flex-1">
                    <div className="flex items-center mb-1">
                      <h4 className="font-semibold text-sm mr-2">
                        {comment.author.name}
                      </h4>
                      <span className="text-gray-500 text-xs">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-800 text-sm">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>

          {/* Add Comment Form */}
          {currentUserId && (
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
                disabled={!newComment.trim()}
              >
                Post
              </motion.button>
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Post;
