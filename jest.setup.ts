import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import "@testing-library/jest-native/extend-expect";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("react-native-reanimated", () => require("react-native-reanimated/mock"));
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper", () => ({}), {
  virtual: true,
});

(globalThis as { __reanimatedWorkletInit?: () => void }).__reanimatedWorkletInit = () => {};
