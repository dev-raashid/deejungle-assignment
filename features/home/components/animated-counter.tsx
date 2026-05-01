import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type AnimatedCounterProps = {
  count: number;
};

const MAX_VISUAL_COUNT = 10;

export default function AnimatedCounter({ count }: AnimatedCounterProps) {
  const progress = useSharedValue(count);

  useEffect(() => {
    progress.value = withTiming(count, { duration: 350 });
  }, [count, progress]);

  const animatedCardStyle = useAnimatedStyle(() => {
    const clamped = Math.min(progress.value, MAX_VISUAL_COUNT);

    return {
      backgroundColor: interpolateColor(clamped, [0, MAX_VISUAL_COUNT], ["#f4dcc2", "#e7c39f"]),
      borderRadius: interpolate(clamped, [0, MAX_VISUAL_COUNT], [20, 36]),
      transform: [{ scale: interpolate(clamped, [0, MAX_VISUAL_COUNT], [1, 1.06]) }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const clamped = Math.min(progress.value, MAX_VISUAL_COUNT);

    return {
      color: interpolateColor(clamped, [0, MAX_VISUAL_COUNT], ["#8a4b08", "#6f3f12"]),
      fontSize: interpolate(clamped, [0, MAX_VISUAL_COUNT], [40, 56]),
    };
  });

  return (
    <Animated.View style={[styles.card, animatedCardStyle]}>
      <Text style={styles.label}>Button Press Count</Text>
      <Animated.Text style={[styles.count, animatedTextStyle]}>{count}</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderColor: "#d1a77d",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  label: {
    color: "#7a4b24",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.4,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  count: {
    fontWeight: "800",
  },
});
