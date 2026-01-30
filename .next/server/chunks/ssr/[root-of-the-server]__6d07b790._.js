module.exports = [
"[project]/.next-internal/server/app/(main)/projects/[id]/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/(main)/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(main)/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminProcedure",
    ()=>adminProcedure,
    "createCallerFactory",
    ()=>createCallerFactory,
    "createTRPCContext",
    ()=>createTRPCContext,
    "createTRPCRouter",
    ()=>createTRPCRouter,
    "protectedProcedure",
    ()=>protectedProcedure,
    "publicProcedure",
    ()=>publicProcedure
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$T5bbc89W$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/initTRPC-T5bbc89W.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/tracked-D4V22yc5.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superjson$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/superjson/dist/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/ZodError.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/auth.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const createTRPCContext = async (opts)=>{
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["auth"])();
    return {
        db: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"],
        session,
        ...opts
    };
};
const t = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$T5bbc89W$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["initTRPC"].context().create({
    transformer: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$superjson$2f$dist$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    errorFormatter ({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$ZodError$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ZodError"] ? error.cause.flatten() : null
            }
        };
    }
});
const createCallerFactory = t.createCallerFactory;
const createTRPCRouter = t.router;
const timingMiddleware = t.middleware(async ({ next, path })=>{
    const start = Date.now();
    const result = await next();
    const end = Date.now();
    console.log(`[TRPC] ${path} took ${end - start}ms`);
    return result;
});
const publicProcedure = t.procedure.use(timingMiddleware);
const protectedProcedure = t.procedure.use(timingMiddleware).use(({ ctx, next })=>{
    if (!ctx.session || !ctx.session.user) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
            code: "UNAUTHORIZED"
        });
    }
    return next({
        ctx: {
            session: {
                ...ctx.session,
                user: ctx.session.user
            }
        }
    });
});
const adminProcedure = protectedProcedure.use(({ ctx, next })=>{
    if (ctx.session.user.role !== "ADMIN" && ctx.session.user.role !== "OWNER") {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
            code: "FORBIDDEN"
        });
    }
    return next();
});
}),
"[project]/src/lib/validators.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createCommentSchema",
    ()=>createCommentSchema,
    "createEmojiSchema",
    ()=>createEmojiSchema,
    "createPostSchema",
    ()=>createPostSchema,
    "createProjectSchema",
    ()=>createProjectSchema,
    "paginationSchema",
    ()=>paginationSchema,
    "presignedUrlSchema",
    ()=>presignedUrlSchema,
    "signInSchema",
    ()=>signInSchema,
    "signUpSchema",
    ()=>signUpSchema,
    "toggleReactionSchema",
    ()=>toggleReactionSchema,
    "updateCommentSchema",
    ()=>updateCommentSchema,
    "updatePostSchema",
    ()=>updatePostSchema,
    "updateProfileSchema",
    ()=>updateProfileSchema,
    "updateProjectSchema",
    ()=>updateProjectSchema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
;
const signUpSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email address"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8, "Password must be at least 8 characters").max(100, "Password is too long"),
    displayName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2, "Name must be at least 2 characters").max(50)
});
const signInSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().email("Invalid email address"),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Password is required")
});
const updateProfileSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    displayName: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2).max(50).optional(),
    avatarUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional().nullable()
});
const createPostSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().max(200).optional(),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any(),
    liveUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional().nullable(),
    projectIds: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    attachments: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "IMAGE",
            "VIDEO",
            "FILE",
            "FIGMA",
            "LOOM"
        ]),
        url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url(),
        filename: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        mimeType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
        width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
        height: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
        thumbnailUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional(),
        metadata: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional(),
        order: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number()
    })).default([])
});
const updatePostSchema = createPostSchema.partial().extend({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const createCommentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    postId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any(),
    parentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    attachmentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    coordinates: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        x: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
        y: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
        width: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
        height: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional(),
        timestamp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
    }).optional()
});
const updateCommentSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()
});
const toggleReactionSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    type: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(50),
    postId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    commentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
}).refine((data)=>data.postId || data.commentId, "Either postId or commentId must be provided");
const createProjectSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1, "Project name is required").max(100),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any().optional(),
    coverUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url().optional().nullable(),
    urls: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        title: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1).max(100),
        url: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()
    })).default([])
});
const updateProjectSchema = createProjectSchema.partial().extend({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
const paginationSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    cursor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
    limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1).max(50).default(20)
});
const presignedUrlSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    filename: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    contentType: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    size: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().max(100 * 1024 * 1024)
});
const createEmojiSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2).max(32).regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, and underscores"),
    imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()
});
}),
"[project]/src/server/api/routers/post.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "postRouter",
    ()=>postRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/tracked-D4V22yc5.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validators.ts [app-rsc] (ecmascript)");
;
;
;
;
const postRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createPostSchema"]).mutation(async ({ ctx, input })=>{
        const post = await ctx.db.post.create({
            data: {
                title: input.title,
                content: input.content,
                liveUrl: input.liveUrl,
                authorId: ctx.session.user.id,
                attachments: {
                    create: input.attachments.map((att)=>({
                            type: att.type,
                            url: att.url,
                            filename: att.filename,
                            mimeType: att.mimeType,
                            size: att.size,
                            width: att.width,
                            height: att.height,
                            thumbnailUrl: att.thumbnailUrl,
                            metadata: att.metadata,
                            order: att.order
                        }))
                },
                projects: {
                    create: input.projectIds.map((projectId)=>({
                            projectId
                        }))
                }
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                attachments: {
                    orderBy: {
                        order: "asc"
                    }
                },
                projects: {
                    include: {
                        project: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        reactions: true
                    }
                }
            }
        });
        return post;
    }),
    getById: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const post = await ctx.db.post.findUnique({
            where: {
                id: input.id
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                attachments: {
                    orderBy: {
                        order: "asc"
                    }
                },
                projects: {
                    include: {
                        project: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                reactions: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                displayName: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        comments: true
                    }
                }
            }
        });
        if (!post) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        return post;
    }),
    feed: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["paginationSchema"]).query(async ({ ctx, input })=>{
        const posts = await ctx.db.post.findMany({
            take: input.limit + 1,
            cursor: input.cursor ? {
                id: input.cursor
            } : undefined,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                attachments: {
                    orderBy: {
                        order: "asc"
                    },
                    take: 3
                },
                projects: {
                    include: {
                        project: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                reactions: {
                    select: {
                        type: true,
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        reactions: true,
                        attachments: true
                    }
                }
            }
        });
        let nextCursor;
        if (posts.length > input.limit) {
            const nextItem = posts.pop();
            nextCursor = nextItem?.id;
        }
        return {
            posts,
            nextCursor
        };
    }),
    byUser: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["paginationSchema"].extend({
        userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const posts = await ctx.db.post.findMany({
            where: {
                authorId: input.userId
            },
            take: input.limit + 1,
            cursor: input.cursor ? {
                id: input.cursor
            } : undefined,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                attachments: {
                    orderBy: {
                        order: "asc"
                    },
                    take: 3
                },
                projects: {
                    include: {
                        project: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                reactions: {
                    select: {
                        type: true,
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        reactions: true,
                        attachments: true
                    }
                }
            }
        });
        let nextCursor;
        if (posts.length > input.limit) {
            const nextItem = posts.pop();
            nextCursor = nextItem?.id;
        }
        return {
            posts,
            nextCursor
        };
    }),
    byProject: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["paginationSchema"].extend({
        projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const posts = await ctx.db.post.findMany({
            where: {
                projects: {
                    some: {
                        projectId: input.projectId
                    }
                }
            },
            take: input.limit + 1,
            cursor: input.cursor ? {
                id: input.cursor
            } : undefined,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                attachments: {
                    orderBy: {
                        order: "asc"
                    },
                    take: 3
                },
                projects: {
                    include: {
                        project: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                reactions: {
                    select: {
                        type: true,
                        userId: true
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        reactions: true,
                        attachments: true
                    }
                }
            }
        });
        let nextCursor;
        if (posts.length > input.limit) {
            const nextItem = posts.pop();
            nextCursor = nextItem?.id;
        }
        return {
            posts,
            nextCursor
        };
    }),
    update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updatePostSchema"]).mutation(async ({ ctx, input })=>{
        const existingPost = await ctx.db.post.findUnique({
            where: {
                id: input.id
            },
            select: {
                authorId: true
            }
        });
        if (!existingPost) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        if (existingPost.authorId !== ctx.session.user.id) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "FORBIDDEN"
            });
        }
        // Delete existing attachments and project links if updating
        if (input.attachments) {
            await ctx.db.attachment.deleteMany({
                where: {
                    postId: input.id
                }
            });
        }
        if (input.projectIds) {
            await ctx.db.postProject.deleteMany({
                where: {
                    postId: input.id
                }
            });
        }
        const post = await ctx.db.post.update({
            where: {
                id: input.id
            },
            data: {
                title: input.title,
                content: input.content,
                liveUrl: input.liveUrl,
                attachments: input.attachments ? {
                    create: input.attachments.map((att)=>({
                            type: att.type,
                            url: att.url,
                            filename: att.filename,
                            mimeType: att.mimeType,
                            size: att.size,
                            width: att.width,
                            height: att.height,
                            thumbnailUrl: att.thumbnailUrl,
                            metadata: att.metadata,
                            order: att.order
                        }))
                } : undefined,
                projects: input.projectIds ? {
                    create: input.projectIds.map((projectId)=>({
                            projectId
                        }))
                } : undefined
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                attachments: {
                    orderBy: {
                        order: "asc"
                    }
                },
                projects: {
                    include: {
                        project: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return post;
    }),
    delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        const existingPost = await ctx.db.post.findUnique({
            where: {
                id: input.id
            },
            select: {
                authorId: true
            }
        });
        if (!existingPost) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        const isAdmin = ctx.session.user.role === "ADMIN" || ctx.session.user.role === "OWNER";
        if (existingPost.authorId !== ctx.session.user.id && !isAdmin) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "FORBIDDEN"
            });
        }
        await ctx.db.post.delete({
            where: {
                id: input.id
            }
        });
        return {
            success: true
        };
    })
});
}),
"[project]/src/server/api/routers/user.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "userRouter",
    ()=>userRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/tracked-D4V22yc5.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validators.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const userRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    register: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["publicProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signUpSchema"]).mutation(async ({ ctx, input })=>{
        const existingUser = await ctx.db.user.findUnique({
            where: {
                email: input.email
            }
        });
        if (existingUser) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "CONFLICT",
                message: "User with this email already exists"
            });
        }
        const passwordHash = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["hash"])(input.password, 12);
        // Check if this is the first user (make them OWNER)
        const userCount = await ctx.db.user.count();
        const role = userCount === 0 ? "OWNER" : "MEMBER";
        const user = await ctx.db.user.create({
            data: {
                email: input.email,
                passwordHash,
                displayName: input.displayName,
                role
            },
            select: {
                id: true,
                email: true,
                displayName: true,
                role: true
            }
        });
        return user;
    }),
    me: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].query(async ({ ctx })=>{
        const user = await ctx.db.user.findUnique({
            where: {
                id: ctx.session.user.id
            },
            select: {
                id: true,
                email: true,
                displayName: true,
                avatarUrl: true,
                role: true,
                createdAt: true
            }
        });
        if (!user) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        return user;
    }),
    getById: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const user = await ctx.db.user.findUnique({
            where: {
                id: input.id
            },
            select: {
                id: true,
                email: true,
                displayName: true,
                avatarUrl: true,
                createdAt: true
            }
        });
        if (!user) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        return user;
    }),
    updateProfile: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProfileSchema"]).mutation(async ({ ctx, input })=>{
        const user = await ctx.db.user.update({
            where: {
                id: ctx.session.user.id
            },
            data: input,
            select: {
                id: true,
                email: true,
                displayName: true,
                avatarUrl: true
            }
        });
        return user;
    }),
    search: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
    })).query(async ({ ctx, input })=>{
        const users = await ctx.db.user.findMany({
            where: {
                OR: [
                    {
                        displayName: {
                            contains: input.query,
                            mode: "insensitive"
                        }
                    },
                    {
                        email: {
                            contains: input.query,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            select: {
                id: true,
                displayName: true,
                avatarUrl: true
            },
            take: 10
        });
        return users;
    }),
    // Admin endpoints
    list: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        cursor: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional(),
        limit: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().min(1).max(100).default(50)
    })).query(async ({ ctx, input })=>{
        const users = await ctx.db.user.findMany({
            take: input.limit + 1,
            cursor: input.cursor ? {
                id: input.cursor
            } : undefined,
            orderBy: {
                createdAt: "desc"
            },
            select: {
                id: true,
                email: true,
                displayName: true,
                avatarUrl: true,
                role: true,
                createdAt: true
            }
        });
        let nextCursor;
        if (users.length > input.limit) {
            const nextItem = users.pop();
            nextCursor = nextItem?.id;
        }
        return {
            users,
            nextCursor
        };
    }),
    updateRole: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["adminProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        role: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
            "MEMBER",
            "ADMIN"
        ])
    })).mutation(async ({ ctx, input })=>{
        // Can't change owner's role or their own role
        const targetUser = await ctx.db.user.findUnique({
            where: {
                id: input.userId
            }
        });
        if (!targetUser) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        if (targetUser.role === "OWNER") {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "FORBIDDEN",
                message: "Cannot change owner's role"
            });
        }
        if (input.userId === ctx.session.user.id) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "FORBIDDEN",
                message: "Cannot change your own role"
            });
        }
        const user = await ctx.db.user.update({
            where: {
                id: input.userId
            },
            data: {
                role: input.role
            },
            select: {
                id: true,
                role: true
            }
        });
        return user;
    })
});
}),
"[project]/src/server/api/routers/comment.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "commentRouter",
    ()=>commentRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/tracked-D4V22yc5.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validators.ts [app-rsc] (ecmascript)");
;
;
;
;
const commentRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCommentSchema"]).mutation(async ({ ctx, input })=>{
        // Verify post exists
        const post = await ctx.db.post.findUnique({
            where: {
                id: input.postId
            },
            select: {
                id: true,
                authorId: true
            }
        });
        if (!post) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND",
                message: "Post not found"
            });
        }
        // If replying, verify parent exists and is not already a reply
        if (input.parentId) {
            const parent = await ctx.db.comment.findUnique({
                where: {
                    id: input.parentId
                },
                select: {
                    parentId: true,
                    authorId: true
                }
            });
            if (!parent) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                    code: "NOT_FOUND",
                    message: "Parent comment not found"
                });
            }
            // Enforce max 2 levels of nesting
            if (parent.parentId) {
                throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                    code: "BAD_REQUEST",
                    message: "Cannot reply to a reply"
                });
            }
        }
        const comment = await ctx.db.comment.create({
            data: {
                content: input.content,
                postId: input.postId,
                authorId: ctx.session.user.id,
                parentId: input.parentId,
                attachmentId: input.attachmentId,
                coordinates: input.coordinates
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                replies: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                displayName: true,
                                avatarUrl: true
                            }
                        }
                    }
                }
            }
        });
        // Create notification for post author (if not self)
        if (post.authorId !== ctx.session.user.id) {
            await ctx.db.notification.create({
                data: {
                    type: input.parentId ? "COMMENT_REPLY" : "COMMENT",
                    userId: post.authorId,
                    actorId: ctx.session.user.id,
                    postId: input.postId,
                    commentId: comment.id
                }
            });
        }
        // If replying, also notify the parent comment author
        if (input.parentId) {
            const parent = await ctx.db.comment.findUnique({
                where: {
                    id: input.parentId
                },
                select: {
                    authorId: true
                }
            });
            if (parent && parent.authorId !== ctx.session.user.id && parent.authorId !== post.authorId) {
                await ctx.db.notification.create({
                    data: {
                        type: "COMMENT_REPLY",
                        userId: parent.authorId,
                        actorId: ctx.session.user.id,
                        postId: input.postId,
                        commentId: comment.id
                    }
                });
            }
        }
        return comment;
    }),
    byPost: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        postId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const comments = await ctx.db.comment.findMany({
            where: {
                postId: input.postId,
                parentId: null
            },
            orderBy: {
                createdAt: "asc"
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                replies: {
                    orderBy: {
                        createdAt: "asc"
                    },
                    include: {
                        author: {
                            select: {
                                id: true,
                                displayName: true,
                                avatarUrl: true
                            }
                        },
                        reactions: {
                            select: {
                                type: true,
                                userId: true
                            }
                        }
                    }
                },
                reactions: {
                    select: {
                        type: true,
                        userId: true
                    }
                }
            }
        });
        return comments;
    }),
    byAttachment: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        attachmentId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const comments = await ctx.db.comment.findMany({
            where: {
                attachmentId: input.attachmentId
            },
            orderBy: {
                createdAt: "asc"
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                reactions: {
                    select: {
                        type: true,
                        userId: true
                    }
                }
            }
        });
        return comments;
    }),
    update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateCommentSchema"]).mutation(async ({ ctx, input })=>{
        const existingComment = await ctx.db.comment.findUnique({
            where: {
                id: input.id
            },
            select: {
                authorId: true
            }
        });
        if (!existingComment) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        if (existingComment.authorId !== ctx.session.user.id) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "FORBIDDEN"
            });
        }
        const comment = await ctx.db.comment.update({
            where: {
                id: input.id
            },
            data: {
                content: input.content
            },
            include: {
                author: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                }
            }
        });
        return comment;
    }),
    delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        const existingComment = await ctx.db.comment.findUnique({
            where: {
                id: input.id
            },
            select: {
                authorId: true
            }
        });
        if (!existingComment) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        const isAdmin = ctx.session.user.role === "ADMIN" || ctx.session.user.role === "OWNER";
        if (existingComment.authorId !== ctx.session.user.id && !isAdmin) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "FORBIDDEN"
            });
        }
        await ctx.db.comment.delete({
            where: {
                id: input.id
            }
        });
        return {
            success: true
        };
    })
});
}),
"[project]/src/server/api/routers/reaction.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "reactionRouter",
    ()=>reactionRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validators.ts [app-rsc] (ecmascript)");
;
;
;
const reactionRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    toggle: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toggleReactionSchema"]).mutation(async ({ ctx, input })=>{
        const userId = ctx.session.user.id;
        // Check if reaction already exists
        const existingReaction = await ctx.db.reaction.findFirst({
            where: {
                userId,
                type: input.type,
                postId: input.postId ?? undefined,
                commentId: input.commentId ?? undefined
            }
        });
        if (existingReaction) {
            // Remove the reaction
            await ctx.db.reaction.delete({
                where: {
                    id: existingReaction.id
                }
            });
            return {
                added: false,
                type: input.type
            };
        }
        // Add the reaction
        const reaction = await ctx.db.reaction.create({
            data: {
                type: input.type,
                userId,
                postId: input.postId,
                commentId: input.commentId
            }
        });
        // Create notification
        if (input.postId) {
            const post = await ctx.db.post.findUnique({
                where: {
                    id: input.postId
                },
                select: {
                    authorId: true
                }
            });
            if (post && post.authorId !== userId) {
                await ctx.db.notification.create({
                    data: {
                        type: "REACTION_POST",
                        userId: post.authorId,
                        actorId: userId,
                        postId: input.postId
                    }
                });
            }
        }
        if (input.commentId) {
            const comment = await ctx.db.comment.findUnique({
                where: {
                    id: input.commentId
                },
                select: {
                    authorId: true,
                    postId: true
                }
            });
            if (comment && comment.authorId !== userId) {
                await ctx.db.notification.create({
                    data: {
                        type: "REACTION_COMMENT",
                        userId: comment.authorId,
                        actorId: userId,
                        postId: comment.postId,
                        commentId: input.commentId
                    }
                });
            }
        }
        return {
            added: true,
            type: input.type,
            id: reaction.id
        };
    }),
    byPost: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        postId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const reactions = await ctx.db.reaction.findMany({
            where: {
                postId: input.postId
            },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true
                    }
                }
            }
        });
        // Group reactions by type
        const grouped = reactions.reduce((acc, reaction)=>{
            if (!acc[reaction.type]) {
                acc[reaction.type] = [];
            }
            acc[reaction.type].push({
                userId: reaction.userId,
                userName: reaction.user.displayName
            });
            return acc;
        }, {});
        return grouped;
    }),
    // Custom emoji management
    listEmoji: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].query(async ({ ctx })=>{
        const emoji = await ctx.db.customEmoji.findMany({
            orderBy: {
                name: "asc"
            }
        });
        return emoji;
    }),
    createEmoji: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2).max(32).regex(/^[a-z0-9_]+$/),
        imageUrl: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().url()
    })).mutation(async ({ ctx, input })=>{
        const emoji = await ctx.db.customEmoji.create({
            data: {
                name: input.name,
                imageUrl: input.imageUrl,
                createdBy: ctx.session.user.id
            }
        });
        return emoji;
    }),
    deleteEmoji: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        await ctx.db.customEmoji.delete({
            where: {
                id: input.id
            }
        });
        return {
            success: true
        };
    })
});
}),
"[project]/src/server/api/routers/project.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "projectRouter",
    ()=>projectRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/tracked-D4V22yc5.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validators.ts [app-rsc] (ecmascript)");
;
;
;
;
const projectRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    create: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProjectSchema"]).mutation(async ({ ctx, input })=>{
        const project = await ctx.db.project.create({
            data: {
                name: input.name,
                description: input.description,
                coverUrl: input.coverUrl,
                createdById: ctx.session.user.id,
                urls: {
                    create: input.urls.map((url)=>({
                            title: url.title,
                            url: url.url
                        }))
                },
                members: {
                    create: {
                        userId: ctx.session.user.id,
                        role: "OWNER"
                    }
                }
            },
            include: {
                urls: true,
                _count: {
                    select: {
                        posts: true,
                        members: true
                    }
                }
            }
        });
        return project;
    }),
    getById: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ ctx, input })=>{
        const project = await ctx.db.project.findUnique({
            where: {
                id: input.id
            },
            include: {
                urls: true,
                members: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                displayName: true,
                                avatarUrl: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        posts: true
                    }
                }
            }
        });
        if (!project) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        // Include createdById for authorization checks
        return {
            ...project,
            createdById: project.createdById
        };
    }),
    list: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["paginationSchema"]).query(async ({ ctx, input })=>{
        const projects = await ctx.db.project.findMany({
            take: input.limit + 1,
            cursor: input.cursor ? {
                id: input.cursor
            } : undefined,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                urls: {
                    take: 3
                },
                _count: {
                    select: {
                        posts: true,
                        members: true
                    }
                }
            }
        });
        let nextCursor;
        if (projects.length > input.limit) {
            const nextItem = projects.pop();
            nextCursor = nextItem?.id;
        }
        return {
            projects,
            nextCursor
        };
    }),
    search: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        query: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1)
    })).query(async ({ ctx, input })=>{
        const projects = await ctx.db.project.findMany({
            where: {
                name: {
                    contains: input.query,
                    mode: "insensitive"
                }
            },
            select: {
                id: true,
                name: true,
                coverUrl: true
            },
            take: 10
        });
        return projects;
    }),
    update: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProjectSchema"]).mutation(async ({ ctx, input })=>{
        const existingProject = await ctx.db.project.findUnique({
            where: {
                id: input.id
            },
            select: {
                createdById: true
            }
        });
        if (!existingProject) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        const isAdmin = ctx.session.user.role === "ADMIN" || ctx.session.user.role === "OWNER";
        if (existingProject.createdById !== ctx.session.user.id && !isAdmin) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "FORBIDDEN"
            });
        }
        // Delete existing URLs if updating
        if (input.urls) {
            await ctx.db.projectUrl.deleteMany({
                where: {
                    projectId: input.id
                }
            });
        }
        const project = await ctx.db.project.update({
            where: {
                id: input.id
            },
            data: {
                name: input.name,
                description: input.description,
                coverUrl: input.coverUrl,
                urls: input.urls ? {
                    create: input.urls.map((url)=>({
                            title: url.title,
                            url: url.url
                        }))
                } : undefined
            },
            include: {
                urls: true,
                _count: {
                    select: {
                        posts: true,
                        members: true
                    }
                }
            }
        });
        return project;
    }),
    delete: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        const existingProject = await ctx.db.project.findUnique({
            where: {
                id: input.id
            },
            select: {
                createdById: true
            }
        });
        if (!existingProject) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        const isAdmin = ctx.session.user.role === "ADMIN" || ctx.session.user.role === "OWNER";
        if (existingProject.createdById !== ctx.session.user.id && !isAdmin) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "FORBIDDEN"
            });
        }
        await ctx.db.project.delete({
            where: {
                id: input.id
            }
        });
        return {
            success: true
        };
    }),
    addMember: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        const project = await ctx.db.project.findUnique({
            where: {
                id: input.projectId
            },
            select: {
                createdById: true
            }
        });
        if (!project) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "NOT_FOUND"
            });
        }
        const member = await ctx.db.projectMember.create({
            data: {
                projectId: input.projectId,
                userId: input.userId,
                role: "MEMBER"
            },
            include: {
                user: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                }
            }
        });
        return member;
    }),
    removeMember: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        projectId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        userId: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        await ctx.db.projectMember.deleteMany({
            where: {
                projectId: input.projectId,
                userId: input.userId
            }
        });
        return {
            success: true
        };
    })
});
}),
"[project]/src/server/api/routers/notification.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "notificationRouter",
    ()=>notificationRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validators.ts [app-rsc] (ecmascript)");
;
;
;
const notificationRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    list: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["paginationSchema"]).query(async ({ ctx, input })=>{
        const notifications = await ctx.db.notification.findMany({
            where: {
                userId: ctx.session.user.id
            },
            take: input.limit + 1,
            cursor: input.cursor ? {
                id: input.cursor
            } : undefined,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                actor: {
                    select: {
                        id: true,
                        displayName: true,
                        avatarUrl: true
                    }
                },
                post: {
                    select: {
                        id: true,
                        title: true
                    }
                },
                comment: {
                    select: {
                        id: true
                    }
                }
            }
        });
        let nextCursor;
        if (notifications.length > input.limit) {
            const nextItem = notifications.pop();
            nextCursor = nextItem?.id;
        }
        return {
            notifications,
            nextCursor
        };
    }),
    unreadCount: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].query(async ({ ctx })=>{
        const count = await ctx.db.notification.count({
            where: {
                userId: ctx.session.user.id,
                read: false
            }
        });
        return count;
    }),
    markAsRead: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ ctx, input })=>{
        await ctx.db.notification.update({
            where: {
                id: input.id,
                userId: ctx.session.user.id
            },
            data: {
                read: true
            }
        });
        return {
            success: true
        };
    }),
    markAllAsRead: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].mutation(async ({ ctx })=>{
        await ctx.db.notification.updateMany({
            where: {
                userId: ctx.session.user.id,
                read: false
            },
            data: {
                read: true
            }
        });
        return {
            success: true
        };
    })
});
}),
"[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@aws-sdk/client-s3", () => require("@aws-sdk/client-s3"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/src/lib/r2.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFileType",
    ()=>getFileType,
    "getPresignedDownloadUrl",
    ()=>getPresignedDownloadUrl,
    "getPresignedUploadUrl",
    ()=>getPresignedUploadUrl,
    "getPublicUrl",
    ()=>getPublicUrl,
    "isFigmaUrl",
    ()=>isFigmaUrl,
    "isLoomUrl",
    ()=>isLoomUrl,
    "isR2Configured",
    ()=>isR2Configured
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/s3-request-presigner/dist-es/getSignedUrl.js [app-rsc] (ecmascript)");
;
;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;
function isR2Configured() {
    return !!(R2_ACCOUNT_ID && R2_ACCESS_KEY_ID && R2_SECRET_ACCESS_KEY && R2_BUCKET_NAME);
}
// Only create S3 client if configured
const s3Client = isR2Configured() ? new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__["S3Client"]({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY
    }
}) : null;
async function getPresignedUploadUrl({ filename, contentType, userId }) {
    if (!s3Client || !R2_BUCKET_NAME) {
        throw new Error("R2 storage is not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME environment variables.");
    }
    // Generate a unique key with user ID and timestamp
    const timestamp = Date.now();
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.-]/g, "_");
    const key = `uploads/${userId}/${timestamp}-${sanitizedFilename}`;
    const command = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__["PutObjectCommand"]({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType
    });
    const uploadUrl = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSignedUrl"])(s3Client, command, {
        expiresIn: 3600
    });
    // Public URL for accessing the file after upload
    const publicUrl = R2_PUBLIC_URL ? `${R2_PUBLIC_URL}/${key}` : `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
    return {
        uploadUrl,
        key,
        publicUrl
    };
}
async function getPresignedDownloadUrl(key) {
    if (!s3Client || !R2_BUCKET_NAME) {
        throw new Error("R2 storage is not configured. Please set R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, and R2_BUCKET_NAME environment variables.");
    }
    const command = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$29$__["GetObjectCommand"]({
        Bucket: R2_BUCKET_NAME,
        Key: key
    });
    const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSignedUrl"])(s3Client, command, {
        expiresIn: 3600
    });
    return url;
}
function getPublicUrl(key) {
    if (R2_PUBLIC_URL) {
        return `${R2_PUBLIC_URL}/${key}`;
    }
    return `https://${R2_BUCKET_NAME}.${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;
}
function getFileType(mimeType) {
    if (mimeType.startsWith("image/")) return "IMAGE";
    if (mimeType.startsWith("video/")) return "VIDEO";
    return "FILE";
}
function isFigmaUrl(url) {
    return url.includes("figma.com");
}
function isLoomUrl(url) {
    return url.includes("loom.com");
}
}),
"[project]/src/server/api/routers/upload.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "uploadRouter",
    ()=>uploadRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@trpc/server/dist/tracked-D4V22yc5.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/v3/external.js [app-rsc] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/validators.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/r2.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const uploadRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    getUploadUrl: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$validators$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["presignedUrlSchema"]).mutation(async ({ ctx, input })=>{
        // Check if R2 is configured
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isR2Configured"])()) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "PRECONDITION_FAILED",
                message: "File uploads are not configured. Please set up R2 storage credentials (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME) in your environment variables."
            });
        }
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPresignedUploadUrl"])({
                filename: input.filename,
                contentType: input.contentType,
                userId: ctx.session.user.id
            });
            return result;
        } catch (error) {
            console.error("Error generating presigned URL:", error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "Failed to generate upload URL"
            });
        }
    }),
    getDownloadUrl: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        key: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v3$2f$external$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ input })=>{
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isR2Configured"])()) {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "PRECONDITION_FAILED",
                message: "File downloads are not configured. Please set up R2 storage credentials."
            });
        }
        try {
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPresignedDownloadUrl"])(input.key);
            return {
                url
            };
        } catch (error) {
            console.error("Error generating download URL:", error);
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$tracked$2d$D4V22yc5$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TRPCError"]({
                code: "INTERNAL_SERVER_ERROR",
                message: error instanceof Error ? error.message : "Failed to generate download URL"
            });
        }
    })
});
}),
"[project]/src/server/api/root.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appRouter",
    ()=>appRouter,
    "createCaller",
    ()=>createCaller
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$post$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/post.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/user.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$comment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/comment.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$reaction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/reaction.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$project$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/project.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/notification.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$upload$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/routers/upload.ts [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
const appRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCRouter"])({
    post: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$post$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["postRouter"],
    user: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$user$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["userRouter"],
    comment: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$comment$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["commentRouter"],
    reaction: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$reaction$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["reactionRouter"],
    project: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$project$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["projectRouter"],
    notification: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$notification$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notificationRouter"],
    upload: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$routers$2f$upload$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["uploadRouter"]
});
const createCaller = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCallerFactory"])(appRouter);
}),
"[project]/src/lib/trpc/server.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$server$2d$only$2f$empty$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/server-only/empty.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/root.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/server/api/trpc.ts [app-rsc] (ecmascript)");
;
;
;
;
;
const createContext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cache"])(async ()=>{
    const heads = new Headers(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])());
    heads.set("x-trpc-source", "rsc");
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$trpc$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTRPCContext"])({
        headers: heads
    });
});
const api = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$server$2f$api$2f$root$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createCaller"])(createContext);
}),
"[project]/src/components/projects/ProjectDetail.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ProjectDetail",
    ()=>ProjectDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProjectDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProjectDetail() from the server but ProjectDetail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/projects/ProjectDetail.tsx <module evaluation>", "ProjectDetail");
}),
"[project]/src/components/projects/ProjectDetail.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "ProjectDetail",
    ()=>ProjectDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const ProjectDetail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call ProjectDetail() from the server but ProjectDetail is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/components/projects/ProjectDetail.tsx", "ProjectDetail");
}),
"[project]/src/components/projects/ProjectDetail.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$projects$2f$ProjectDetail$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/components/projects/ProjectDetail.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$projects$2f$ProjectDetail$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/components/projects/ProjectDetail.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$projects$2f$ProjectDetail$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/(main)/projects/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProjectPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/server.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$projects$2f$ProjectDetail$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/projects/ProjectDetail.tsx [app-rsc] (ecmascript)");
;
;
;
;
async function ProjectPage({ params }) {
    const { id } = await params;
    const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$server$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["api"].project.getById({
        id
    }).catch(()=>null);
    if (!project) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$projects$2f$ProjectDetail$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ProjectDetail"], {
        project: project
    }, void 0, false, {
        fileName: "[project]/src/app/(main)/projects/[id]/page.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/app/(main)/projects/[id]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/(main)/projects/[id]/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6d07b790._.js.map