import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPost {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: UserComment[];
}

interface UserComment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  timestamp: string;
}

interface UserDataState {
  posts: UserPost[];
  addPost: (userId: string, content: string) => void;
  addComment: (userId: string, postId: string, content: string) => void;
  getUserPosts: (userId: string) => UserPost[];
  getPostComments: (postId: string) => UserComment[];
}

export const useUserDataStore = create<UserDataState>()(
  persist(
    (set, get) => ({
      posts: [],
      
      addPost: (userId: string, content: string) => {
        const newPost: UserPost = {
          id: `post-${Date.now()}`,
          userId,
          content,
          timestamp: new Date().toISOString(),
          likes: 0,
          comments: [],
        };
        
        set((state) => ({
          posts: [newPost, ...state.posts],
        }));
      },
      
      addComment: (userId: string, postId: string, content: string) => {
        const newComment: UserComment = {
          id: `comment-${Date.now()}`,
          userId,
          postId,
          content,
          timestamp: new Date().toISOString(),
        };
        
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId
              ? { ...post, comments: [...post.comments, newComment] }
              : post
          ),
        }));
      },
      
      getUserPosts: (userId: string) => {
        return get().posts.filter((post) => post.userId === userId);
      },
      
      getPostComments: (postId: string) => {
        const post = get().posts.find((p) => p.id === postId);
        return post?.comments || [];
      },
    }),
    {
      name: 'user-data-storage',
    }
  )
);