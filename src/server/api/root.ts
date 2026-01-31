import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/post";
import { userRouter } from "~/server/api/routers/user";
import { commentRouter } from "~/server/api/routers/comment";
import { reactionRouter } from "~/server/api/routers/reaction";
import { projectRouter } from "~/server/api/routers/project";
import { notificationRouter } from "~/server/api/routers/notification";
import { uploadRouter } from "~/server/api/routers/upload";
import { siteRouter } from "~/server/api/routers/site";
import { draftRouter } from "~/server/api/routers/draft";
import { searchRouter } from "~/server/api/routers/search";

export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  comment: commentRouter,
  reaction: reactionRouter,
  project: projectRouter,
  notification: notificationRouter,
  upload: uploadRouter,
  site: siteRouter,
  draft: draftRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
