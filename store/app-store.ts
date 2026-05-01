import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { fetchPosts } from "@/services/api/posts";
import { APP_STORAGE_KEY, AsyncStorage } from "@/services/storage/async-storage";
import { Post } from "@/types/post";

type AppState = {
  counter: number;
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
};

type PersistedAppState = Pick<AppState, "counter" | "posts">;

const initialState: PersistedAppState & Pick<AppState, "isLoading" | "error"> = {
  counter: 0,
  posts: [],
  isLoading: false,
  error: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      ...initialState,
      fetchData: async () => {
        set((state) => ({
          counter: state.counter + 1,
          isLoading: true,
          error: null,
        }));

        try {
          const posts = await fetchPosts();
          set({ posts, isLoading: false, error: null });
        } catch {
          set({
            isLoading: false,
            error: "Failed to fetch posts. Please try again.",
          });
        }
      },
    }),
    {
      name: APP_STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state): PersistedAppState => ({
        counter: state.counter,
        posts: state.posts,
      }),
    }
  )
);

export function resetAppStore() {
  useAppStore.setState({
    ...initialState,
    fetchData: useAppStore.getState().fetchData,
  });
}
