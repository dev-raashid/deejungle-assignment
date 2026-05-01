import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AnimatedCounter from "@/components/animated-counter";
import PostsList from "@/components/posts/posts-list";
import Button from "@/components/ui/button";
import { resetAppStore, useAppStore } from "@/store/app-store";

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
        <Button label="Fetch Data" isLoading={isLoading} onPress={fetchData} />
        <Button label="Reset" isLoading={false} onPress={resetAppStore} style={{ backgroundColor: 'red' }} />
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
    backgroundColor: "#f4efe6",
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
