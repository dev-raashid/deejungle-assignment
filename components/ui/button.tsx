import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  isLoading: boolean;
  onPress: () => void;
  label: string;
  style?: Object;
};

export default function Button({ isLoading, onPress, label, style }: ButtonProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.88}
      disabled={isLoading}
      onPress={onPress}
      style={[ styles.button, isLoading && styles.buttonDisabled , style]}
    >
      {isLoading ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#1f6f78",
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
