import { act } from "@testing-library/react-native";

import { resetAppStore, useAppStore } from "@/store/app-store";

const mockFetch = jest.fn();

global.fetch = mockFetch as unknown as typeof fetch;

describe("useAppStore", () => {
  beforeEach(async () => {
    await useAppStore.persist.clearStorage();
    resetAppStore();
    mockFetch.mockReset();
  });

  it("increments the counter and stores fetched posts", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: "First post", body: "Body copy" }],
    });

    expect(useAppStore.getState().counter).toBe(0);

    await act(async () => {
      await useAppStore.getState().fetchData();
    });

    expect(useAppStore.getState().counter).toBe(1);
    expect(useAppStore.getState().posts).toEqual([
      { id: 1, title: "First post", subtitle: "Body copy" },
    ]);
    expect(useAppStore.getState().isLoading).toBe(false);
    expect(useAppStore.getState().error).toBeNull();
  });

  it("increments the counter and stores an error when the request fails", async () => {
    resetAppStore();
    useAppStore.setState({
      counter: 0,
      posts: [{ id: 7, title: "Saved", subtitle: "Persisted post" }],
      isLoading: false,
      error: null,
      fetchData: useAppStore.getState().fetchData,
    });

    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => [],
    });

    await act(async () => {
      await useAppStore.getState().fetchData();
    });

    expect(useAppStore.getState().counter).toBe(1);
    expect(useAppStore.getState().posts).toEqual([
      { id: 7, title: "Saved", subtitle: "Persisted post" },
    ]);
    expect(useAppStore.getState().error).toBe("Failed to fetch posts. Please try again.");
    expect(useAppStore.getState().isLoading).toBe(false);
  });
});
