(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, variant, size, asChild = false, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 46,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(param) {
    let { className, variant, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/badge.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dialog",
    ()=>Dialog,
    "DialogClose",
    ()=>DialogClose,
    "DialogContent",
    ()=>DialogContent,
    "DialogDescription",
    ()=>DialogDescription,
    "DialogFooter",
    ()=>DialogFooter,
    "DialogHeader",
    ()=>DialogHeader,
    "DialogOverlay",
    ()=>DialogOverlay,
    "DialogPortal",
    ()=>DialogPortal,
    "DialogTitle",
    ()=>DialogTitle,
    "DialogTrigger",
    ()=>DialogTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
const Dialog = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const DialogTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const DialogPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"];
const DialogClose = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"];
const DialogOverlay = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 20,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c = DialogOverlay;
DialogOverlay.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Overlay"].displayName;
const DialogContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c1 = (param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogPortal, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DialogOverlay, {}, void 0, false, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 36,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", className),
                ...props,
                children: [
                    children,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 47,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 48,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 46,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 35,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c2 = DialogContent;
DialogContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
const DialogHeader = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 text-center sm:text-left", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 59,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c3 = DialogHeader;
DialogHeader.displayName = "DialogHeader";
const DialogFooter = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 73,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
};
_c4 = DialogFooter;
DialogFooter.displayName = "DialogFooter";
const DialogTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c5 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-lg font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 87,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c6 = DialogTitle;
DialogTitle.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"].displayName;
const DialogDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c7 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 102,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c8 = DialogDescription;
DialogDescription.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"].displayName;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "DialogOverlay");
__turbopack_context__.k.register(_c1, "DialogContent$React.forwardRef");
__turbopack_context__.k.register(_c2, "DialogContent");
__turbopack_context__.k.register(_c3, "DialogHeader");
__turbopack_context__.k.register(_c4, "DialogFooter");
__turbopack_context__.k.register(_c5, "DialogTitle$React.forwardRef");
__turbopack_context__.k.register(_c6, "DialogTitle");
__turbopack_context__.k.register(_c7, "DialogDescription$React.forwardRef");
__turbopack_context__.k.register(_c8, "DialogDescription");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/nodes/MentionNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$createMentionNode",
    ()=>$createMentionNode,
    "$isMentionNode",
    ()=>$isMentionNode,
    "MentionNode",
    ()=>MentionNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
;
;
class MentionNode extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextNode"] {
    static getType() {
        return "mention";
    }
    static clone(node) {
        return new MentionNode(node.__mentionType, node.__mentionId, node.__mentionName, node.__key);
    }
    createDOM(config) {
        const element = super.createDOM(config);
        element.className = "mention";
        element.setAttribute("data-mention-type", this.__mentionType);
        element.setAttribute("data-mention-id", this.__mentionId);
        return element;
    }
    exportDOM() {
        const element = document.createElement("span");
        element.className = "mention";
        element.setAttribute("data-mention-type", this.__mentionType);
        element.setAttribute("data-mention-id", this.__mentionId);
        element.textContent = "@".concat(this.__mentionName);
        return {
            element
        };
    }
    static importDOM() {
        return {
            span: (domNode)=>{
                if (!domNode.classList.contains("mention")) {
                    return null;
                }
                return {
                    conversion: (element)=>{
                        var _element_textContent;
                        const mentionType = element.getAttribute("data-mention-type") || "user";
                        const mentionId = element.getAttribute("data-mention-id") || "";
                        const mentionName = ((_element_textContent = element.textContent) === null || _element_textContent === void 0 ? void 0 : _element_textContent.replace("@", "")) || "";
                        return {
                            node: $createMentionNode(mentionType, mentionId, mentionName)
                        };
                    },
                    priority: 1
                };
            }
        };
    }
    static importJSON(serializedNode) {
        return $createMentionNode(serializedNode.mentionType, serializedNode.mentionId, serializedNode.mentionName);
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            type: "mention",
            mentionType: this.__mentionType,
            mentionId: this.__mentionId,
            mentionName: this.__mentionName
        };
    }
    getMentionType() {
        return this.__mentionType;
    }
    getMentionId() {
        return this.__mentionId;
    }
    getMentionName() {
        return this.__mentionName;
    }
    canInsertTextBefore() {
        return false;
    }
    canInsertTextAfter() {
        return false;
    }
    isTextEntity() {
        return true;
    }
    constructor(mentionType, mentionId, mentionName, key){
        super("@".concat(mentionName), key), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__mentionType", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__mentionId", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__mentionName", void 0);
        this.__mentionType = mentionType;
        this.__mentionId = mentionId;
        this.__mentionName = mentionName;
    }
}
function $createMentionNode(mentionType, mentionId, mentionName) {
    return new MentionNode(mentionType, mentionId, mentionName).setMode("token");
}
function $isMentionNode(node) {
    return node instanceof MentionNode;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/nodes/ImageNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$createImageNode",
    ()=>$createImageNode,
    "$isImageNode",
    ()=>$isImageNode,
    "ImageNode",
    ()=>ImageNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
;
;
;
function ImageComponent(param) {
    let { src, altText, width, height } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "my-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: src,
            alt: altText,
            width: width,
            height: height,
            className: "max-w-full rounded-lg",
            loading: "lazy"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/nodes/ImageNode.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/editor/nodes/ImageNode.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = ImageComponent;
class ImageNode extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecoratorNode"] {
    static getType() {
        return "image";
    }
    static clone(node) {
        return new ImageNode(node.__src, node.__altText, node.__width, node.__height, node.__caption, node.__key);
    }
    createDOM(_config) {
        const div = document.createElement("div");
        div.className = "editor-image";
        return div;
    }
    updateDOM() {
        return false;
    }
    exportDOM() {
        const element = document.createElement("img");
        element.setAttribute("src", this.__src);
        element.setAttribute("alt", this.__altText);
        if (this.__width) {
            element.setAttribute("width", this.__width.toString());
        }
        if (this.__height) {
            element.setAttribute("height", this.__height.toString());
        }
        return {
            element
        };
    }
    static importDOM() {
        return {
            img: ()=>({
                    conversion: (domNode)=>{
                        const img = domNode;
                        const node = $createImageNode({
                            src: img.src,
                            altText: img.alt,
                            width: img.width || undefined,
                            height: img.height || undefined
                        });
                        return {
                            node
                        };
                    },
                    priority: 0
                })
        };
    }
    static importJSON(serializedNode) {
        return $createImageNode({
            src: serializedNode.src,
            altText: serializedNode.altText,
            width: serializedNode.width,
            height: serializedNode.height,
            caption: serializedNode.caption
        });
    }
    exportJSON() {
        return {
            type: "image",
            version: 1,
            src: this.__src,
            altText: this.__altText,
            width: this.__width,
            height: this.__height,
            caption: this.__caption
        };
    }
    getSrc() {
        return this.__src;
    }
    getAltText() {
        return this.__altText;
    }
    decorate() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
            fallback: null,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ImageComponent, {
                src: this.__src,
                altText: this.__altText,
                width: this.__width,
                height: this.__height
            }, void 0, false, {
                fileName: "[project]/src/components/editor/nodes/ImageNode.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/editor/nodes/ImageNode.tsx",
            lineNumber: 161,
            columnNumber: 7
        }, this);
    }
    isInline() {
        return false;
    }
    isKeyboardSelectable() {
        return true;
    }
    constructor(src, altText, width, height, caption, key){
        super(key), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__src", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__altText", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__width", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__height", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__caption", void 0);
        this.__src = src;
        this.__altText = altText;
        this.__width = width;
        this.__height = height;
        this.__caption = caption;
    }
}
function $createImageNode(param) {
    let { src, altText, width, height, caption } = param;
    return new ImageNode(src, altText, width, height, caption);
}
function $isImageNode(node) {
    return node instanceof ImageNode;
}
var _c;
__turbopack_context__.k.register(_c, "ImageComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/lightbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Lightbox",
    ()=>Lightbox,
    "useLightbox",
    ()=>useLightbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
// Extract R2 key from URL - handles both signed and unsigned URLs
function extractR2Key(url) {
    // Remove query parameters first (signed URLs have ?X-Amz... parameters)
    const urlWithoutParams = url.split('?')[0];
    // Match the uploads path pattern
    const match = urlWithoutParams === null || urlWithoutParams === void 0 ? void 0 : urlWithoutParams.match(/uploads\/[^\/]+\/[^\/]+$/);
    return match ? match[0] : null;
}
// Check if URL is already a signed URL (has query parameters typical of signed URLs)
function isSignedUrl(url) {
    return url.includes('X-Amz-') || url.includes('x-amz-');
}
function SignedLightboxImage(param) {
    let { url, filename } = param;
    _s();
    // If the URL is already signed, use it directly
    const alreadySigned = isSignedUrl(url);
    const r2Key = !alreadySigned ? extractR2Key(url) : null;
    const { data: signedUrlData, isLoading } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload.getDownloadUrl.useQuery({
        key: r2Key
    }, {
        enabled: !!r2Key && !alreadySigned,
        staleTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false
    });
    // Use already signed URL directly, or wait for the signed URL query
    const displayUrl = alreadySigned ? url : (signedUrlData === null || signedUrlData === void 0 ? void 0 : signedUrlData.url) || url;
    if (!alreadySigned && isLoading && r2Key) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full w-full items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "h-12 w-12 animate-spin text-white/50"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/lightbox.tsx",
                lineNumber: 57,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/lightbox.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        src: displayUrl,
        alt: filename,
        className: "max-h-[90vh] max-w-[90vw] object-contain"
    }, void 0, false, {
        fileName: "[project]/src/components/ui/lightbox.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(SignedLightboxImage, "E04PQ9FoI++sTuENZCanyh42/OA=");
_c = SignedLightboxImage;
function Lightbox(param) {
    let { images, initialIndex = 0, isOpen, onClose } = param;
    _s1();
    const [currentIndex, setCurrentIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialIndex);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Lightbox.useEffect": ()=>{
            setMounted(true);
        }
    }["Lightbox.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Lightbox.useEffect": ()=>{
            setCurrentIndex(initialIndex);
        }
    }["Lightbox.useEffect"], [
        initialIndex,
        isOpen
    ]);
    const handlePrevious = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Lightbox.useCallback[handlePrevious]": ()=>{
            setCurrentIndex({
                "Lightbox.useCallback[handlePrevious]": (prev)=>prev > 0 ? prev - 1 : images.length - 1
            }["Lightbox.useCallback[handlePrevious]"]);
        }
    }["Lightbox.useCallback[handlePrevious]"], [
        images.length
    ]);
    const handleNext = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Lightbox.useCallback[handleNext]": ()=>{
            setCurrentIndex({
                "Lightbox.useCallback[handleNext]": (prev)=>prev < images.length - 1 ? prev + 1 : 0
            }["Lightbox.useCallback[handleNext]"]);
        }
    }["Lightbox.useCallback[handleNext]"], [
        images.length
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Lightbox.useEffect": ()=>{
            if (!isOpen) return;
            const handleKeyDown = {
                "Lightbox.useEffect.handleKeyDown": (e)=>{
                    if (e.key === "Escape") {
                        onClose();
                    } else if (e.key === "ArrowLeft") {
                        handlePrevious();
                    } else if (e.key === "ArrowRight") {
                        handleNext();
                    }
                }
            }["Lightbox.useEffect.handleKeyDown"];
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
            return ({
                "Lightbox.useEffect": ()=>{
                    document.removeEventListener("keydown", handleKeyDown);
                    document.body.style.overflow = "";
                }
            })["Lightbox.useEffect"];
        }
    }["Lightbox.useEffect"], [
        isOpen,
        onClose,
        handlePrevious,
        handleNext
    ]);
    if (!isOpen || !mounted || images.length === 0) return null;
    const currentImage = images[currentIndex];
    if (!currentImage) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-100 flex items-center justify-center bg-black/90",
        onClick: onClose,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "ghost",
                size: "icon",
                className: "absolute right-4 top-4 z-10 text-white hover:bg-white/20",
                onClick: onClose,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        className: "h-6 w-6"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/lightbox.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "sr-only",
                        children: "Close"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/lightbox.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/lightbox.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "absolute left-4 top-1/2 z-10 -translate-y-1/2 text-white hover:bg-white/20",
                        onClick: (e)=>{
                            e.stopPropagation();
                            handlePrevious();
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                className: "h-8 w-8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/lightbox.tsx",
                                lineNumber: 146,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Previous"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/lightbox.tsx",
                                lineNumber: 147,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/lightbox.tsx",
                        lineNumber: 137,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "icon",
                        className: "absolute right-4 top-1/2 z-10 -translate-y-1/2 text-white hover:bg-white/20",
                        onClick: (e)=>{
                            e.stopPropagation();
                            handleNext();
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "h-8 w-8"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/lightbox.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Next"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/lightbox.tsx",
                                lineNumber: 159,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/lightbox.tsx",
                        lineNumber: 149,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-center",
                onClick: (e)=>e.stopPropagation(),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SignedLightboxImage, {
                    url: currentImage.url,
                    filename: currentImage.filename
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/lightbox.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/lightbox.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white",
                children: [
                    currentIndex + 1,
                    " / ",
                    images.length
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/lightbox.tsx",
                lineNumber: 174,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-4 right-4 max-w-[200px] truncate rounded bg-black/50 px-3 py-1 text-sm text-white",
                children: currentImage.filename
            }, void 0, false, {
                fileName: "[project]/src/components/ui/lightbox.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/lightbox.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this), document.body);
}
_s1(Lightbox, "IQ1ATVWLyRaEm/iYmHvd7jH6uMc=");
_c1 = Lightbox;
function useLightbox() {
    _s2();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [initialIndex, setInitialIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const openLightbox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLightbox.useCallback[openLightbox]": function(imgs) {
            let index = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
            setImages(imgs);
            setInitialIndex(index);
            setIsOpen(true);
        }
    }["useLightbox.useCallback[openLightbox]"], []);
    const closeLightbox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useLightbox.useCallback[closeLightbox]": ()=>{
            setIsOpen(false);
        }
    }["useLightbox.useCallback[closeLightbox]"], []);
    return {
        isOpen,
        images,
        initialIndex,
        openLightbox,
        closeLightbox
    };
}
_s2(useLightbox, "qmZmZ+0+HidGUdnnfhEkfIFQXTA=");
var _c, _c1;
__turbopack_context__.k.register(_c, "SignedLightboxImage");
__turbopack_context__.k.register(_c1, "Lightbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/nodes/AttachmentNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "$createAttachmentNode",
    ()=>$createAttachmentNode,
    "$isAttachmentNode",
    ()=>$isAttachmentNode,
    "AttachmentNode",
    ()=>AttachmentNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file.js [app-client] (ecmascript) <export default as FileIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$lightbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/lightbox.tsx [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function formatFileSize(bytes) {
    if (bytes < 1024) return "".concat(bytes, " B");
    if (bytes < 1024 * 1024) return "".concat((bytes / 1024).toFixed(1), " KB");
    return "".concat((bytes / (1024 * 1024)).toFixed(1), " MB");
}
// Extract R2 key from URL if it's an R2 URL
function extractR2Key(url) {
    // Match patterns like:
    // https://bucket.accountid.r2.cloudflarestorage.com/uploads/userid/timestamp-filename
    // https://custom-domain.com/uploads/userid/timestamp-filename
    const match = url.match(/uploads\/[^\/]+\/[^\/]+$/);
    if (match) {
        return match[0];
    }
    return null;
}
function AttachmentComponent(param) {
    let { attachmentType, url, filename, mimeType, size, thumbnailUrl, width, height } = param;
    _s();
    const [displayUrl, setDisplayUrl] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const r2Key = extractR2Key(url);
    const { data: signedUrlData, isLoading: isLoadingUrl, error: urlError } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload.getDownloadUrl.useQuery({
        key: r2Key
    }, {
        enabled: !!r2Key && (attachmentType === "IMAGE" || attachmentType === "VIDEO"),
        staleTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AttachmentComponent.useEffect": ()=>{
            if (attachmentType !== "IMAGE" && attachmentType !== "VIDEO") {
                // For non-media types, use original URL
                setDisplayUrl(url);
                setIsLoading(false);
                return;
            }
            if (!r2Key) {
                // If we can't extract a key, try using the URL directly
                setDisplayUrl(url);
                setIsLoading(false);
                return;
            }
            if (signedUrlData) {
                setDisplayUrl(signedUrlData.url);
                setIsLoading(false);
            } else if (urlError) {
                // If signed URL fails, try original URL
                setDisplayUrl(url);
                setIsLoading(false);
                setError("Could not load signed URL, trying direct URL");
            } else if (isLoadingUrl) {
                setIsLoading(true);
            }
        }
    }["AttachmentComponent.useEffect"], [
        attachmentType,
        url,
        r2Key,
        signedUrlData,
        urlError,
        isLoadingUrl
    ]);
    const [lightboxOpen, setLightboxOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    if (attachmentType === "IMAGE") {
        if (isLoading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-4 flex h-48 items-center justify-center rounded-lg bg-muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-6 w-6 animate-spin text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 120,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                lineNumber: 119,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "my-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setLightboxOpen(true),
                        className: "block cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: displayUrl || url,
                            alt: filename,
                            width: width,
                            height: height,
                            className: "max-w-full rounded-lg",
                            loading: "lazy",
                            onError: (e)=>{
                                // If image fails to load, show error state
                                const target = e.target;
                                target.style.display = 'none';
                                console.error("Image failed to load:", displayUrl || url);
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                            lineNumber: 133,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                        lineNumber: 128,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 127,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$lightbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Lightbox"], {
                    images: [
                        {
                            id: "single",
                            url: displayUrl || url,
                            filename
                        }
                    ],
                    initialIndex: 0,
                    isOpen: lightboxOpen,
                    onClose: ()=>setLightboxOpen(false)
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true);
    }
    if (attachmentType === "VIDEO") {
        if (isLoading) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-4 flex h-48 items-center justify-center rounded-lg bg-muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-6 w-6 animate-spin text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 163,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                lineNumber: 162,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "my-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                src: displayUrl || url,
                poster: thumbnailUrl,
                controls: true,
                className: "max-w-full rounded-lg",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("track", {
                    kind: "captions"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 176,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                lineNumber: 170,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
            lineNumber: 169,
            columnNumber: 7
        }, this);
    }
    if (attachmentType === "FIGMA") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "my-4 flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-10 w-10 items-center justify-center rounded-lg bg-[#1e1e1e]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                        viewBox: "0 0 38 57",
                        className: "h-6 w-6",
                        fill: "none",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z",
                                fill: "#1ABCFE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                                lineNumber: 192,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z",
                                fill: "#0ACF83"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z",
                                fill: "#FF7262"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z",
                                fill: "#F24E1E"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                                lineNumber: 204,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                d: "M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z",
                                fill: "#A259FF"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                                lineNumber: 208,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 190,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "truncate font-medium",
                            children: filename
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: "Figma Design"
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 214,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                    className: "h-4 w-4 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
            lineNumber: 184,
            columnNumber: 7
        }, this);
    }
    if (attachmentType === "LOOM") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            href: url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "my-4 flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-10 w-10 items-center justify-center rounded-lg bg-[#625df5]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                        className: "h-5 w-5 fill-white text-white"
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "truncate font-medium",
                            children: filename
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                            lineNumber: 235,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-muted-foreground",
                            children: "Loom Recording"
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 234,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                    className: "h-4 w-4 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 238,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
            lineNumber: 225,
            columnNumber: 7
        }, this);
    }
    // Generic file attachment - use signed URL for download
    const downloadKey = extractR2Key(url);
    const { data: downloadUrlData } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload.getDownloadUrl.useQuery({
        key: downloadKey
    }, {
        enabled: !!downloadKey,
        staleTime: 30 * 60 * 1000,
        refetchOnWindowFocus: false
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: (downloadUrlData === null || downloadUrlData === void 0 ? void 0 : downloadUrlData.url) || url,
        download: filename,
        className: "my-4 flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-10 w-10 items-center justify-center rounded-lg bg-muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileIcon$3e$__["FileIcon"], {
                    className: "h-5 w-5 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                    lineNumber: 261,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                lineNumber: 260,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate font-medium",
                        children: filename
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                        lineNumber: 264,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-muted-foreground",
                        children: [
                            mimeType,
                            " · ",
                            formatFileSize(size)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                lineNumber: 263,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                className: "h-4 w-4 text-muted-foreground"
            }, void 0, false, {
                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
        lineNumber: 255,
        columnNumber: 5
    }, this);
}
_s(AttachmentComponent, "1zq7szuoYCJrwo84c7OkOpxglKs=");
_c = AttachmentComponent;
class AttachmentNode extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DecoratorNode"] {
    static getType() {
        return "attachment";
    }
    static clone(node) {
        return new AttachmentNode(node.__attachmentType, node.__url, node.__filename, node.__mimeType, node.__size, node.__thumbnailUrl, node.__width, node.__height, node.__metadata, node.__key);
    }
    createDOM(_config) {
        const div = document.createElement("div");
        div.className = "editor-attachment";
        return div;
    }
    updateDOM() {
        return false;
    }
    exportDOM() {
        const element = document.createElement("div");
        element.setAttribute("data-attachment-type", this.__attachmentType);
        element.setAttribute("data-url", this.__url);
        element.setAttribute("data-filename", this.__filename);
        return {
            element
        };
    }
    static importJSON(serializedNode) {
        return $createAttachmentNode({
            attachmentType: serializedNode.attachmentType,
            url: serializedNode.url,
            filename: serializedNode.filename,
            mimeType: serializedNode.mimeType,
            size: serializedNode.size,
            thumbnailUrl: serializedNode.thumbnailUrl,
            width: serializedNode.width,
            height: serializedNode.height,
            metadata: serializedNode.metadata
        });
    }
    exportJSON() {
        return {
            type: "attachment",
            version: 1,
            attachmentType: this.__attachmentType,
            url: this.__url,
            filename: this.__filename,
            mimeType: this.__mimeType,
            size: this.__size,
            thumbnailUrl: this.__thumbnailUrl,
            width: this.__width,
            height: this.__height,
            metadata: this.__metadata
        };
    }
    getUrl() {
        return this.__url;
    }
    getFilename() {
        return this.__filename;
    }
    decorate() {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-4 h-48 animate-pulse rounded-lg bg-muted"
            }, void 0, false, {
                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                lineNumber: 386,
                columnNumber: 27
            }, void 0),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AttachmentComponent, {
                attachmentType: this.__attachmentType,
                url: this.__url,
                filename: this.__filename,
                mimeType: this.__mimeType,
                size: this.__size,
                thumbnailUrl: this.__thumbnailUrl,
                width: this.__width,
                height: this.__height
            }, void 0, false, {
                fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
                lineNumber: 387,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/editor/nodes/AttachmentNode.tsx",
            lineNumber: 386,
            columnNumber: 7
        }, this);
    }
    isInline() {
        return false;
    }
    isKeyboardSelectable() {
        return true;
    }
    constructor(attachmentType, url, filename, mimeType, size, thumbnailUrl, width, height, metadata, key){
        super(key), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__attachmentType", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__url", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__filename", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__mimeType", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__size", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__thumbnailUrl", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__width", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__height", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "__metadata", void 0);
        this.__attachmentType = attachmentType;
        this.__url = url;
        this.__filename = filename;
        this.__mimeType = mimeType;
        this.__size = size;
        this.__thumbnailUrl = thumbnailUrl;
        this.__width = width;
        this.__height = height;
        this.__metadata = metadata;
    }
}
function $createAttachmentNode(param) {
    let { attachmentType, url, filename, mimeType, size, thumbnailUrl, width, height, metadata } = param;
    return new AttachmentNode(attachmentType, url, filename, mimeType, size, thumbnailUrl, width, height, metadata);
}
function $isAttachmentNode(node) {
    return node instanceof AttachmentNode;
}
var _c;
__turbopack_context__.k.register(_c, "AttachmentComponent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/plugins/MentionPlugin.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MentionPlugin",
    ()=>MentionPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalComposerContext.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalTypeaheadMenuPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalTypeaheadMenuPlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$MentionNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/nodes/MentionNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$kanban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderKanban$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-kanban.js [app-client] (ecmascript) <export default as FolderKanban>");
;
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
class MentionOption extends __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalTypeaheadMenuPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MenuOption"] {
    constructor(id, name, type, avatarUrl){
        super(name), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "id", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "name", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "type", void 0), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "avatarUrl", void 0);
        this.id = id;
        this.name = name;
        this.type = type;
        this.avatarUrl = avatarUrl;
    }
}
function MentionMenuItem(param) {
    let { isSelected, onClick, onMouseEnter, option } = param;
    var _option_avatarUrl;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        role: "option",
        "aria-selected": isSelected,
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        className: "flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm ".concat(isSelected ? "bg-accent text-accent-foreground" : ""),
        children: [
            option.type === "user" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                className: "h-6 w-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                        src: (_option_avatarUrl = option.avatarUrl) !== null && _option_avatarUrl !== void 0 ? _option_avatarUrl : undefined
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                        className: "text-xs",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(option.name)
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                lineNumber: 60,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-6 w-6 items-center justify-center rounded-md bg-muted",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$kanban$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderKanban$3e$__["FolderKanban"], {
                    className: "h-3.5 w-3.5"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                lineNumber: 67,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: option.name
            }, void 0, false, {
                fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-auto text-xs text-muted-foreground",
                children: option.type === "user" ? "User" : "Project"
            }, void 0, false, {
                fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_c = MentionMenuItem;
function MentionPlugin() {
    _s();
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    const [queryString, setQueryString] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const { data: users } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].user.search.useQuery({
        query: queryString !== null && queryString !== void 0 ? queryString : ""
    }, {
        enabled: !!queryString && queryString.length > 0
    });
    const { data: projects } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].project.search.useQuery({
        query: queryString !== null && queryString !== void 0 ? queryString : ""
    }, {
        enabled: !!queryString && queryString.length > 0
    });
    const checkForTriggerMatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalTypeaheadMenuPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBasicTypeaheadTriggerMatch"])("@", {
        minLength: 0
    });
    const options = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MentionPlugin.useMemo[options]": ()=>{
            const results = [];
            if (users) {
                results.push(...users.map({
                    "MentionPlugin.useMemo[options]": (user)=>new MentionOption(user.id, user.displayName, "user", user.avatarUrl)
                }["MentionPlugin.useMemo[options]"]));
            }
            if (projects) {
                results.push(...projects.map({
                    "MentionPlugin.useMemo[options]": (project)=>new MentionOption(project.id, project.name, "project", project.coverUrl)
                }["MentionPlugin.useMemo[options]"]));
            }
            return results.slice(0, 10);
        }
    }["MentionPlugin.useMemo[options]"], [
        users,
        projects
    ]);
    const onSelectOption = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MentionPlugin.useCallback[onSelectOption]": (selectedOption, nodeToReplace, closeMenu)=>{
            editor.update({
                "MentionPlugin.useCallback[onSelectOption]": ()=>{
                    const mentionNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$MentionNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createMentionNode"])(selectedOption.type, selectedOption.id, selectedOption.name);
                    if (nodeToReplace) {
                        nodeToReplace.replace(mentionNode);
                    }
                    mentionNode.select();
                    closeMenu();
                }
            }["MentionPlugin.useCallback[onSelectOption]"]);
        }
    }["MentionPlugin.useCallback[onSelectOption]"], [
        editor
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalTypeaheadMenuPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LexicalTypeaheadMenuPlugin"], {
        onQueryChange: setQueryString,
        onSelectOption: onSelectOption,
        triggerFn: checkForTriggerMatch,
        options: options,
        menuRenderFn: (anchorElementRef, param)=>{
            let { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex } = param;
            return anchorElementRef.current && options.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "z-50 min-w-[200px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    role: "listbox",
                    children: options.map((option, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MentionMenuItem, {
                            isSelected: selectedIndex === i,
                            onClick: ()=>{
                                setHighlightedIndex(i);
                                selectOptionAndCleanUp(option);
                            },
                            onMouseEnter: ()=>{
                                setHighlightedIndex(i);
                            },
                            option: option
                        }, option.id, false, {
                            fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                            lineNumber: 158,
                            columnNumber: 21
                        }, void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                    lineNumber: 156,
                    columnNumber: 17
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
                lineNumber: 155,
                columnNumber: 15
            }, void 0), anchorElementRef.current) : null;
        }
    }, void 0, false, {
        fileName: "[project]/src/components/editor/plugins/MentionPlugin.tsx",
        lineNumber: 144,
        columnNumber: 5
    }, this);
}
_s(MentionPlugin, "mY6dUAEdQTA8elzgkC9MHY6TW9o=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalTypeaheadMenuPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useBasicTypeaheadTriggerMatch"]
    ];
});
_c1 = MentionPlugin;
var _c, _c1;
__turbopack_context__.k.register(_c, "MentionMenuItem");
__turbopack_context__.k.register(_c1, "MentionPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/plugins/SlashCommandPlugin.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SlashCommandPlugin",
    ()=>SlashCommandPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalComposerContext.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@lexical/selection/LexicalSelection.dev.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/rich-text/LexicalRichText.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/list/LexicalList.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$utils$2f$LexicalUtils$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@lexical/utils/LexicalUtils.dev.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading1$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heading-1.js [app-client] (ecmascript) <export default as Heading1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heading-2.js [app-client] (ecmascript) <export default as Heading2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heading-3.js [app-client] (ecmascript) <export default as Heading3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-ordered.js [app-client] (ecmascript) <export default as ListOrdered>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/quote.js [app-client] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript) <export default as ImagePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-up.js [app-client] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/nodes/AttachmentNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
const COMMANDS = [
    {
        name: "Heading 1",
        command: "heading1",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading1$3e$__["Heading1"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
            lineNumber: 46,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        description: "Large section heading"
    },
    {
        name: "Heading 2",
        command: "heading2",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading2$3e$__["Heading2"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
            lineNumber: 52,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        description: "Medium section heading"
    },
    {
        name: "Heading 3",
        command: "heading3",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading3$3e$__["Heading3"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
            lineNumber: 58,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        description: "Small section heading"
    },
    {
        name: "Bullet List",
        command: "bulletList",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
            lineNumber: 64,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        description: "Create a bullet list"
    },
    {
        name: "Numbered List",
        command: "numberedList",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__["ListOrdered"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
            lineNumber: 70,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        description: "Create a numbered list"
    },
    {
        name: "Quote",
        command: "quote",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
            lineNumber: 76,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        description: "Add a block quote"
    },
    {
        name: "Image",
        command: "image",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
            lineNumber: 82,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        description: "Upload an image"
    },
    {
        name: "File",
        command: "file",
        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
            className: "h-4 w-4"
        }, void 0, false, {
            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
            lineNumber: 88,
            columnNumber: 11
        }, ("TURBOPACK compile-time value", void 0)),
        description: "Upload any file"
    }
];
function SlashCommandPlugin(param) {
    let { anchorElem } = param;
    _s();
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        top: 0,
        left: 0
    });
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const uploadMutation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload.getUploadUrl.useMutation();
    const pendingCommandRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const filteredCommands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SlashCommandPlugin.useMemo[filteredCommands]": ()=>{
            if (!query) return COMMANDS;
            const lowerQuery = query.toLowerCase();
            return COMMANDS.filter({
                "SlashCommandPlugin.useMemo[filteredCommands]": (cmd)=>cmd.name.toLowerCase().includes(lowerQuery) || cmd.description.toLowerCase().includes(lowerQuery) || cmd.command.toLowerCase().includes(lowerQuery)
            }["SlashCommandPlugin.useMemo[filteredCommands]"]);
        }
    }["SlashCommandPlugin.useMemo[filteredCommands]"], [
        query
    ]);
    // Reset selected index when filtered commands change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SlashCommandPlugin.useEffect": ()=>{
            setSelectedIndex(0);
        }
    }["SlashCommandPlugin.useEffect"], [
        filteredCommands.length
    ]);
    const handleFileUpload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SlashCommandPlugin.useCallback[handleFileUpload]": async (file)=>{
            try {
                const result = await uploadMutation.mutateAsync({
                    filename: file.name,
                    contentType: file.type,
                    size: file.size
                });
                const uploadResponse = await fetch(result.uploadUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type
                    }
                });
                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error("R2 upload failed:", uploadResponse.status, errorText);
                    alert("Upload failed: ".concat(uploadResponse.status, " - ").concat(errorText || "Unknown error"));
                    return;
                }
                let attachmentType = "FILE";
                if (file.type.startsWith("image/")) {
                    attachmentType = "IMAGE";
                } else if (file.type.startsWith("video/")) {
                    attachmentType = "VIDEO";
                }
                editor.update({
                    "SlashCommandPlugin.useCallback[handleFileUpload]": ()=>{
                        const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) {
                            const attachmentNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createAttachmentNode"])({
                                attachmentType,
                                url: result.publicUrl,
                                filename: file.name,
                                mimeType: file.type,
                                size: file.size
                            });
                            selection.insertNodes([
                                attachmentNode,
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createParagraphNode"])()
                            ]);
                        }
                    }
                }["SlashCommandPlugin.useCallback[handleFileUpload]"]);
            } catch (error) {
                console.error("Upload failed:", error);
                alert("Upload failed: ".concat(error instanceof Error ? error.message : "Unknown error"));
            }
        }
    }["SlashCommandPlugin.useCallback[handleFileUpload]"], [
        editor,
        uploadMutation
    ]);
    const executeCommand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SlashCommandPlugin.useCallback[executeCommand]": (command)=>{
            editor.update({
                "SlashCommandPlugin.useCallback[executeCommand]": ()=>{
                    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) return;
                    // Remove the slash and query text
                    const anchor = selection.anchor;
                    const anchorNode = anchor.getNode();
                    if (anchorNode instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextNode"]) {
                        const textContent = anchorNode.getTextContent();
                        const slashIndex = textContent.lastIndexOf("/");
                        if (slashIndex !== -1) {
                            const newText = textContent.slice(0, slashIndex);
                            if (newText) {
                                anchorNode.setTextContent(newText);
                                selection.setTextNodeRange(anchorNode, newText.length, anchorNode, newText.length);
                            } else {
                                anchorNode.remove();
                            }
                        }
                    }
                    switch(command){
                        case "heading1":
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["$setBlocksType"])(selection, {
                                "SlashCommandPlugin.useCallback[executeCommand]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createHeadingNode"])("h1")
                            }["SlashCommandPlugin.useCallback[executeCommand]"]);
                            break;
                        case "heading2":
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["$setBlocksType"])(selection, {
                                "SlashCommandPlugin.useCallback[executeCommand]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createHeadingNode"])("h2")
                            }["SlashCommandPlugin.useCallback[executeCommand]"]);
                            break;
                        case "heading3":
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["$setBlocksType"])(selection, {
                                "SlashCommandPlugin.useCallback[executeCommand]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createHeadingNode"])("h3")
                            }["SlashCommandPlugin.useCallback[executeCommand]"]);
                            break;
                        case "bulletList":
                            editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSERT_UNORDERED_LIST_COMMAND"], undefined);
                            break;
                        case "numberedList":
                            editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSERT_ORDERED_LIST_COMMAND"], undefined);
                            break;
                        case "quote":
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["$setBlocksType"])(selection, {
                                "SlashCommandPlugin.useCallback[executeCommand]": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createQuoteNode"])()
                            }["SlashCommandPlugin.useCallback[executeCommand]"]);
                            break;
                        case "image":
                        case "file":
                            pendingCommandRef.current = command;
                            setTimeout({
                                "SlashCommandPlugin.useCallback[executeCommand]": ()=>{
                                    if (fileInputRef.current) {
                                        fileInputRef.current.accept = command === "image" ? "image/*,video/*" : "*/*";
                                        fileInputRef.current.click();
                                    }
                                }
                            }["SlashCommandPlugin.useCallback[executeCommand]"], 0);
                            break;
                    }
                }
            }["SlashCommandPlugin.useCallback[executeCommand]"]);
            setIsOpen(false);
            setQuery("");
        }
    }["SlashCommandPlugin.useCallback[executeCommand]"], [
        editor
    ]);
    // Listen for text changes to detect slash commands
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SlashCommandPlugin.useEffect": ()=>{
            return editor.registerTextContentListener({
                "SlashCommandPlugin.useEffect": (text)=>{
                    editor.getEditorState().read({
                        "SlashCommandPlugin.useEffect": ()=>{
                            const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) {
                                setIsOpen(false);
                                return;
                            }
                            const anchor = selection.anchor;
                            const anchorNode = anchor.getNode();
                            if (!(anchorNode instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextNode"])) {
                                setIsOpen(false);
                                return;
                            }
                            const textContent = anchorNode.getTextContent();
                            const anchorOffset = anchor.offset;
                            const textBeforeCursor = textContent.slice(0, anchorOffset);
                            // Find the last slash in the text before cursor
                            const slashIndex = textBeforeCursor.lastIndexOf("/");
                            if (slashIndex === -1) {
                                setIsOpen(false);
                                return;
                            }
                            // Check if slash is at start of line or preceded by whitespace
                            const charBeforeSlash = textBeforeCursor[slashIndex - 1];
                            if (slashIndex > 0 && charBeforeSlash !== " " && charBeforeSlash !== "\n") {
                                setIsOpen(false);
                                return;
                            }
                            // Extract query after slash
                            const queryText = textBeforeCursor.slice(slashIndex + 1);
                            // Don't show menu if there's a space in the query (command ended)
                            if (queryText.includes(" ")) {
                                setIsOpen(false);
                                return;
                            }
                            setQuery(queryText);
                            setIsOpen(true);
                            // Get position for menu
                            const domSelection = window.getSelection();
                            if (domSelection && domSelection.rangeCount > 0) {
                                const range = domSelection.getRangeAt(0);
                                const rect = range.getBoundingClientRect();
                                const editorRect = anchorElem.getBoundingClientRect();
                                setPosition({
                                    top: rect.bottom - editorRect.top + 4,
                                    left: rect.left - editorRect.left
                                });
                            }
                        }
                    }["SlashCommandPlugin.useEffect"]);
                }
            }["SlashCommandPlugin.useEffect"]);
        }
    }["SlashCommandPlugin.useEffect"], [
        editor,
        anchorElem
    ]);
    // Handle keyboard navigation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SlashCommandPlugin.useEffect": ()=>{
            if (!isOpen) return;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$utils$2f$LexicalUtils$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mergeRegister"])(editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEY_ARROW_DOWN_COMMAND"], {
                "SlashCommandPlugin.useEffect": (event)=>{
                    event.preventDefault();
                    setSelectedIndex({
                        "SlashCommandPlugin.useEffect": (prev)=>prev < filteredCommands.length - 1 ? prev + 1 : 0
                    }["SlashCommandPlugin.useEffect"]);
                    return true;
                }
            }["SlashCommandPlugin.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_LOW"]), editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEY_ARROW_UP_COMMAND"], {
                "SlashCommandPlugin.useEffect": (event)=>{
                    event.preventDefault();
                    setSelectedIndex({
                        "SlashCommandPlugin.useEffect": (prev)=>prev > 0 ? prev - 1 : filteredCommands.length - 1
                    }["SlashCommandPlugin.useEffect"]);
                    return true;
                }
            }["SlashCommandPlugin.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_LOW"]), editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEY_ENTER_COMMAND"], {
                "SlashCommandPlugin.useEffect": (event)=>{
                    if (filteredCommands[selectedIndex]) {
                        event === null || event === void 0 ? void 0 : event.preventDefault();
                        executeCommand(filteredCommands[selectedIndex].command);
                        return true;
                    }
                    return false;
                }
            }["SlashCommandPlugin.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_LOW"]), editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEY_TAB_COMMAND"], {
                "SlashCommandPlugin.useEffect": (event)=>{
                    if (filteredCommands[selectedIndex]) {
                        event.preventDefault();
                        executeCommand(filteredCommands[selectedIndex].command);
                        return true;
                    }
                    return false;
                }
            }["SlashCommandPlugin.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_LOW"]), editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEY_ESCAPE_COMMAND"], {
                "SlashCommandPlugin.useEffect": ()=>{
                    setIsOpen(false);
                    setQuery("");
                    return true;
                }
            }["SlashCommandPlugin.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_LOW"]));
        }
    }["SlashCommandPlugin.useEffect"], [
        editor,
        isOpen,
        filteredCommands,
        selectedIndex,
        executeCommand
    ]);
    // Click outside to close
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SlashCommandPlugin.useEffect": ()=>{
            if (!isOpen) return;
            const handleClickOutside = {
                "SlashCommandPlugin.useEffect.handleClickOutside": (event)=>{
                    if (menuRef.current && !menuRef.current.contains(event.target)) {
                        setIsOpen(false);
                        setQuery("");
                    }
                }
            }["SlashCommandPlugin.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "SlashCommandPlugin.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["SlashCommandPlugin.useEffect"];
        }
    }["SlashCommandPlugin.useEffect"], [
        isOpen
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                className: "hidden",
                onChange: (e)=>{
                    var _e_target_files;
                    const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
                    if (file) {
                        handleFileUpload(file);
                    }
                    e.target.value = "";
                    pendingCommandRef.current = null;
                }
            }, void 0, false, {
                fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
                lineNumber: 382,
                columnNumber: 7
            }, this),
            isOpen && filteredCommands.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: menuRef,
                className: "absolute z-50 min-w-[280px] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
                style: {
                    top: position.top,
                    left: position.left
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    role: "listbox",
                    children: filteredCommands.map((option, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            role: "option",
                            "aria-selected": selectedIndex === index,
                            onClick: ()=>executeCommand(option.command),
                            onMouseEnter: ()=>setSelectedIndex(index),
                            className: "flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm ".concat(selectedIndex === index ? "bg-accent text-accent-foreground" : ""),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex h-8 w-8 items-center justify-center rounded-md border bg-background",
                                    children: option.icon
                                }, void 0, false, {
                                    fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
                                    lineNumber: 413,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium",
                                            children: option.name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
                                            lineNumber: 417,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: option.description
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
                                            lineNumber: 418,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
                                    lineNumber: 416,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, option.command, true, {
                            fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
                            lineNumber: 403,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
                    lineNumber: 401,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/plugins/SlashCommandPlugin.tsx",
                lineNumber: 396,
                columnNumber: 9
            }, this), anchorElem)
        ]
    }, void 0, true);
}
_s(SlashCommandPlugin, "kifzEtr4NwviWfjC5AMxBtJMWMg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"]
    ];
});
_c = SlashCommandPlugin;
var _c;
__turbopack_context__.k.register(_c, "SlashCommandPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/plugins/DragDropPlugin.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DragDropPlugin",
    ()=>DragDropPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalComposerContext.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/nodes/AttachmentNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function DragDropPlugin() {
    _s();
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    const uploadMutation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload.getUploadUrl.useMutation();
    const handleDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DragDropPlugin.useCallback[handleDrop]": async (event)=>{
            var _event_dataTransfer;
            const files = (_event_dataTransfer = event.dataTransfer) === null || _event_dataTransfer === void 0 ? void 0 : _event_dataTransfer.files;
            if (!files || files.length === 0) return false;
            event.preventDefault();
            for (const file of Array.from(files)){
                try {
                    const result = await uploadMutation.mutateAsync({
                        filename: file.name,
                        contentType: file.type,
                        size: file.size
                    });
                    // Upload to R2
                    await fetch(result.uploadUrl, {
                        method: "PUT",
                        body: file,
                        headers: {
                            "Content-Type": file.type
                        }
                    });
                    // Determine attachment type
                    let attachmentType = "FILE";
                    if (file.type.startsWith("image/")) {
                        attachmentType = "IMAGE";
                    } else if (file.type.startsWith("video/")) {
                        attachmentType = "VIDEO";
                    }
                    // Insert attachment node
                    editor.update({
                        "DragDropPlugin.useCallback[handleDrop]": ()=>{
                            const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) {
                                const attachmentNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createAttachmentNode"])({
                                    attachmentType,
                                    url: result.publicUrl,
                                    filename: file.name,
                                    mimeType: file.type,
                                    size: file.size
                                });
                                selection.insertNodes([
                                    attachmentNode,
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createParagraphNode"])()
                                ]);
                            }
                        }
                    }["DragDropPlugin.useCallback[handleDrop]"]);
                } catch (error) {
                    console.error("Upload failed:", error);
                }
            }
            return true;
        }
    }["DragDropPlugin.useCallback[handleDrop]"], [
        editor,
        uploadMutation
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DragDropPlugin.useEffect": ()=>{
            return editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DRAGOVER_COMMAND"], {
                "DragDropPlugin.useEffect": (event)=>{
                    event.preventDefault();
                    return true;
                }
            }["DragDropPlugin.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_HIGH"]);
        }
    }["DragDropPlugin.useEffect"], [
        editor
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DragDropPlugin.useEffect": ()=>{
            return editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DROP_COMMAND"], {
                "DragDropPlugin.useEffect": (event)=>{
                    handleDrop(event);
                    return true;
                }
            }["DragDropPlugin.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_HIGH"]);
        }
    }["DragDropPlugin.useEffect"], [
        editor,
        handleDrop
    ]);
    return null;
}
_s(DragDropPlugin, "QZ1vmuu860G/qPdUM/nJD9axlyI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"]
    ];
});
_c = DragDropPlugin;
var _c;
__turbopack_context__.k.register(_c, "DragDropPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FloatingAddButtonPlugin",
    ()=>FloatingAddButtonPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalComposerContext.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript) <export default as ImagePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-up.js [app-client] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading1$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heading-1.js [app-client] (ecmascript) <export default as Heading1>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heading-2.js [app-client] (ecmascript) <export default as Heading2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list-ordered.js [app-client] (ecmascript) <export default as ListOrdered>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/quote.js [app-client] (ecmascript) <export default as Quote>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/nodes/AttachmentNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@lexical/selection/LexicalSelection.dev.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/rich-text/LexicalRichText.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/list/LexicalList.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
function FloatingAddButtonPlugin(param) {
    let { anchorElem } = param;
    _s();
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        top: 0
    });
    const [isEmpty, setIsEmpty] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const uploadMutation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload.getUploadUrl.useMutation();
    const updatePosition = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FloatingAddButtonPlugin.useCallback[updatePosition]": ()=>{
            editor.getEditorState().read({
                "FloatingAddButtonPlugin.useCallback[updatePosition]": ()=>{
                    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) {
                        setIsVisible(false);
                        return;
                    }
                    const anchor = selection.anchor;
                    const anchorNode = anchor.getNode();
                    const topLevelElement = anchorNode.getTopLevelElement();
                    if (!topLevelElement) {
                        setIsVisible(false);
                        return;
                    }
                    // Check if the current block is empty (only for paragraphs)
                    const isEmptyParagraph = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isParagraphNode"])(topLevelElement) && topLevelElement.getTextContent().trim() === "";
                    setIsEmpty(isEmptyParagraph);
                    const key = topLevelElement.getKey();
                    const elem = editor.getElementByKey(key);
                    if (!elem) {
                        setIsVisible(false);
                        return;
                    }
                    const editorRect = anchorElem.getBoundingClientRect();
                    const elemRect = elem.getBoundingClientRect();
                    setPosition({
                        top: elemRect.top - editorRect.top + 4
                    });
                    setIsVisible(true);
                }
            }["FloatingAddButtonPlugin.useCallback[updatePosition]"]);
        }
    }["FloatingAddButtonPlugin.useCallback[updatePosition]"], [
        editor,
        anchorElem
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FloatingAddButtonPlugin.useEffect": ()=>{
            return editor.registerUpdateListener({
                "FloatingAddButtonPlugin.useEffect": (param)=>{
                    let { editorState } = param;
                    editorState.read({
                        "FloatingAddButtonPlugin.useEffect": ()=>{
                            updatePosition();
                        }
                    }["FloatingAddButtonPlugin.useEffect"]);
                }
            }["FloatingAddButtonPlugin.useEffect"]);
        }
    }["FloatingAddButtonPlugin.useEffect"], [
        editor,
        updatePosition
    ]);
    // Close menu when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FloatingAddButtonPlugin.useEffect": ()=>{
            if (!isMenuOpen) return;
            const handleClickOutside = {
                "FloatingAddButtonPlugin.useEffect.handleClickOutside": (e)=>{
                    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
                        setIsMenuOpen(false);
                    }
                }
            }["FloatingAddButtonPlugin.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "FloatingAddButtonPlugin.useEffect": ()=>document.removeEventListener("mousedown", handleClickOutside)
            })["FloatingAddButtonPlugin.useEffect"];
        }
    }["FloatingAddButtonPlugin.useEffect"], [
        isMenuOpen
    ]);
    const handleFileUpload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FloatingAddButtonPlugin.useCallback[handleFileUpload]": async (file)=>{
            setIsMenuOpen(false);
            try {
                const result = await uploadMutation.mutateAsync({
                    filename: file.name,
                    contentType: file.type,
                    size: file.size
                });
                // Upload to R2
                const uploadResponse = await fetch(result.uploadUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type
                    }
                });
                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error("R2 upload failed:", uploadResponse.status, errorText);
                    alert("Upload failed: ".concat(uploadResponse.status, " - Check CORS configuration on R2 bucket"));
                    return;
                }
                // Determine attachment type
                let attachmentType = "FILE";
                if (file.type.startsWith("image/")) {
                    attachmentType = "IMAGE";
                } else if (file.type.startsWith("video/")) {
                    attachmentType = "VIDEO";
                }
                // Insert attachment node
                editor.update({
                    "FloatingAddButtonPlugin.useCallback[handleFileUpload]": ()=>{
                        const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) {
                            const attachmentNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createAttachmentNode"])({
                                attachmentType,
                                url: result.publicUrl,
                                filename: file.name,
                                mimeType: file.type,
                                size: file.size
                            });
                            selection.insertNodes([
                                attachmentNode,
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createParagraphNode"])()
                            ]);
                        }
                    }
                }["FloatingAddButtonPlugin.useCallback[handleFileUpload]"]);
            } catch (error) {
                console.error("Upload failed:", error);
                const message = error instanceof Error ? error.message : "Unknown error";
                alert("Upload failed: ".concat(message));
            }
        }
    }["FloatingAddButtonPlugin.useCallback[handleFileUpload]"], [
        editor,
        uploadMutation
    ]);
    const triggerFileInput = (accept)=>{
        if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
            fileInputRef.current.click();
        }
    };
    const insertBlock = (type)=>{
        setIsMenuOpen(false);
        editor.update(()=>{
            const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
            if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) return;
            switch(type){
                case "h1":
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["$setBlocksType"])(selection, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createHeadingNode"])("h1"));
                    break;
                case "h2":
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["$setBlocksType"])(selection, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createHeadingNode"])("h2"));
                    break;
                case "bulletList":
                    editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSERT_UNORDERED_LIST_COMMAND"], undefined);
                    break;
                case "numberedList":
                    editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INSERT_ORDERED_LIST_COMMAND"], undefined);
                    break;
                case "quote":
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$selection$2f$LexicalSelection$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["$setBlocksType"])(selection, ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createQuoteNode"])());
                    break;
            }
        });
    };
    if (!isVisible) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: buttonRef,
        className: "absolute -left-8 z-10 transition-opacity",
        style: {
            top: position.top
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                className: "hidden",
                onChange: (e)=>{
                    var _e_target_files;
                    const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
                    if (file) {
                        handleFileUpload(file);
                    }
                    e.target.value = "";
                }
            }, void 0, false, {
                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setIsMenuOpen(!isMenuOpen),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-6 w-6 items-center justify-center rounded-full border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground", isMenuOpen && "rotate-45 bg-muted text-foreground", !isEmpty && "opacity-0 hover:opacity-100"),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                    lineNumber: 231,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, this),
            isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-0 top-8 z-50 min-w-[200px] overflow-hidden rounded-lg border bg-popover p-1 shadow-lg animate-in fade-in-0 zoom-in-95",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "px-2 py-1 text-xs font-medium text-muted-foreground",
                        children: "Add blocks"
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 236,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>triggerFileInput("image/*"),
                        className: "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                    lineNumber: 244,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 243,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium",
                                        children: "Image"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                        lineNumber: 247,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Upload an image"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 239,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>triggerFileInput("*/*"),
                        className: "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                    lineNumber: 256,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 255,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-left",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium",
                                        children: "File"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                        lineNumber: 259,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-muted-foreground",
                                        children: "Upload any file"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                        lineNumber: 260,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 258,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "my-1 h-px bg-border"
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 263,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>insertBlock("h1"),
                        className: "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$1$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading1$3e$__["Heading1"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                    lineNumber: 269,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Heading 1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 271,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 264,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>insertBlock("h2"),
                        className: "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heading$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heading2$3e$__["Heading2"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                    lineNumber: 278,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Heading 2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 280,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>insertBlock("bulletList"),
                        className: "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                    lineNumber: 287,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Bullet List"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 289,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 282,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>insertBlock("numberedList"),
                        className: "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2d$ordered$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ListOrdered$3e$__["ListOrdered"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                    lineNumber: 296,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 295,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Numbered List"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 298,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 291,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>insertBlock("quote"),
                        className: "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-7 w-7 items-center justify-center rounded-md border bg-background",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$quote$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Quote$3e$__["Quote"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                    lineNumber: 305,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 304,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Quote"
                            }, void 0, false, {
                                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                                lineNumber: 307,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                        lineNumber: 300,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
                lineNumber: 235,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, this), anchorElem);
}
_s(FloatingAddButtonPlugin, "JngS61Opx5WRuldtlhkNTRpuD2E=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"]
    ];
});
_c = FloatingAddButtonPlugin;
var _c;
__turbopack_context__.k.register(_c, "FloatingAddButtonPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/plugins/NodeDeletionPlugin.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NodeDeletionPlugin",
    ()=>NodeDeletionPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalComposerContext.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function NodeDeletionPlugin() {
    _s();
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NodeDeletionPlugin.useEffect": ()=>{
            const removeBackspace = editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEY_BACKSPACE_COMMAND"], {
                "NodeDeletionPlugin.useEffect.removeBackspace": ()=>{
                    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isNodeSelection"])(selection)) {
                        const nodes = selection.getNodes();
                        nodes.forEach({
                            "NodeDeletionPlugin.useEffect.removeBackspace": (node)=>{
                                node.remove();
                            }
                        }["NodeDeletionPlugin.useEffect.removeBackspace"]);
                        return true;
                    }
                    return false;
                }
            }["NodeDeletionPlugin.useEffect.removeBackspace"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_LOW"]);
            const removeDelete = editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KEY_DELETE_COMMAND"], {
                "NodeDeletionPlugin.useEffect.removeDelete": ()=>{
                    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isNodeSelection"])(selection)) {
                        const nodes = selection.getNodes();
                        nodes.forEach({
                            "NodeDeletionPlugin.useEffect.removeDelete": (node)=>{
                                node.remove();
                            }
                        }["NodeDeletionPlugin.useEffect.removeDelete"]);
                        return true;
                    }
                    return false;
                }
            }["NodeDeletionPlugin.useEffect.removeDelete"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_LOW"]);
            return ({
                "NodeDeletionPlugin.useEffect": ()=>{
                    removeBackspace();
                    removeDelete();
                }
            })["NodeDeletionPlugin.useEffect"];
        }
    }["NodeDeletionPlugin.useEffect"], [
        editor
    ]);
    return null;
}
_s(NodeDeletionPlugin, "mCqe7sh4aC9mLBXPHfG3d/PNTaQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"]
    ];
});
_c = NodeDeletionPlugin;
var _c;
__turbopack_context__.k.register(_c, "NodeDeletionPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/toolbar/ToolbarPlugin.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ToolbarPlugin",
    ()=>ToolbarPlugin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalComposerContext.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lexical/Lexical.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$utils$2f$LexicalUtils$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@lexical/utils/LexicalUtils.dev.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bold.js [app-client] (ecmascript) <export default as Bold>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/italic.js [app-client] (ecmascript) <export default as Italic>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/underline.js [app-client] (ecmascript) <export default as Underline>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$strikethrough$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Strikethrough$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/strikethrough.js [app-client] (ecmascript) <export default as Strikethrough>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript) <export default as ImagePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-client] (ecmascript) <export default as Paperclip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/nodes/AttachmentNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function ToolbarPlugin() {
    _s();
    const [editor] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"])();
    const [isBold, setIsBold] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isItalic, setIsItalic] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUnderline, setIsUnderline] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isStrikethrough, setIsStrikethrough] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCode, setIsCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUploading, setIsUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const imageInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const uploadMutation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].upload.getUploadUrl.useMutation();
    const updateToolbar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToolbarPlugin.useCallback[updateToolbar]": ()=>{
            const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) {
                setIsBold(selection.hasFormat("bold"));
                setIsItalic(selection.hasFormat("italic"));
                setIsUnderline(selection.hasFormat("underline"));
                setIsStrikethrough(selection.hasFormat("strikethrough"));
                setIsCode(selection.hasFormat("code"));
            }
        }
    }["ToolbarPlugin.useCallback[updateToolbar]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToolbarPlugin.useEffect": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$utils$2f$LexicalUtils$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["mergeRegister"])(editor.registerUpdateListener({
                "ToolbarPlugin.useEffect": (param)=>{
                    let { editorState } = param;
                    editorState.read({
                        "ToolbarPlugin.useEffect": ()=>{
                            updateToolbar();
                        }
                    }["ToolbarPlugin.useEffect"]);
                }
            }["ToolbarPlugin.useEffect"]), editor.registerCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SELECTION_CHANGE_COMMAND"], {
                "ToolbarPlugin.useEffect": ()=>{
                    updateToolbar();
                    return false;
                }
            }["ToolbarPlugin.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["COMMAND_PRIORITY_CRITICAL"]));
        }
    }["ToolbarPlugin.useEffect"], [
        editor,
        updateToolbar
    ]);
    const handleFileUpload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ToolbarPlugin.useCallback[handleFileUpload]": async (file)=>{
            setIsUploading(true);
            try {
                // Get presigned URL
                const result = await uploadMutation.mutateAsync({
                    filename: file.name,
                    contentType: file.type,
                    size: file.size
                });
                // Upload to R2
                const uploadResponse = await fetch(result.uploadUrl, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type
                    }
                });
                if (!uploadResponse.ok) {
                    const errorText = await uploadResponse.text();
                    console.error("R2 upload failed:", uploadResponse.status, errorText);
                    alert("Upload failed: ".concat(uploadResponse.status, " - Check CORS configuration on R2 bucket"));
                    return;
                }
                // Determine attachment type
                let attachmentType = "FILE";
                if (file.type.startsWith("image/")) {
                    attachmentType = "IMAGE";
                } else if (file.type.startsWith("video/")) {
                    attachmentType = "VIDEO";
                }
                // Insert attachment node
                editor.update({
                    "ToolbarPlugin.useCallback[handleFileUpload]": ()=>{
                        const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$getSelection"])();
                        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$isRangeSelection"])(selection)) {
                            const attachmentNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createAttachmentNode"])({
                                attachmentType,
                                url: result.publicUrl,
                                filename: file.name,
                                mimeType: file.type,
                                size: file.size
                            });
                            selection.insertNodes([
                                attachmentNode,
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$createParagraphNode"])()
                            ]);
                        }
                    }
                }["ToolbarPlugin.useCallback[handleFileUpload]"]);
            } catch (error) {
                console.error("Upload failed:", error);
                const message = error instanceof Error ? error.message : "Unknown error";
                alert("Upload failed: ".concat(message));
            } finally{
                setIsUploading(false);
            }
        }
    }["ToolbarPlugin.useCallback[handleFileUpload]"], [
        editor,
        uploadMutation
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative z-20 flex items-center gap-0.5 border-b border-border px-2 py-1",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: imageInputRef,
                type: "file",
                accept: "image/*,video/*",
                className: "hidden",
                onChange: (e)=>{
                    var _e_target_files;
                    const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
                    if (file) {
                        handleFileUpload(file);
                    }
                    e.target.value = "";
                }
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 132,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: fileInputRef,
                type: "file",
                accept: "*/*",
                className: "hidden",
                onChange: (e)=>{
                    var _e_target_files;
                    const file = (_e_target_files = e.target.files) === null || _e_target_files === void 0 ? void 0 : _e_target_files[0];
                    if (file) {
                        handleFileUpload(file);
                    }
                    e.target.value = "";
                }
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-8 w-8 p-0", isBold && "bg-muted"),
                onClick: ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMAT_TEXT_COMMAND"], "bold"),
                title: "Bold (⌘B)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bold$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bold$3e$__["Bold"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-8 w-8 p-0", isItalic && "bg-muted"),
                onClick: ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMAT_TEXT_COMMAND"], "italic"),
                title: "Italic (⌘I)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$italic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Italic$3e$__["Italic"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                    lineNumber: 178,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 170,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-8 w-8 p-0", isUnderline && "bg-muted"),
                onClick: ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMAT_TEXT_COMMAND"], "underline"),
                title: "Underline (⌘U)",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$underline$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Underline$3e$__["Underline"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                    lineNumber: 188,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 180,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-8 w-8 p-0", isStrikethrough && "bg-muted"),
                onClick: ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMAT_TEXT_COMMAND"], "strikethrough"),
                title: "Strikethrough",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$strikethrough$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Strikethrough$3e$__["Strikethrough"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 190,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-1 h-4 w-px bg-border"
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-8 w-8 p-0", isCode && "bg-muted"),
                onClick: ()=>editor.dispatchCommand(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lexical$2f$Lexical$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FORMAT_TEXT_COMMAND"], "code"),
                title: "Inline Code",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                    lineNumber: 209,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 201,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-1 h-4 w-px bg-border"
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-8 gap-1.5 px-2",
                disabled: isUploading,
                onClick: ()=>{
                    var _imageInputRef_current;
                    return (_imageInputRef_current = imageInputRef.current) === null || _imageInputRef_current === void 0 ? void 0 : _imageInputRef_current.click();
                },
                title: "Add image or video",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs",
                        children: "Image"
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "button",
                variant: "ghost",
                size: "sm",
                className: "h-8 gap-1.5 px-2",
                disabled: isUploading,
                onClick: ()=>{
                    var _fileInputRef_current;
                    return (_fileInputRef_current = fileInputRef.current) === null || _fileInputRef_current === void 0 ? void 0 : _fileInputRef_current.click();
                },
                title: "Add file",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs",
                        children: "File"
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this),
            isUploading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-2 text-xs text-muted-foreground",
                children: "Uploading..."
            }, void 0, false, {
                fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
                lineNumber: 241,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/editor/toolbar/ToolbarPlugin.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
_s(ToolbarPlugin, "l0jWqPYModv5nWYd0sjLpVje0bc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposerContext$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLexicalComposerContext"]
    ];
});
_c = ToolbarPlugin;
var _c;
__turbopack_context__.k.register(_c, "ToolbarPlugin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/editor/Editor.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Editor",
    ()=>Editor,
    "EditorContent",
    ()=>EditorContent
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposer$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalComposer.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalRichTextPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalRichTextPlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalContentEditable$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalContentEditable.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalHistoryPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalHistoryPlugin.dev.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalOnChangePlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalOnChangePlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalErrorBoundary$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalErrorBoundary.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalMarkdownShortcutPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalMarkdownShortcutPlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalListPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalListPlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalLinkPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/react/LexicalLinkPlugin.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/rich-text/LexicalRichText.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/list/LexicalList.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$link$2f$LexicalLink$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/link/LexicalLink.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$code$2f$LexicalCode$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/code/LexicalCode.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$markdown$2f$LexicalMarkdown$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@lexical/markdown/LexicalMarkdown.dev.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$MentionNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/nodes/MentionNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$ImageNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/nodes/ImageNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/nodes/AttachmentNode.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$MentionPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/plugins/MentionPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$SlashCommandPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/plugins/SlashCommandPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$DragDropPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/plugins/DragDropPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$FloatingAddButtonPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/plugins/FloatingAddButtonPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$NodeDeletionPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/plugins/NodeDeletionPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$toolbar$2f$ToolbarPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/toolbar/ToolbarPlugin.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const theme = {
    paragraph: "mb-2",
    heading: {
        h1: "text-3xl font-bold mb-4 mt-6",
        h2: "text-2xl font-bold mb-3 mt-5",
        h3: "text-xl font-bold mb-2 mt-4"
    },
    list: {
        ul: "list-disc ml-4 mb-2",
        ol: "list-decimal ml-4 mb-2",
        listitem: "mb-1"
    },
    quote: "border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-4",
    code: "font-mono bg-muted px-1.5 py-0.5 rounded text-sm",
    codeHighlight: {
        atrule: "text-purple-500",
        attr: "text-yellow-500",
        boolean: "text-purple-500",
        builtin: "text-cyan-500",
        cdata: "text-gray-500",
        char: "text-green-500",
        class: "text-yellow-500",
        "class-name": "text-yellow-500",
        comment: "text-gray-500",
        constant: "text-purple-500",
        deleted: "text-red-500",
        doctype: "text-gray-500",
        entity: "text-red-500",
        function: "text-blue-500",
        important: "text-purple-500",
        inserted: "text-green-500",
        keyword: "text-purple-500",
        namespace: "text-purple-500",
        number: "text-purple-500",
        operator: "text-gray-500",
        prolog: "text-gray-500",
        property: "text-red-500",
        punctuation: "text-gray-500",
        regex: "text-green-500",
        selector: "text-green-500",
        string: "text-green-500",
        symbol: "text-purple-500",
        tag: "text-red-500",
        url: "text-blue-500",
        variable: "text-orange-500"
    },
    link: "text-primary underline cursor-pointer hover:text-primary/80",
    text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
        code: "font-mono bg-muted px-1.5 py-0.5 rounded text-sm"
    }
};
function Editor(param) {
    let { initialContent, onChange, placeholder = "Start writing, type / for commands or click + to add...", editable = true, showToolbar = true, minHeight = "200px", className } = param;
    _s();
    const [floatingAnchorElem, setFloatingAnchorElem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const onRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[onRef]": (elem)=>{
            if (elem !== null) {
                setFloatingAnchorElem(elem);
            }
        }
    }["Editor.useCallback[onRef]"], []);
    const handleChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Editor.useCallback[handleChange]": (editorState)=>{
            if (onChange) {
                onChange(editorState.toJSON());
            }
        }
    }["Editor.useCallback[handleChange]"], [
        onChange
    ]);
    const initialConfig = {
        namespace: "DraftboardEditor",
        theme,
        onError: (error)=>{
            console.error("Lexical error:", error);
        },
        nodes: [
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HeadingNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$rich$2d$text$2f$LexicalRichText$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QuoteNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$list$2f$LexicalList$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListItemNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$link$2f$LexicalLink$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$link$2f$LexicalLink$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AutoLinkNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$code$2f$LexicalCode$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$code$2f$LexicalCode$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CodeHighlightNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$MentionNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MentionNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$ImageNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageNode"],
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$nodes$2f$AttachmentNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AttachmentNode"]
        ],
        editorState: initialContent ? JSON.stringify(initialContent) : undefined,
        editable
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalComposer$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LexicalComposer"], {
        initialConfig: initialConfig,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("editor-container relative", className),
            children: [
                showToolbar && editable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$toolbar$2f$ToolbarPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ToolbarPlugin"], {}, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 153,
                    columnNumber: 37
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    ref: onRef,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalRichTextPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RichTextPlugin"], {
                        contentEditable: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalContentEditable$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContentEditable"], {
                            className: "editor-input outline-none",
                            style: {
                                minHeight
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/Editor.tsx",
                            lineNumber: 157,
                            columnNumber: 15
                        }, void 0),
                        placeholder: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "editor-placeholder",
                            children: placeholder
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/Editor.tsx",
                            lineNumber: 163,
                            columnNumber: 15
                        }, void 0),
                        ErrorBoundary: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalErrorBoundary$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LexicalErrorBoundary"]
                    }, void 0, false, {
                        fileName: "[project]/src/components/editor/Editor.tsx",
                        lineNumber: 155,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 154,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalHistoryPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["HistoryPlugin"], {}, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 168,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalListPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ListPlugin"], {}, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalLinkPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LinkPlugin"], {}, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalMarkdownShortcutPlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MarkdownShortcutPlugin"], {
                    transformers: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$markdown$2f$LexicalMarkdown$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TRANSFORMERS"]
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 171,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$lexical$2f$react$2f$LexicalOnChangePlugin$2e$dev$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["OnChangePlugin"], {
                    onChange: handleChange
                }, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 172,
                    columnNumber: 9
                }, this),
                editable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$MentionPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MentionPlugin"], {}, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 173,
                    columnNumber: 22
                }, this),
                editable && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$NodeDeletionPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NodeDeletionPlugin"], {}, void 0, false, {
                    fileName: "[project]/src/components/editor/Editor.tsx",
                    lineNumber: 174,
                    columnNumber: 22
                }, this),
                editable && floatingAnchorElem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$SlashCommandPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SlashCommandPlugin"], {
                            anchorElem: floatingAnchorElem
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/Editor.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$DragDropPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DragDropPlugin"], {}, void 0, false, {
                            fileName: "[project]/src/components/editor/Editor.tsx",
                            lineNumber: 178,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$plugins$2f$FloatingAddButtonPlugin$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FloatingAddButtonPlugin"], {
                            anchorElem: floatingAnchorElem
                        }, void 0, false, {
                            fileName: "[project]/src/components/editor/Editor.tsx",
                            lineNumber: 179,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/editor/Editor.tsx",
            lineNumber: 152,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/editor/Editor.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
_s(Editor, "pq4xU1NaiM4tiXuTbErfszb18mU=");
_c = Editor;
function EditorContent(param) {
    let { content, className } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Editor, {
        initialContent: content,
        editable: false,
        showToolbar: false,
        minHeight: "auto",
        className: className
    }, void 0, false, {
        fileName: "[project]/src/components/editor/Editor.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
_c1 = EditorContent;
var _c, _c1;
__turbopack_context__.k.register(_c, "Editor");
__turbopack_context__.k.register(_c1, "EditorContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/popover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popover",
    ()=>Popover,
    "PopoverAnchor",
    ()=>PopoverAnchor,
    "PopoverContent",
    ()=>PopoverContent,
    "PopoverTrigger",
    ()=>PopoverTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-popover/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Popover = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"];
const PopoverTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"];
const PopoverAnchor = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Anchor"];
const PopoverContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, align = "center", sideOffset = 4, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            align: align,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/popover.tsx",
            lineNumber: 18,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/popover.tsx",
        lineNumber: 17,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = PopoverContent;
PopoverContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$popover$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "PopoverContent$React.forwardRef");
__turbopack_context__.k.register(_c1, "PopoverContent");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/reactions/ReactionButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReactionButton",
    ()=>ReactionButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/tooltip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.js [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/thumbs-up.js [app-client] (ecmascript) <export default as ThumbsUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SmilePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smile-plus.js [app-client] (ecmascript) <export default as SmilePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
const DEFAULT_REACTIONS = [
    {
        type: "like",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$thumbs$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ThumbsUp$3e$__["ThumbsUp"],
        label: "Like"
    },
    {
        type: "wow",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"],
        label: "Wow"
    },
    {
        type: "cool",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"],
        label: "Cool"
    }
];
function ReactionButton(param) {
    let { postId, commentId, reactions, count } = param;
    _s();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const utils = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].useUtils();
    const toggleMutation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].reaction.toggle.useMutation({
        onSuccess: {
            "ReactionButton.useMutation[toggleMutation]": ()=>{
                if (postId) {
                    utils.post.feed.invalidate();
                    utils.post.getById.invalidate({
                        id: postId
                    });
                }
                if (commentId) {
                    utils.comment.byPost.invalidate();
                }
            }
        }["ReactionButton.useMutation[toggleMutation]"]
    });
    // Group reactions by type
    const reactionCounts = reactions.reduce((acc, r)=>{
        acc[r.type] = (acc[r.type] || 0) + 1;
        return acc;
    }, {});
    const handleReaction = (type)=>{
        toggleMutation.mutate({
            type,
            postId,
            commentId
        });
        setIsOpen(false);
    };
    const hasReactions = count > 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
            open: isOpen,
            onOpenChange: setIsOpen,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                    asChild: true,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "ghost",
                        size: "sm",
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("gap-2 rounded-full px-2 text-muted-foreground", hasReactions && "text-primary"),
                        children: [
                            hasReactions ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex -space-x-1",
                                children: Object.keys(reactionCounts).slice(0, 3).map((type)=>{
                                    const reaction = DEFAULT_REACTIONS.find((r)=>r.type === type);
                                    if (!reaction) return null;
                                    const Icon = reaction.icon;
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                            lineNumber: 98,
                                            columnNumber: 25
                                        }, this)
                                    }, type, false, {
                                        fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                        lineNumber: 94,
                                        columnNumber: 23
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smile$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SmilePlus$3e$__["SmilePlus"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: count
                            }, void 0, false, {
                                fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                lineNumber: 106,
                                columnNumber: 27
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                        lineNumber: 77,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                    className: "w-auto p-2",
                    align: "start",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-1",
                        children: DEFAULT_REACTIONS.map((reaction)=>{
                            const Icon = reaction.icon;
                            const userReacted = reactions.some((r)=>r.type === reaction.type);
                            const reactionCount = reactionCounts[reaction.type] || 0;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleReaction(reaction.type),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-10 w-10 items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-muted", userReacted && "bg-primary/10 text-primary"),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                                lineNumber: 128,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                            lineNumber: 121,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                        lineNumber: 120,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$tooltip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TooltipContent"], {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                reaction.label,
                                                reactionCount > 0 && " (".concat(reactionCount, ")")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                            lineNumber: 132,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                        lineNumber: 131,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, reaction.type, true, {
                                fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                                lineNumber: 119,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                        lineNumber: 110,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/reactions/ReactionButton.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/reactions/ReactionButton.tsx",
            lineNumber: 75,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/reactions/ReactionButton.tsx",
        lineNumber: 74,
        columnNumber: 5
    }, this);
}
_s(ReactionButton, "LsbbTw7F4OKKUX/qG4Brf+LDZxQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].useUtils
    ];
});
_c = ReactionButton;
var _c;
__turbopack_context__.k.register(_c, "ReactionButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/post/PostDetail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostDetail",
    ()=>PostDetail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/editor/Editor.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$reactions$2f$ReactionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/reactions/ReactionButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/react.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function PostDetail(param) {
    let { post } = param;
    var _session_user, _session_user1, _session_user2;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: session } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"])();
    const isAuthor = (session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id) === post.author.id;
    const isAdmin = (session === null || session === void 0 ? void 0 : (_session_user1 = session.user) === null || _session_user1 === void 0 ? void 0 : _session_user1.role) === "ADMIN" || (session === null || session === void 0 ? void 0 : (_session_user2 = session.user) === null || _session_user2 === void 0 ? void 0 : _session_user2.role) === "OWNER";
    const canModify = isAuthor || isAdmin;
    const [showDeleteDialog, setShowDeleteDialog] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const deleteMutation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].post.delete.useMutation({
        onSuccess: {
            "PostDetail.useMutation[deleteMutation]": ()=>{
                router.push("/");
            }
        }["PostDetail.useMutation[deleteMutation]"]
    });
    const handleDelete = ()=>{
        deleteMutation.mutate({
            id: post.id
        });
    };
    var _post_author_avatarUrl;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/user/".concat(post.author.id),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                            className: "h-12 w-12",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                                    src: (_post_author_avatarUrl = post.author.avatarUrl) !== null && _post_author_avatarUrl !== void 0 ? _post_author_avatarUrl : undefined
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                                    lineNumber: 102,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(post.author.displayName)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                                    lineNumber: 103,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/post/PostDetail.tsx",
                                            lineNumber: 101,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/post/PostDetail.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/user/".concat(post.author.id),
                                                className: "font-medium hover:underline",
                                                children: post.author.displayName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                                lineNumber: 107,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-muted-foreground",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(new Date(post.createdAt))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                                lineNumber: 113,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/post/PostDetail.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            canModify && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                                                    className: "h-5 w-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                                    lineNumber: 122,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "sr-only",
                                                    children: "Post options"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/post/PostDetail.tsx",
                                            lineNumber: 121,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/post/PostDetail.tsx",
                                        lineNumber: 120,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        align: "end",
                                        children: [
                                            isAuthor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                    href: "/post/".concat(post.id, "/edit"),
                                                    className: "gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/post/PostDetail.tsx",
                                                            lineNumber: 130,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Edit post"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                                lineNumber: 128,
                                                columnNumber: 19
                                            }, this),
                                            (isAuthor || isAdmin) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                children: [
                                                    isAuthor && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/src/components/post/PostDetail.tsx",
                                                        lineNumber: 137,
                                                        columnNumber: 34
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        onClick: ()=>setShowDeleteDialog(true),
                                                        className: "gap-2 text-destructive focus:text-destructive",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                className: "h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                                                lineNumber: 142,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Delete post"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/post/PostDetail.tsx",
                                                        lineNumber: 138,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/post/PostDetail.tsx",
                                        lineNumber: 126,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                lineNumber: 119,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/post/PostDetail.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                        open: showDeleteDialog,
                        onOpenChange: setShowDeleteDialog,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                            children: "Delete post?"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/post/PostDetail.tsx",
                                            lineNumber: 156,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                            children: "This action cannot be undone. This will permanently delete the post and all associated comments and reactions."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/post/PostDetail.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            onClick: ()=>setShowDeleteDialog(false),
                                            disabled: deleteMutation.isPending,
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/post/PostDetail.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "destructive",
                                            onClick: handleDelete,
                                            disabled: deleteMutation.isPending,
                                            children: [
                                                deleteMutation.isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                    className: "mr-2 h-4 w-4 animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                                    lineNumber: 176,
                                                    columnNumber: 19
                                                }, this),
                                                "Delete"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/post/PostDetail.tsx",
                                            lineNumber: 170,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/post/PostDetail.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/post/PostDetail.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    post.title && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold tracking-tight",
                        children: post.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/post/PostDetail.tsx",
                        lineNumber: 186,
                        columnNumber: 11
                    }, this),
                    post.projects.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: post.projects.map((param)=>{
                            let { project } = param;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/projects/".concat(project.id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "secondary",
                                    className: "hover:bg-secondary/80",
                                    children: project.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                    lineNumber: 194,
                                    columnNumber: 17
                                }, this)
                            }, project.id, false, {
                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                lineNumber: 193,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/post/PostDetail.tsx",
                        lineNumber: 191,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/post/PostDetail.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "prose prose-neutral dark:prose-invert max-w-none",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$editor$2f$Editor$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditorContent"], {
                    content: post.content
                }, void 0, false, {
                    fileName: "[project]/src/components/post/PostDetail.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/post/PostDetail.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "flex items-center justify-between border-t pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$reactions$2f$ReactionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactionButton"], {
                                postId: post.id,
                                reactions: post.reactions,
                                count: post.reactions.length
                            }, void 0, false, {
                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-muted-foreground",
                                children: [
                                    post._count.comments,
                                    " comments"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/post/PostDetail.tsx",
                                lineNumber: 216,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/post/PostDetail.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    post.liveUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                            href: post.liveUrl,
                            target: "_blank",
                            rel: "noopener noreferrer",
                            className: "gap-2",
                            children: [
                                "View live",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/post/PostDetail.tsx",
                                    lineNumber: 230,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/post/PostDetail.tsx",
                            lineNumber: 223,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/post/PostDetail.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/post/PostDetail.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/post/PostDetail.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(PostDetail, "taBnBqdZtjkeg7Z9Al/9RUMOLLc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSession"]
    ];
});
_c = PostDetail;
var _c;
__turbopack_context__.k.register(_c, "PostDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Textarea",
    ()=>Textarea
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Textarea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/textarea.tsx",
        lineNumber: 9,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Textarea;
Textarea.displayName = "Textarea";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Textarea$React.forwardRef");
__turbopack_context__.k.register(_c1, "Textarea");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/comments/CommentComposer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentComposer",
    ()=>CommentComposer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/textarea.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CommentComposer(param) {
    let { postId, parentId, attachmentId, coordinates, onSuccess, placeholder = "Add a comment...", compact = false } = param;
    _s();
    const [text, setText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const utils = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].useUtils();
    const createMutation = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].comment.create.useMutation({
        onSuccess: {
            "CommentComposer.useMutation[createMutation]": ()=>{
                setText("");
                utils.comment.byPost.invalidate({
                    postId
                });
                utils.post.getById.invalidate({
                    id: postId
                });
                onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
            }
        }["CommentComposer.useMutation[createMutation]"]
    });
    const handleSubmit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "CommentComposer.useCallback[handleSubmit]": (e)=>{
            e.preventDefault();
            if (!text.trim()) return;
            // Create a simple Lexical editor state with the text
            const content = {
                root: {
                    children: [
                        {
                            children: [
                                {
                                    detail: 0,
                                    format: 0,
                                    mode: "normal",
                                    style: "",
                                    text: text.trim(),
                                    type: "text",
                                    version: 1
                                }
                            ],
                            direction: "ltr",
                            format: "",
                            indent: 0,
                            type: "paragraph",
                            version: 1
                        }
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    type: "root",
                    version: 1
                }
            };
            createMutation.mutate({
                postId,
                content,
                parentId,
                attachmentId,
                coordinates
            });
        }
    }["CommentComposer.useCallback[handleSubmit]"], [
        text,
        postId,
        parentId,
        attachmentId,
        coordinates,
        createMutation
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$textarea$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Textarea"], {
                value: text,
                onChange: (e)=>setText(e.target.value),
                placeholder: placeholder,
                className: compact ? "min-h-[60px]" : "min-h-[80px]",
                disabled: createMutation.isPending
            }, void 0, false, {
                fileName: "[project]/src/components/comments/CommentComposer.tsx",
                lineNumber: 95,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "submit",
                size: compact ? "sm" : "default",
                disabled: !text.trim() || createMutation.isPending,
                className: "shrink-0",
                children: createMutation.isPending ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-4 w-4 animate-spin"
                }, void 0, false, {
                    fileName: "[project]/src/components/comments/CommentComposer.tsx",
                    lineNumber: 109,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                    className: "h-4 w-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/comments/CommentComposer.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/comments/CommentComposer.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/comments/CommentComposer.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
_s(CommentComposer, "hWk+Gchn/KNnrzAYDAaCjAYO4cA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].useUtils
    ];
});
_c = CommentComposer;
var _c;
__turbopack_context__.k.register(_c, "CommentComposer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/comments/CommentThread.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentThread",
    ()=>CommentThread
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/avatar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$reactions$2f$ReactionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/reactions/ReactionButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$comments$2f$CommentComposer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/comments/CommentComposer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function extractPlainText(content) {
    if (!content || typeof content !== "object") return "";
    const root = content.root;
    if (!root || typeof root !== "object") return "";
    const children = root.children;
    if (!Array.isArray(children)) return "";
    const texts = [];
    function extractFromNode(node) {
        if (!node || typeof node !== "object") return;
        const nodeObj = node;
        if (nodeObj.type === "text" && typeof nodeObj.text === "string") {
            texts.push(nodeObj.text);
        }
        if (Array.isArray(nodeObj.children)) {
            nodeObj.children.forEach(extractFromNode);
        }
    }
    children.forEach(extractFromNode);
    return texts.join(" ");
}
function CommentThread(param) {
    let { comment, postId } = param;
    _s();
    const [showReplyForm, setShowReplyForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const plainText = extractPlainText(comment.content);
    var _comment_author_avatarUrl;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/user/".concat(comment.author.id),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                            className: "h-8 w-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                    src: (_comment_author_avatarUrl = comment.author.avatarUrl) !== null && _comment_author_avatarUrl !== void 0 ? _comment_author_avatarUrl : undefined
                                }, void 0, false, {
                                    fileName: "[project]/src/components/comments/CommentThread.tsx",
                                    lineNumber: 84,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                    className: "text-xs",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(comment.author.displayName)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/comments/CommentThread.tsx",
                                    lineNumber: 85,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/comments/CommentThread.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-lg bg-muted px-3 py-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/user/".concat(comment.author.id),
                                                className: "text-sm font-medium hover:underline",
                                                children: comment.author.displayName
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                                lineNumber: 93,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-muted-foreground",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(new Date(comment.createdAt))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                                lineNumber: 99,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm",
                                        children: plainText
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                lineNumber: 91,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-1 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$reactions$2f$ReactionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactionButton"], {
                                        commentId: comment.id,
                                        reactions: comment.reactions,
                                        count: comment.reactions.length
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        className: "h-7 gap-1 px-2 text-xs text-muted-foreground",
                                        onClick: ()=>setShowReplyForm(!showReplyForm),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                                lineNumber: 117,
                                                columnNumber: 15
                                            }, this),
                                            "Reply"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                                        lineNumber: 111,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                        lineNumber: 90,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/comments/CommentThread.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, this),
            showReplyForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-11",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$comments$2f$CommentComposer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentComposer"], {
                    postId: postId,
                    parentId: comment.id,
                    onSuccess: ()=>setShowReplyForm(false),
                    placeholder: "Reply to ".concat(comment.author.displayName, "..."),
                    compact: true
                }, void 0, false, {
                    fileName: "[project]/src/components/comments/CommentThread.tsx",
                    lineNumber: 127,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/comments/CommentThread.tsx",
                lineNumber: 126,
                columnNumber: 9
            }, this),
            comment.replies.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-11 space-y-4 border-l-2 border-muted pl-4",
                children: comment.replies.map((reply)=>{
                    const replyText = extractPlainText(reply.content);
                    var _reply_author_avatarUrl;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/user/".concat(reply.author.id),
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Avatar"], {
                                    className: "h-7 w-7",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarImage"], {
                                            src: (_reply_author_avatarUrl = reply.author.avatarUrl) !== null && _reply_author_avatarUrl !== void 0 ? _reply_author_avatarUrl : undefined
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/comments/CommentThread.tsx",
                                            lineNumber: 146,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$avatar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AvatarFallback"], {
                                            className: "text-xs",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitials"])(reply.author.displayName)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/comments/CommentThread.tsx",
                                            lineNumber: 147,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/comments/CommentThread.tsx",
                                    lineNumber: 145,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                lineNumber: 144,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "rounded-lg bg-muted px-3 py-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/user/".concat(reply.author.id),
                                                        className: "text-sm font-medium hover:underline",
                                                        children: reply.author.displayName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-muted-foreground",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatRelativeTime"])(new Date(reply.createdAt))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                                lineNumber: 154,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-sm",
                                                children: replyText
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                                lineNumber: 165,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                                        lineNumber: 153,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-1",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$reactions$2f$ReactionButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactionButton"], {
                                            commentId: reply.id,
                                            reactions: reply.reactions,
                                            count: reply.reactions.length
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/comments/CommentThread.tsx",
                                            lineNumber: 168,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                                        lineNumber: 167,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/comments/CommentThread.tsx",
                                lineNumber: 152,
                                columnNumber: 17
                            }, this)
                        ]
                    }, reply.id, true, {
                        fileName: "[project]/src/components/comments/CommentThread.tsx",
                        lineNumber: 143,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/comments/CommentThread.tsx",
                lineNumber: 139,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/comments/CommentThread.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(CommentThread, "T1n6SoDfEfapLwETQvktm/SVFN0=");
_c = CommentThread;
var _c;
__turbopack_context__.k.register(_c, "CommentThread");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function Skeleton(param) {
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("animate-pulse rounded-md bg-muted", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/skeleton.tsx",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = Skeleton;
;
var _c;
__turbopack_context__.k.register(_c, "Skeleton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/comments/CommentSection.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CommentSection",
    ()=>CommentSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/trpc/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$comments$2f$CommentThread$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/comments/CommentThread.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$comments$2f$CommentComposer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/comments/CommentComposer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CommentSection(param) {
    let { postId } = param;
    _s();
    const { data: comments, isLoading } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$trpc$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].comment.byPost.useQuery({
        postId
    });
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "space-y-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                    className: "h-6 w-24"
                }, void 0, false, {
                    fileName: "[project]/src/components/comments/CommentSection.tsx",
                    lineNumber: 20,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                    className: "h-24"
                }, void 0, false, {
                    fileName: "[project]/src/components/comments/CommentSection.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                    className: "h-32"
                }, void 0, false, {
                    fileName: "[project]/src/components/comments/CommentSection.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/comments/CommentSection.tsx",
            lineNumber: 19,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "flex items-center gap-2 text-lg font-semibold",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/comments/CommentSection.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    "Comments",
                    comments && comments.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-muted-foreground",
                        children: [
                            "(",
                            comments.length,
                            ")"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/comments/CommentSection.tsx",
                        lineNumber: 33,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/comments/CommentSection.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$comments$2f$CommentComposer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentComposer"], {
                postId: postId
            }, void 0, false, {
                fileName: "[project]/src/components/comments/CommentSection.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: comments && comments.length > 0 ? comments.map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$comments$2f$CommentThread$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommentThread"], {
                        comment: comment,
                        postId: postId
                    }, comment.id, false, {
                        fileName: "[project]/src/components/comments/CommentSection.tsx",
                        lineNumber: 44,
                        columnNumber: 13
                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "py-8 text-center text-sm text-muted-foreground",
                    children: "No comments yet. Be the first to comment!"
                }, void 0, false, {
                    fileName: "[project]/src/components/comments/CommentSection.tsx",
                    lineNumber: 47,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/comments/CommentSection.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/comments/CommentSection.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(CommentSection, "f7UbhJONClaakdSnMn8ajHTdepg=");
_c = CommentSection;
var _c;
__turbopack_context__.k.register(_c, "CommentSection");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_components_3bc061c2._.js.map