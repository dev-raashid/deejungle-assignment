import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedCounter from "@/features/home/components/animated-counter";
import FetchButton from "@/features/home/components/fetch-button";
import PostsList from "@/features/home/components/posts-list";
import { useAppStore } from "@/store/app-store";

export default function HomeScreen() {
  const counter = useAppStore((state) => state.counter);
  const posts = useAppStore((state) => state.posts);
  const isLoading = useAppStore((state) => state.isLoading);
  const error = useAppStore((state) => state.error);
  const fetchData = useAppStore((state) => state.fetchData);

  return (
    <SafeAreaView edges={["top", "left", "right"]} style={styles.safeArea}>
      <View style={styles.container}>
        <AnimatedCounter count={counter} />
        <FetchButton isLoading={isLoading} onPress={fetchData} />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.listContainer}>
          <PostsList posts={posts} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: "#f8fafc",
    backgroundColor: "#242424"
  },
  container: {
    flex: 1,
    gap: 16,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  error: {
    color: "#b91c1c",
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
  },
});
