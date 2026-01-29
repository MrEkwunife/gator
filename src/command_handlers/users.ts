import {
  getAllUsers,
  createUser,
  getUser,
  createFeedFollow,
  deleteFeedFollowForUser,
  getFeedFollowForUser,
} from "../lib/db/queries/user";
import { getFeedByURL } from "../lib/db/queries/feeds";

import { readConfig, setUser } from "../config";
import type { User, Feed } from "../lib/db/schema";

import { printFeed } from "./feeds";

export async function handlerGetUsers(_: string) {
  try {
    const users = await getAllUsers();
    const loggedInUsername = readConfig().currentUserName;

    users.forEach((user) => {
      const username = user.name;
      console.log(
        `${username}${username === loggedInUsername ? " (current)" : ""}`,
      );
    });
  } catch (error) {
    throw new Error("There was an error getting users");
  }
}

export async function handlerRegister(_: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`register expects 1 arg but got ${args.length}`);
  }

  try {
    const user = await createUser(args[0]);
    setUser(user.name);
    console.log(`${user.name} created and logged in`);
  } catch (error: any) {
    throw new Error("username already exists");
  }
}

export async function handlerLogin(_: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`Login expects 1 arg, got ${args.length}`);
  }

  const username = args[0];
  const user = await getUser(username);
  if (!user) {
    throw new Error(`${username} does not exist in our database`);
  }

  setUser(username);
  console.log(`User: ${username} is set`);
}

export async function handlerFollowFeed(
  _: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`follow expects 1 arg but got ${args.length}`);
  }

  const [url] = args;
  const feed = await getFeedByURL(url);
  if (!feed) {
    throw new Error("User or Feed not found!");
  }

  const __ = await createFeedFollow(user.id, feed.id);
  printFeed(feed, user);
}

export async function handlerUnfollowFeed(
  _: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`unfollow command expects 1 arg but got ${args.length}`);
  }

  const { id: feedId, name: feedName } = await getFeedByURL(args[0]);
  if (!feedId) {
    throw new Error("Feed Not found");
  }

  await deleteFeedFollowForUser(user.id, feedId);
  console.log(`Unfollowed ${feedName}`);
}

export async function handlerFollowing(_: string, user: User) {
  const feedFollows = await getFeedFollowForUser(user.id);
  if (feedFollows.length === 0) {
    console.log("Not Following any Feed");
    return;
  }

  console.log(`\nFeeds ${user.name} follow`);
  console.log("===============================");
  feedFollows.forEach((feed, i) => {
    console.log(`${i}. ${feed.feeds.name}`);
  });
}
