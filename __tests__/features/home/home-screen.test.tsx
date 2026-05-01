import { render, screen } from "@testing-library/react-native";
import React from "react";

import HomeScreen from "@/screens/home-screen";
import { resetAppStore, useAppStore } from "@/store/app-store";

jest.mock("@/components/animated-counter", () => {
  const { Text } = jest.requireActual<typeof import("react-native")>("react-native");

  return function MockAnimatedCounter({ count }: { count: number }) {
    return (
      <>
        <Text>Button Press Count</Text>
        <Text>{count}</Text>
      </>
    );
  };
});

describe("HomeScreen", () => {
  beforeEach(async () => {
    await useAppStore.persist.clearStorage();
    resetAppStore();
  });

  it("renders the counter label and fetch button", () => {
    render(<HomeScreen />);

    expect(screen.getByText("Fetch Data")).toBeTruthy();
    expect(screen.getByText("Button Press Count")).toBeTruthy();
    expect(screen.getByText("0")).toBeTruthy();
  });

  it("renders list items from store state", () => {
    useAppStore.setState({
      counter: 2,
      posts: [{ id: 1, title: "First post", subtitle: "Body copy" }],
      isLoading: false,
      error: null,
      fetchData: useAppStore.getState().fetchData,
    });

    render(<HomeScreen />);

    expect(screen.getByText("First post")).toBeTruthy();
    expect(screen.getByText("Body copy")).toBeTruthy();
  });
});
