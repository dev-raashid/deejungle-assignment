import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

type FetchButtonProps = {
  isLoading: boolean;
  onPress: () => void;
};

export default function FetchButton({ isLoading, onPress }: FetchButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.88}
      disabled={isLoading}
      onPress={onPress}
      style={[styles.button, isLoading && styles.buttonDisabled]}
    >
      {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.label}>Fetch Data</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#1d4ed8",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  buttonDisabled: {
    opacity: 0.72,
  },
  label: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
