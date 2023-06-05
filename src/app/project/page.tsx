import ListComponent from "@/src/components/Post/ListComponent";
import { getPosts } from "@/src/libs/apis";
import { filterPosts } from "@/src/libs/utils/notion";
import React from "react";

async function getFetch() {
  try {
    const posts = await getPosts();
    const filteredPost = filterPosts(posts, { acceptStatus: ["Public"], acceptType: ["Project"] });

    return {
      projects: filteredPost,
    };
  } catch (error) {
    throw error;
  }
}

export default async function ProjectPage() {
  const { projects } = await getFetch();

  return (
    <div>
      {projects.map((project) => (
        <ListComponent post={project} type="Project" />
      ))}
    </div>
  );
}
