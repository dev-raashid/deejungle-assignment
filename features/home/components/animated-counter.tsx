import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

type AnimatedCounterProps = {
  count: number;
};

const COLOR_TRANSITION_DURATION = 450;
const TILE_PULSE_SCALE = 1.12;
const TILE_PULSE_DURATION = 180;

type RgbColor = {
  blue: number;
  green: number;
  red: number;
};

const INITIAL_COUNT_COLOR: RgbColor = {
  red: 138,
  green: 75,
  blue: 8,
};

function getRandomColor(): RgbColor {
  return {
    red: Math.floor(Math.random() * 256),
    green: Math.floor(Math.random() * 256),
    blue: Math.floor(Math.random() * 256),
  };
}

export default function AnimatedCounter({ count }: AnimatedCounterProps) {
  const red = useSharedValue(INITIAL_COUNT_COLOR.red);
  const green = useSharedValue(INITIAL_COUNT_COLOR.green);
  const blue = useSharedValue(INITIAL_COUNT_COLOR.blue);
  const tileScale = useSharedValue(1);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    const nextColor = getRandomColor();

    red.value = withTiming(nextColor.red, { duration: COLOR_TRANSITION_DURATION });
    green.value = withTiming(nextColor.green, { duration: COLOR_TRANSITION_DURATION });
    blue.value = withTiming(nextColor.blue, { duration: COLOR_TRANSITION_DURATION });
    tileScale.value = withSequence(
      withTiming(TILE_PULSE_SCALE, { duration: TILE_PULSE_DURATION }),
      withTiming(1, { duration: TILE_PULSE_DURATION })
    );
  }, [blue, count, green, red, tileScale]);

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: `rgb(${Math.round(red.value)}, ${Math.round(green.value)}, ${Math.round(blue.value)})`,
      transform: [{ scale: tileScale.value }],
    };
  });

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Button Press Count</Text>
        <Animated.Text style={[styles.count, animatedTextStyle]}>{count}</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    borderColor: "#d1a77d",
    borderWidth: 1,
    paddingHorizontal: 24,
    paddingVertical: 24,
    backgroundColor: "#f4dcc2",
    borderRadius: 16,
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
    fontSize: 42,
    fontWeight: "800",
  },
});
