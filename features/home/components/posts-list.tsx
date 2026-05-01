import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { Post } from "@/types/post";

type PostsListProps = {
  posts: Post[];
};

export default function PostsList({ posts }: PostsListProps) {
  if (posts.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No posts fetched yet.</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={posts}
      keyExtractor={(post) => post.id.toString()}
      renderItem={({ item: post }) => (
        <View style={styles.card}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.subtitle}>{post.subtitle}</Text>
        </View>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 12,
    paddingBottom: 32,
  },
  emptyState: {
    alignItems: "center",
    borderColor: "#d8c9b6",
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#fbf7f0",
    padding: 24,
  },
  emptyTitle: {
    color: "#7b6a58",
    fontSize: 15,
  },
  card: {
    backgroundColor: "#fff9f1",
    borderColor: "#e5d6c3",
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  title: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "capitalize",
  },
  subtitle: {
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 20,
  },
});
