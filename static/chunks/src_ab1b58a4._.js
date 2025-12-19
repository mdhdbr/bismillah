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
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8",
            icon: "h-10 w-10"
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
"[project]/src/store/tracking-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTrackingStore",
    ()=>useTrackingStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
;
const useTrackingStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set)=>({
        vehicles: [],
        autoRefresh: true,
        showCallsigns: true,
        setVehicles: (vehicles)=>set({
                vehicles
            }),
        selectVehicle: (v)=>set({
                selectedVehicle: v
            }),
        toggleAutoRefresh: ()=>set((s)=>({
                    autoRefresh: !s.autoRefresh
                })),
        toggleCallsigns: ()=>set((s)=>({
                    showCallsigns: !s.showCallsigns
                }))
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/tracking/top-bar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrackingTopBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/tracking-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tag.js [app-client] (ecmascript) <export default as Tag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$traffic$2d$cone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrafficCone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/traffic-cone.js [app-client] (ecmascript) <export default as TrafficCone>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function TrackingTopBar() {
    _s();
    const { autoRefresh, toggleAutoRefresh, showCallsigns, toggleCallsigns } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrackingStore"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-4 left-4 right-4 z-[1001] flex items-center justify-end gap-2",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-lg shadow-md border",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: toggleAutoRefresh,
                    variant: "outline",
                    size: "sm",
                    className: "flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                            className: "mr-2 h-4 w-4 ".concat(autoRefresh ? 'animate-spin' : '')
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/top-bar.tsx",
                            lineNumber: 19,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: autoRefresh ? "Auto Refresh ON" : "Auto Refresh OFF"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/top-bar.tsx",
                            lineNumber: 20,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/tracking/top-bar.tsx",
                    lineNumber: 18,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: toggleCallsigns,
                    variant: "outline",
                    size: "sm",
                    className: "flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Tag$3e$__["Tag"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/top-bar.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: showCallsigns ? "Hide Callsigns" : "Show Callsigns"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/top-bar.tsx",
                            lineNumber: 24,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/tracking/top-bar.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "sm",
                    className: "flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/top-bar.tsx",
                            lineNumber: 27,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Find Nearest"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/top-bar.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/tracking/top-bar.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "outline",
                    size: "sm",
                    className: "flex-shrink-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$traffic$2d$cone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrafficCone$3e$__["TrafficCone"], {
                            className: "mr-2 h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/top-bar.tsx",
                            lineNumber: 31,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Traffic"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/top-bar.tsx",
                            lineNumber: 32,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/tracking/top-bar.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/tracking/top-bar.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/tracking/top-bar.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(TrackingTopBar, "/SoZm8pu6XxQivAhsAemnsjtIIE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrackingStore"]
    ];
});
_c = TrackingTopBar;
var _c;
__turbopack_context__.k.register(_c, "TrackingTopBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/separator.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Separator",
    ()=>Separator
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-separator/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
const Separator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, orientation = "horizontal", decorative = true, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        decorative: decorative,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/separator.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Separator;
Separator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$separator$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Separator$React.forwardRef");
__turbopack_context__.k.register(_c1, "Separator");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allDrivers",
    ()=>allDrivers,
    "conversations",
    ()=>conversations,
    "dailyTripStats",
    ()=>dailyTripStats,
    "drivers",
    ()=>drivers,
    "trips",
    ()=>trips,
    "users",
    ()=>users,
    "vehicles",
    ()=>vehicles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subHours.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subMinutes.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/formatISO.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/date-fns/format.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/subDays.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addMonths.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/date-fns/addYears.mjs [app-client] (ecmascript)");
;
const users = [
    {
        id: 'user-001',
        name: 'Saleh Al-Mansoori',
        email: 'saleh.mansoori@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-123-4567'
    },
    {
        id: 'user-002',
        name: 'Fatima Al-Jameel',
        email: 'fatima.jameel@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-234-5678'
    },
    {
        id: 'user-003',
        name: 'Khalid Al-Harbi',
        email: 'khalid.harbi@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-345-6789'
    },
    {
        id: 'user-004',
        name: 'Noura Al-Saud',
        email: 'noura.saud@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-456-7890'
    },
    {
        id: 'user-005',
        name: 'Tariq Al-Ghamdi',
        email: 'tariq.ghamdi@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-50-567-8901'
    },
    {
        id: 'user-006',
        name: 'Aisha Al-Otaibi',
        email: 'aisha.otaibi@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-50-678-9012'
    },
    {
        id: 'user-007',
        name: 'Mohammed Al-Zahrani',
        email: 'mohammed.zahrani@example.com',
        role: 'DRIVER',
        isActive: false,
        phone: '+966-50-789-0123'
    },
    {
        id: 'user-008',
        name: 'Laila Al-Qahtani',
        email: 'laila.qahtani@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-50-890-1234'
    },
    {
        id: 'user-009',
        name: 'Youssef Al-Shehri',
        email: 'youssef.shehri@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-50-901-2345'
    },
    {
        id: 'user-010',
        name: 'Reem Al-Mutairi',
        email: 'reem.mutairi@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-55-123-4567'
    },
    {
        id: 'user-011',
        name: 'Abdullah Al-Dossary',
        email: 'abdullah.dossary@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-55-234-5678'
    },
    {
        id: 'user-012',
        name: 'Sara Al-Anazi',
        email: 'sara.anazi@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-55-345-6789'
    },
    {
        id: 'user-013',
        name: 'Fahad Al-Shammeri',
        email: 'fahad.shammeri@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-55-456-7890'
    },
    {
        id: 'user-014',
        name: 'Hanan Al-Maliki',
        email: 'hanan.maliki@example.com',
        role: 'HEAVY_DRIVER',
        isActive: true,
        phone: '+966-55-567-8901'
    },
    {
        id: 'user-015',
        name: 'Ibrahim Al-Johani',
        email: 'ibrahim.johani@example.com',
        role: 'DRIVER',
        isActive: true,
        phone: '+966-55-678-9012'
    }
];
users[10].role = 'HEAVY_DRIVER';
users[13].role = 'HEAVY_DRIVER';
let vehicles = [
    {
        id: 'vehicle-001',
        plateNumber: 'A123BC',
        vin: 'VIN001',
        type: 'PREMIUM_SEDAN',
        category: 'PASSENGER',
        capacity: 4,
        currentFuel: 75,
        status: 'ON_TRIP',
        currentLocation: {
            lat: 24.7136,
            lng: 46.6753
        },
        driverId: 'driver-001',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 1).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 6).toISOString(),
        nextMaintenance: '2024-08-15'
    },
    {
        id: 'vehicle-002',
        plateNumber: 'B456DE',
        vin: 'VIN002',
        type: 'SUV',
        category: 'PASSENGER',
        capacity: 6,
        currentFuel: 90,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 24.7742,
            lng: 46.7386
        },
        driverId: 'driver-002',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 2).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 11).toISOString(),
        nextMaintenance: '2024-09-01'
    },
    {
        id: 'vehicle-003',
        plateNumber: 'C789FG',
        vin: 'VIN003',
        type: 'TRUCK_5T',
        category: 'FREIGHT',
        capacity: 5000,
        currentFuel: 60,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.4225,
            lng: 39.8262
        },
        driverId: 'driver-005',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 2).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 2).toISOString(),
        nextMaintenance: '2024-07-30'
    },
    {
        id: 'vehicle-004',
        plateNumber: 'D012HI',
        vin: 'VIN004',
        type: 'MINI_BUS',
        category: 'PASSENGER',
        capacity: 15,
        currentFuel: 40,
        status: 'MAINTENANCE',
        currentLocation: {
            lat: 26.3986,
            lng: 50.2083
        },
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(new Date(), 10).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(new Date(), 5).toISOString(),
        nextMaintenance: '2024-07-25'
    },
    {
        id: 'vehicle-005',
        plateNumber: 'E345JK',
        vin: 'VIN005',
        type: 'SEDAN',
        category: 'PASSENGER',
        capacity: 4,
        currentFuel: 100,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 24.7400,
            lng: 46.6500
        },
        driverId: 'driver-010',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 1).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 8).toISOString(),
        nextMaintenance: '2024-10-10'
    },
    {
        id: 'vehicle-006',
        plateNumber: 'F678LM',
        vin: 'VIN006',
        type: 'TRUCK_10T',
        category: 'FREIGHT',
        capacity: 10000,
        currentFuel: 80,
        status: 'ON_TRIP',
        currentLocation: {
            lat: 24.8033,
            lng: 46.7667
        },
        driverId: 'driver-009',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 9).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 9).toISOString(),
        nextMaintenance: '2024-08-20'
    },
    {
        id: 'vehicle-007',
        plateNumber: 'G901NO',
        vin: 'VIN007',
        type: 'SUV',
        category: 'PASSENGER',
        capacity: 6,
        currentFuel: 55,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.5433,
            lng: 39.1728
        },
        driverId: 'driver-008',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 7).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 5).toISOString(),
        nextMaintenance: '2024-11-05'
    },
    {
        id: 'vehicle-008',
        plateNumber: 'H234PQ',
        vin: 'VIN008',
        type: 'LUXURY_CAR',
        category: 'PASSENGER',
        capacity: 4,
        currentFuel: 25,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.4858,
            lng: 39.1925
        },
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 3).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 1).toISOString(),
        nextMaintenance: '2024-09-12'
    },
    {
        id: 'vehicle-009',
        plateNumber: 'I567RS',
        vin: 'VIN009',
        type: 'FORKLIFT',
        category: 'EQUIPMENT',
        capacity: 2000,
        currentFuel: 95,
        status: 'OUT_OF_SERVICE',
        currentLocation: {
            lat: 26.2167,
            lng: 50.1833
        }
    },
    {
        id: 'vehicle-010',
        plateNumber: 'J890TU',
        vin: 'VIN010',
        type: 'LIGHT_BUS',
        category: 'PASSENGER',
        capacity: 25,
        currentFuel: 70,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 24.6877,
            lng: 46.7219
        },
        driverId: 'driver-011',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 14).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 10).toISOString(),
        nextMaintenance: '2024-12-01'
    },
    {
        id: 'vehicle-011',
        plateNumber: 'K123VW',
        vin: 'VIN011',
        type: 'TRUCK_15T',
        category: 'FREIGHT',
        capacity: 15000,
        currentFuel: 50,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.3891,
            lng: 39.8579
        },
        driverId: 'driver-013',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 4).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 4).toISOString(),
        nextMaintenance: '2024-08-22'
    },
    {
        id: 'vehicle-012',
        plateNumber: 'L456XY',
        vin: 'VIN012',
        type: 'SEDAN',
        category: 'PASSENGER',
        capacity: 4,
        currentFuel: 85,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 24.6333,
            lng: 46.7167
        },
        driverId: 'driver-014',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(new Date(), 30).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 1).toISOString(),
        nextMaintenance: '2024-10-18'
    },
    {
        id: 'vehicle-013',
        plateNumber: 'M789ZA',
        vin: 'VIN013',
        type: 'MPV',
        category: 'PASSENGER',
        capacity: 7,
        currentFuel: 65,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 21.6167,
            lng: 39.1500
        },
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 5).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 5).toISOString(),
        nextMaintenance: '2024-11-25'
    },
    {
        id: 'vehicle-014',
        plateNumber: 'N012AB',
        vin: 'VIN014',
        type: 'HEAVY_BUS',
        category: 'PASSENGER',
        capacity: 50,
        currentFuel: 78,
        status: 'MAINTENANCE',
        currentLocation: {
            lat: 24.7136,
            lng: 46.6753
        },
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 20).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 9).toISOString(),
        nextMaintenance: '2024-07-28'
    },
    {
        id: 'vehicle-015',
        plateNumber: 'P345CD',
        vin: 'VIN015',
        type: 'FLATBED',
        category: 'FREIGHT',
        capacity: 20000,
        currentFuel: 92,
        status: 'AVAILABLE',
        currentLocation: {
            lat: 26.4333,
            lng: 50.1167
        },
        driverId: 'driver-006',
        registrationExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 18).toISOString(),
        insuranceExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 12).toISOString(),
        nextMaintenance: '2024-09-30'
    }
];
const riskLevels = [
    'LOW',
    'LOW',
    'LOW',
    'MEDIUM',
    'HIGH'
];
const drivers = [
    {
        id: 'driver-001',
        userId: 'user-001',
        user: users[0],
        licenseNumber: 'D1234567',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 2).toISOString(),
        totalDutyHours: 8,
        currentStatus: 'ON_TRIP',
        fatigueLevel: 'HIGH',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 8).toISOString(),
        risk: 'HIGH'
    },
    {
        id: 'driver-002',
        userId: 'user-002',
        user: users[1],
        licenseNumber: 'D2345678',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 6).toISOString(),
        totalDutyHours: 4,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'LOW',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 4).toISOString(),
        risk: 'LOW'
    },
    {
        id: 'driver-003',
        userId: 'user-003',
        user: users[2],
        licenseNumber: 'D3456789',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(new Date(), 90).toISOString(),
        totalDutyHours: 0,
        currentStatus: 'OFF_DUTY',
        fatigueLevel: 'LOW',
        risk: 'LOW'
    },
    {
        id: 'driver-004',
        userId: 'user-004',
        user: users[3],
        licenseNumber: 'D4567890',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 1).toISOString(),
        totalDutyHours: 12,
        currentStatus: 'FORCED_REST',
        fatigueLevel: 'CRITICAL',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 12).toISOString(),
        risk: 'HIGH'
    },
    {
        id: 'driver-005',
        userId: 'user-005',
        user: users[4],
        licenseNumber: 'D5678901',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 3).toISOString(),
        totalDutyHours: 6,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'MEDIUM',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 6).toISOString(),
        risk: 'MEDIUM'
    },
    {
        id: 'driver-006',
        userId: 'user-006',
        user: users[5],
        licenseNumber: 'D6789012',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 8).toISOString(),
        totalDutyHours: 2,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'LOW',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 2).toISOString(),
        risk: 'LOW'
    },
    {
        id: 'driver-007',
        userId: 'user-007',
        user: users[6],
        licenseNumber: 'D7890123',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 5).toISOString(),
        totalDutyHours: 0,
        currentStatus: 'OFF_DUTY',
        fatigueLevel: 'LOW',
        risk: 'LOW'
    },
    {
        id: 'driver-008',
        userId: 'user-008',
        user: users[7],
        licenseNumber: 'D8901234',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 9).toISOString(),
        totalDutyHours: 7,
        currentStatus: 'ON_DUTY',
        fatigueLevel: 'MEDIUM',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 7).toISOString(),
        risk: 'MEDIUM'
    },
    {
        id: 'driver-009',
        userId: 'user-009',
        user: users[8],
        licenseNumber: 'D9012345',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 1).toISOString(),
        totalDutyHours: 9,
        currentStatus: 'ON_TRIP',
        fatigueLevel: 'HIGH',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 9).toISOString(),
        risk: 'HIGH'
    },
    {
        id: 'driver-010',
        userId: 'user-010',
        user: users[9],
        licenseNumber: 'D0123456',
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 2).toISOString(),
        totalDutyHours: 1,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'LOW',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 1).toISOString(),
        risk: 'LOW'
    },
    {
        id: 'driver-011',
        userId: 'user-011',
        licenseNumber: 'D1123456',
        user: users[10],
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 3).toISOString(),
        totalDutyHours: 5,
        currentStatus: 'ON_DUTY',
        fatigueLevel: 'MEDIUM',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 5).toISOString(),
        risk: 'MEDIUM'
    },
    {
        id: 'driver-012',
        userId: 'user-012',
        licenseNumber: 'D1223456',
        user: users[11],
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(new Date(), 5).toISOString(),
        totalDutyHours: 0,
        currentStatus: 'OFF_DUTY',
        fatigueLevel: 'LOW',
        risk: 'LOW'
    },
    {
        id: 'driver-013',
        userId: 'user-013',
        licenseNumber: 'D1323456',
        user: users[12],
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 7).toISOString(),
        totalDutyHours: 10,
        currentStatus: 'ON_DUTY',
        fatigueLevel: 'HIGH',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 10).toISOString(),
        risk: 'HIGH'
    },
    {
        id: 'driver-014',
        userId: 'user-014',
        licenseNumber: 'D1423456',
        user: users[13],
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addMonths$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addMonths"])(new Date(), 11).toISOString(),
        totalDutyHours: 3,
        currentStatus: 'AVAILABLE',
        fatigueLevel: 'LOW',
        dutyStartTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 3).toISOString(),
        risk: 'LOW'
    },
    {
        id: 'driver-015',
        userId: 'user-015',
        licenseNumber: 'D1523456',
        user: users[14],
        licenseExpiry: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$addYears$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addYears"])(new Date(), 4).toISOString(),
        totalDutyHours: 0,
        currentStatus: 'OFF_DUTY',
        fatigueLevel: 'LOW',
        risk: 'LOW'
    }
].map((d, i)=>{
    var _vehicles_find;
    return {
        ...d,
        vehicle: vehicles.find((v)=>v.driverId === d.id),
        vehicleId: (_vehicles_find = vehicles.find((v)=>v.driverId === d.id)) === null || _vehicles_find === void 0 ? void 0 : _vehicles_find.id,
        risk: riskLevels[i % riskLevels.length]
    };
});
vehicles = vehicles.map((v)=>({
        ...v,
        driver: drivers.find((d)=>d.id === v.driverId)
    }));
const now = new Date();
let trips = [
    {
        id: 'trip-001',
        jobId: 'JOB-9A4B1C',
        type: 'PASSENGER',
        status: 'POB',
        pickupLocation: {
            lat: 24.9876,
            lng: 46.6243,
            address: 'King Khalid International Airport, Riyadh'
        },
        dropoffLocation: {
            lat: 24.7136,
            lng: 46.6753,
            address: 'Kingdom Centre, Riyadh'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(now, 2)),
        vehicleId: 'vehicle-001',
        driverId: 'driver-001',
        distance: 35,
        fare: 120.50,
        estimatedDuration: 0
    },
    {
        id: 'trip-002',
        jobId: 'JOB-8D7E6F',
        type: 'SHIPMENT',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 21.4225,
            lng: 39.8262,
            address: 'Jeddah Islamic Port'
        },
        dropoffLocation: {
            lat: 21.5433,
            lng: 39.1728,
            address: 'Al-Balad Warehouse, Jeddah'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(now, 4)),
        completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(now, 2)),
        vehicleId: 'vehicle-003',
        driverId: 'driver-005',
        distance: 55,
        fare: 450.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-003',
        jobId: 'JOB-7G6H5I',
        type: 'PASSENGER',
        status: 'PENDING',
        pickupLocation: {
            lat: 21.6167,
            lng: 39.1500,
            address: 'Red Sea Mall, Jeddah'
        },
        dropoffLocation: {
            lat: 21.4858,
            lng: 39.1925,
            address: 'Jeddah Corniche'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(now, -2)),
        vehicleId: 'vehicle-005',
        driverId: 'driver-010',
        distance: 12,
        fare: 45.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-004',
        jobId: 'JOB-6J5K4L',
        type: 'EQUIPMENT',
        status: 'AT_WORK',
        pickupLocation: {
            lat: 26.4333,
            lng: 50.1167,
            address: 'Dammam Industrial City 2'
        },
        dropoffLocation: {
            lat: 26.3986,
            lng: 50.2083,
            address: 'KFUPM, Dhahran'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(now, -3)),
        vehicleId: 'vehicle-006',
        driverId: 'driver-009',
        distance: 30,
        fare: 750.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-005',
        jobId: 'JOB-5L4M3N',
        type: 'PASSENGER',
        status: 'CANCELLED',
        pickupLocation: {
            lat: 24.6877,
            lng: 46.7219,
            address: 'Riyadh Park Mall'
        },
        dropoffLocation: {
            lat: 24.7136,
            lng: 46.6753,
            address: 'Al-Masmak Fortress, Riyadh'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 1)),
        vehicleId: 'vehicle-007',
        driverId: 'driver-008',
        distance: 15,
        fare: 55.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-006',
        jobId: 'JOB-4N3O2P',
        type: 'SHIPMENT',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 21.3891,
            lng: 39.8579,
            address: 'Makkah Industrial Area'
        },
        dropoffLocation: {
            lat: 21.4225,
            lng: 39.8262,
            address: 'Abraj Al-Bait, Makkah'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 1)),
        completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 1)),
        vehicleId: 'vehicle-011',
        driverId: 'driver-013',
        distance: 25,
        fare: 600.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-007',
        jobId: 'JOB-3P2Q1R',
        type: 'PASSENGER',
        status: 'ON_ROUTE',
        pickupLocation: {
            lat: 24.6333,
            lng: 46.7167,
            address: 'Diriyah, Riyadh'
        },
        dropoffLocation: {
            lat: 24.8033,
            lng: 46.7667,
            address: 'Riyadh Front'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(now, 1)),
        vehicleId: 'vehicle-008',
        driverId: 'driver-004',
        distance: 28,
        fare: 95.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-008',
        jobId: 'JOB-2R1S0T',
        type: 'PASSENGER',
        status: 'PENDING',
        pickupLocation: {
            lat: 21.6167,
            lng: 39.1500,
            address: 'Mall of Arabia, Jeddah'
        },
        dropoffLocation: {
            lat: 21.5433,
            lng: 39.1728,
            address: 'Jeddah Waterfront'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(now, -4)),
        vehicleId: 'vehicle-012',
        driverId: 'driver-014',
        distance: 18,
        fare: 65.00,
        estimatedDuration: 0
    },
    // Add more trips with recent completedAt dates
    {
        id: 'trip-009',
        jobId: 'JOB-1S0T9U',
        type: 'SHIPMENT',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 26.4207,
            lng: 50.0888,
            address: 'Dammam Port'
        },
        dropoffLocation: {
            lat: 26.3986,
            lng: 50.2083,
            address: 'Al Khobar Warehouse'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 2)),
        completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 2)),
        vehicleId: 'vehicle-015',
        driverId: 'driver-006',
        distance: 45,
        fare: 500.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-010',
        jobId: 'JOB-0T9U8V',
        type: 'PASSENGER',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 24.7136,
            lng: 46.6753,
            address: 'Kingdom Centre, Riyadh'
        },
        dropoffLocation: {
            lat: 24.6877,
            lng: 46.7219,
            address: 'Riyadh Park Mall'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 3)),
        completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 3)),
        vehicleId: 'vehicle-002',
        driverId: 'driver-002',
        distance: 15,
        fare: 60.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-011',
        jobId: 'JOB-9U8V7W',
        type: 'PASSENGER',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 24.7136,
            lng: 46.6753,
            address: 'Riyadh Gallery Mall'
        },
        dropoffLocation: {
            lat: 24.7742,
            lng: 46.7386,
            address: 'KAFD, Riyadh'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 4)),
        completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 4)),
        vehicleId: 'vehicle-001',
        driverId: 'driver-001',
        distance: 10,
        fare: 40.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-012',
        jobId: 'JOB-8V7W6X',
        type: 'PASSENGER',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 21.4858,
            lng: 39.1925,
            address: 'Jeddah Airport'
        },
        dropoffLocation: {
            lat: 21.4225,
            lng: 39.8262,
            address: 'Al-Haram, Mecca'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 5)),
        completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 5)),
        vehicleId: 'vehicle-007',
        driverId: 'driver-008',
        distance: 95,
        fare: 250.00,
        estimatedDuration: 0
    },
    {
        id: 'trip-013',
        jobId: 'JOB-7W6X5Y',
        type: 'SHIPMENT',
        status: 'COMPLETED',
        pickupLocation: {
            lat: 24.7136,
            lng: 46.6753,
            address: 'Riyadh Dry Port'
        },
        dropoffLocation: {
            lat: 26.4207,
            lng: 50.0888,
            address: 'Dammam Industrial City'
        },
        scheduledAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 6)),
        completedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subDays"])(now, 6)),
        vehicleId: 'vehicle-006',
        driverId: 'driver-009',
        distance: 410,
        fare: 1800.00,
        estimatedDuration: 0
    }
].map((trip)=>({
        ...trip,
        vehicle: vehicles.find((v)=>v.id === trip.vehicleId),
        driver: drivers.find((d)=>d.id === trip.driverId),
        estimatedDuration: trip.distance ? Math.round(trip.distance * 2.5) : 0
    }));
const dailyTripStats = {
    docId: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(new Date(), 'yyyy-MM-dd'),
    counts: {
        PREMIUM_SEDAN: 1,
        TRUCK_5T: 1,
        // SEDAN: 0, trip-003 is pending, not active
        TRUCK_10T: 1,
        // SUV: 0, trip-005 was cancelled, not active
        // TRUCK_15T: 0, trip-006 completed yesterday
        LUXURY_CAR: 1
    }
};
const conversations = [
    {
        id: 'conv-001',
        contactName: 'Passenger JOB-9A4B1C',
        contactType: 'Passenger',
        lastMessage: 'Thank you for the ride!',
        lastMessageTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 5)),
        isUnread: false,
        messages: [
            {
                id: 'msg-1-1',
                sender: 'other',
                content: 'Hi, I am at gate 3. Where are you?',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 15))
            },
            {
                id: 'msg-1-2',
                sender: 'me',
                content: 'On my way, will be there in 2 minutes. I am in a black Mercedes.',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 14))
            },
            {
                id: 'msg-1-3',
                sender: 'other',
                content: 'Great, see you soon.',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 13))
            },
            {
                id: 'msg-1-4',
                sender: 'other',
                content: 'Thank you for the ride!',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 5))
            }
        ]
    },
    {
        id: 'conv-002',
        contactName: 'Agent Saleh Al-Mansoori',
        contactType: 'Agent',
        lastMessage: 'Understood, proceeding to location.',
        lastMessageTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 22)),
        isUnread: true,
        messages: [
            {
                id: 'msg-2-1',
                sender: 'me',
                content: 'Saleh, please proceed to Dammam for an urgent pickup. Job ID: JOB-XJ5K8L',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 25))
            },
            {
                id: 'msg-2-2',
                sender: 'other',
                content: 'Understood, proceeding to location.',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 22))
            }
        ]
    },
    {
        id: 'conv-003',
        contactName: 'Shipper - Aramco',
        contactType: 'Shipper',
        lastMessage: 'We need 2 more flatbeds for tomorrow morning. Can you confirm?',
        lastMessageTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 1)),
        isUnread: true,
        messages: [
            {
                id: 'msg-3-1',
                sender: 'other',
                content: 'Hi, the container has been loaded. Your driver can depart.',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 2))
            },
            {
                id: 'msg-3-2',
                sender: 'me',
                content: 'Thank you for the update. We have informed the driver.',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 2))
            },
            {
                id: 'msg-3-3',
                sender: 'other',
                content: 'We need 2 more flatbeds for tomorrow morning. Can you confirm?',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subHours$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subHours"])(new Date(), 1))
            }
        ]
    },
    {
        id: 'conv-004',
        contactName: 'Driver Fatima Al-Jameel',
        contactType: 'Driver',
        lastMessage: 'My tire pressure is low, I need to find the nearest service station.',
        lastMessageTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 45)),
        isUnread: true,
        messages: [
            {
                id: 'msg-4-1',
                sender: 'other',
                content: 'My tire pressure is low, I need to find the nearest service station.',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 45))
            },
            {
                id: 'msg-4-2',
                sender: 'me',
                content: 'Acknowledged. Sending you location of a nearby approved vendor.',
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$formatISO$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatISO"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subMinutes$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subMinutes"])(new Date(), 44))
            }
        ]
    }
].map((c)=>{
    var _c_messages_;
    return {
        ...c,
        isUnread: ((_c_messages_ = c.messages[c.messages.length - 1]) === null || _c_messages_ === void 0 ? void 0 : _c_messages_.sender) === 'other'
    };
});
const allDrivers = drivers;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/vehicles-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVehiclesStore",
    ()=>useVehiclesStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-client] (ecmascript)");
"use client";
;
;
const useVehiclesStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set)=>({
        vehicles: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vehicles"],
        addVehicle: (newVehicle)=>set((state)=>({
                    vehicles: [
                        newVehicle,
                        ...state.vehicles
                    ]
                })),
        updateVehicle: (updatedVehicle)=>set((state)=>({
                    vehicles: state.vehicles.map((vehicle)=>vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle)
                })),
        removeVehicle: (vehicleId)=>set((state)=>({
                    vehicles: state.vehicles.filter((vehicle)=>vehicle.id !== vehicleId)
                }))
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/store/trips-store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTripsStore",
    ()=>useTripsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-client] (ecmascript)");
"use client";
;
;
const useTripsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["create"])((set)=>({
        trips: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trips"],
        updateTrip: (updatedTrip)=>set((state)=>({
                    trips: state.trips.map((trip)=>trip.id === updatedTrip.id ? updatedTrip : trip)
                })),
        addTrip: (newTrip)=>set((state)=>({
                    trips: [
                        newTrip,
                        ...state.trips
                    ]
                }))
    }));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/popover.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Popover",
    ()=>Popover,
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
            lineNumber: 17,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/popover.tsx",
        lineNumber: 16,
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
        lineNumber: 22,
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
                lineNumber: 38,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg", "max-h-[90vh] flex flex-col", className),
                ...props,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-grow overflow-y-auto",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 48,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Close"], {
                        className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 52,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "sr-only",
                                children: "Close"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/dialog.tsx",
                                lineNumber: 53,
                                columnNumber: 9
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/dialog.tsx",
                        lineNumber: 51,
                        columnNumber: 7
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/dialog.tsx",
                lineNumber: 39,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dialog.tsx",
        lineNumber: 37,
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
        lineNumber: 64,
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
        lineNumber: 78,
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
        lineNumber: 92,
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
        lineNumber: 107,
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
"[project]/src/components/ui/command.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Command",
    ()=>Command,
    "CommandDialog",
    ()=>CommandDialog,
    "CommandEmpty",
    ()=>CommandEmpty,
    "CommandGroup",
    ()=>CommandGroup,
    "CommandInput",
    ()=>CommandInput,
    "CommandItem",
    ()=>CommandItem,
    "CommandList",
    ()=>CommandList,
    "CommandSeparator",
    ()=>CommandSeparator,
    "CommandShortcut",
    ()=>CommandShortcut
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/cmdk/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const Command = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 16,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c = Command;
Command.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].displayName;
const CommandDialog = (param)=>{
    let { children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "overflow-hidden p-0 shadow-lg",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Command, {
                className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/ui/command.tsx",
                lineNumber: 33,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/components/ui/command.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = CommandDialog;
const CommandInput = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center border-b px-3",
        "cmdk-input-wrapper": "",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                className: "mr-2 h-4 w-4 shrink-0 opacity-50"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/command.tsx",
                lineNumber: 46,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Input, {
                ref: ref,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", className),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/command.tsx",
                lineNumber: 47,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 45,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = CommandInput;
CommandInput.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Input.displayName;
const CommandList = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].List, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 64,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c5 = CommandList;
CommandList.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].List.displayName;
const CommandEmpty = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = (props, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Empty, {
        ref: ref,
        className: "py-6 text-center text-sm",
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 77,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
_c7 = CommandEmpty;
CommandEmpty.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Empty.displayName;
const CommandGroup = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Group, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 90,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c9 = CommandGroup;
CommandGroup.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Group.displayName;
const CommandSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Separator, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("-mx-1 h-px bg-border", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 106,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c11 = CommandSeparator;
CommandSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Separator.displayName;
const CommandItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c12 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Item, {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 118,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c13 = CommandItem;
CommandItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$cmdk$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"].Item.displayName;
const CommandShortcut = (param)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("ml-auto text-xs tracking-widest text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/command.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c14 = CommandShortcut;
CommandShortcut.displayName = "CommandShortcut";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11, _c12, _c13, _c14;
__turbopack_context__.k.register(_c, "Command");
__turbopack_context__.k.register(_c1, "CommandDialog");
__turbopack_context__.k.register(_c2, "CommandInput$React.forwardRef");
__turbopack_context__.k.register(_c3, "CommandInput");
__turbopack_context__.k.register(_c4, "CommandList$React.forwardRef");
__turbopack_context__.k.register(_c5, "CommandList");
__turbopack_context__.k.register(_c6, "CommandEmpty$React.forwardRef");
__turbopack_context__.k.register(_c7, "CommandEmpty");
__turbopack_context__.k.register(_c8, "CommandGroup$React.forwardRef");
__turbopack_context__.k.register(_c9, "CommandGroup");
__turbopack_context__.k.register(_c10, "CommandSeparator$React.forwardRef");
__turbopack_context__.k.register(_c11, "CommandSeparator");
__turbopack_context__.k.register(_c12, "CommandItem$React.forwardRef");
__turbopack_context__.k.register(_c13, "CommandItem");
__turbopack_context__.k.register(_c14, "CommandShortcut");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/ai/flows/data:728dbb [app-client] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"60142c323b0c6483d8bcffe79428564214370d88ec":"forecastNextTrip"},"src/ai/flows/forecast-next-trip.ts",""] */ __turbopack_context__.s([
    "forecastNextTrip",
    ()=>forecastNextTrip
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-client] (ecmascript)");
"use turbopack no side effects";
;
var forecastNextTrip = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createServerReference"])("60142c323b0c6483d8bcffe79428564214370d88ec", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["findSourceMapURL"], "forecastNextTrip"); //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vZm9yZWNhc3QtbmV4dC10cmlwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJztcbi8qKlxuICogQGZpbGVPdmVydmlldyBBbiBBSSBhZ2VudCB0byBmb3JlY2FzdCB0aGUgbmV4dCBvcHRpbWFsIHRyaXAgZm9yIGEgdmVoaWNsZS5cbiAqXG4gKiAtIGZvcmVjYXN0TmV4dFRyaXAgLSBBIGZ1bmN0aW9uIHRoYXQgdGFrZXMgYSB2ZWhpY2xlIGFuZCBhIGxpc3Qgb2YgcGVuZGluZyBqb2JzIGFuZCBzdWdnZXN0cyB0aGUgYmVzdCBuZXh0IHRyaXAuXG4gKiAtIEZvcmVjYXN0TmV4dFRyaXBJbnB1dCAtIFRoZSBpbnB1dCB0eXBlIGZvciB0aGUgZm9yZWNhc3ROZXh0VHJpcCBmdW5jdGlvbi5cbiAqIC0gRm9yZWNhc3ROZXh0VHJpcE91dHB1dCAtIFRoZSByZXR1cm4gdHlwZSBmb3IgdGhlIGZvcmVjYXN0TmV4dFRyaXAgZnVuY3Rpb24uXG4gKi9cblxuaW1wb3J0IHthaX0gZnJvbSAnQC9haS9nZW5raXQnO1xuaW1wb3J0IHt6fSBmcm9tICdnZW5raXQnO1xuaW1wb3J0IHsgVmVoaWNsZSwgVHJpcCB9IGZyb20gJ0AvbGliL3R5cGVzJztcbmltcG9ydCB7IHRyaXBzIGFzIGFsbFRyaXBzIH0gZnJvbSAnQC9saWIvZGF0YSc7XG5cbmNvbnN0IEZvcmVjYXN0TmV4dFRyaXBJbnB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgdmVoaWNsZTogei5hbnkoKS5kZXNjcmliZShcIlRoZSB2ZWhpY2xlIHRoYXQgaXMgY29tcGxldGluZyBpdHMgY3VycmVudCB0cmlwLlwiKSxcbiAgY3VycmVudFRyaXA6IHouYW55KCkuZGVzY3JpYmUoXCJUaGUgY3VycmVudCB0cmlwIHRoZSB2ZWhpY2xlIGlzIG9uLlwiKSxcbiAgcGVuZGluZ1RyaXBzOiB6LmFycmF5KHouYW55KCkpLmRlc2NyaWJlKFwiQSBsaXN0IG9mIGFsbCBhdmFpbGFibGUgam9icyB0aGF0IGFyZSBub3QgeWV0IGFzc2lnbmVkLlwiKSxcbn0pO1xuZXhwb3J0IHR5cGUgRm9yZWNhc3ROZXh0VHJpcElucHV0ID0gei5pbmZlcjx0eXBlb2YgRm9yZWNhc3ROZXh0VHJpcElucHV0U2NoZW1hPjtcblxuY29uc3QgRm9yZWNhc3ROZXh0VHJpcE91dHB1dFNjaGVtYSA9IHoub2JqZWN0KHtcbiAgbmV4dEpvYklkOiB6LnN0cmluZygpLm9wdGlvbmFsKCkuZGVzY3JpYmUoJ1RoZSBJRCBvZiB0aGUgc3VnZ2VzdGVkIG5leHQgam9iLiBDYW4gYmUgbnVsbCBpZiBubyBzdWl0YWJsZSBqb2IgaXMgZm91bmQuJyksXG4gIHJlYXNvbmluZzogei5zdHJpbmcoKS5kZXNjcmliZSgnQSBkZXRhaWxlZCBleHBsYW5hdGlvbiBmb3IgdGhlIHN1Z2dlc3Rpb24sIGZvY3VzaW5nIG9uIGhvdyBpdCBtaW5pbWl6ZXMgZGVhZCBraWxvbWV0ZXJzIGFuZCBtZWV0cyBqb2IgcmVxdWlyZW1lbnRzLicpLFxuICBkaXN0YW5jZVRvTmV4dFBpY2t1cDogei5udW1iZXIoKS5vcHRpb25hbCgpLmRlc2NyaWJlKCdUaGUgZGlzdGFuY2UgaW4ga2lsb21ldGVycyBmcm9tIHRoZSBjdXJyZW50IGRyb3Atb2ZmIHBvaW50IHRvIHRoZSBuZXh0IHBpY2t1cCBwb2ludC4nKSxcbn0pO1xuZXhwb3J0IHR5cGUgRm9yZWNhc3ROZXh0VHJpcE91dHB1dCA9IHouaW5mZXI8dHlwZW9mIEZvcmVjYXN0TmV4dFRyaXBPdXRwdXRTY2hlbWE+O1xuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmb3JlY2FzdE5leHRUcmlwKHZlaGljbGU6IFZlaGljbGUsIGN1cnJlbnRUcmlwOiBUcmlwKTogUHJvbWlzZTxGb3JlY2FzdE5leHRUcmlwT3V0cHV0PiB7XG4gICAgY29uc3QgcGVuZGluZ1RyaXBzID0gYWxsVHJpcHMuZmlsdGVyKHQgPT4gdC5zdGF0dXMgPT09ICdQRU5ESU5HJyk7XG4gICAgXG4gICAgY29uc3QgaW5wdXQ6IEZvcmVjYXN0TmV4dFRyaXBJbnB1dCA9IHtcbiAgICAgICAgdmVoaWNsZSxcbiAgICAgICAgY3VycmVudFRyaXAsXG4gICAgICAgIHBlbmRpbmdUcmlwc1xuICAgIH07XG4gICAgcmV0dXJuIGZvcmVjYXN0TmV4dFRyaXBGbG93KGlucHV0KTtcbn1cblxuXG5jb25zdCBwcm9tcHQgPSBhaS5kZWZpbmVQcm9tcHQoe1xuICBuYW1lOiAnZm9yZWNhc3ROZXh0VHJpcFByb21wdCcsXG4gIGlucHV0OiB7c2NoZW1hOiBGb3JlY2FzdE5leHRUcmlwSW5wdXRTY2hlbWF9LFxuICBvdXRwdXQ6IHtzY2hlbWE6IEZvcmVjYXN0TmV4dFRyaXBPdXRwdXRTY2hlbWF9LFxuICBwcm9tcHQ6IGBZb3UgYXJlIGFuIEFJIGxvZ2lzdGljcyBleHBlcnQuIFlvdXIgdGFzayBpcyB0byBmb3JlY2FzdCB0aGUgbmV4dCBvcHRpbWFsIGpvYiBmb3IgYSB2ZWhpY2xlIHRoYXQgaXMgYWJvdXQgdG8gY29tcGxldGUgaXRzIGN1cnJlbnQgdHJpcC4gVGhlIHByaW1hcnkgZ29hbCBpcyB0byBtaW5pbWl6ZSBcImRlYWQga2lsb21ldGVyc1wiIOKAkyB0aGUgZGlzdGFuY2UgdHJhdmVsZWQgZW1wdHkgdG8gdGhlIG5leHQgcGlja3VwIGxvY2F0aW9uLlxuXG5DdXJyZW50IFZlaGljbGU6XG4tIElEOiB7e3t2ZWhpY2xlLmlkfX19XG4tIFR5cGU6IHt7e3ZlaGljbGUudHlwZX19fVxuLSBDdXJyZW50IFRyaXAgRHJvcC1vZmYgTG9jYXRpb246IExhdDoge3t7Y3VycmVudFRyaXAuZHJvcG9mZkxvY2F0aW9uLmxhdH19fSwgTG5nOiB7e3tjdXJyZW50VHJpcC5kcm9wb2ZmTG9jYXRpb24ubG5nfX19XG5cbkFuYWx5emUgdGhlIGxpc3Qgb2YgcGVuZGluZyBqb2JzIGJlbG93IGFuZCByZWNvbW1lbmQgdGhlIGJlc3Qgb25lIGZvciB0aGlzIHZlaGljbGUgdG8gdGFrZSBvbiBuZXh0LlxuXG5BdmFpbGFibGUgUGVuZGluZyBKb2JzOlxue3sjZWFjaCBwZW5kaW5nVHJpcHN9fVxuLSBKb2IgSUQ6IHt7e3RoaXMuam9iSWR9fX1cbiAgLSBQaWNrdXAgTG9jYXRpb246IExhdDoge3t7dGhpcy5waWNrdXBMb2NhdGlvbi5sYXR9fX0sIExuZzoge3t7dGhpcy5waWNrdXBMb2NhdGlvbi5sbmd9fX1cbiAgLSBSZXF1aXJlZCBWZWhpY2xlIFR5cGU6IHt7e3RoaXMudHlwZX19fSAobWF0Y2hlcyB2ZWhpY2xlIGNhdGVnb3J5OiB7e3RoaXMudmVoaWNsZS5jYXRlZ29yeX19KVxue3svZWFjaH19XG5cbllvdXIgcmVjb21tZW5kYXRpb24gbXVzdCBjb25zaWRlcjpcbjEuICAqKlByb3hpbWl0eToqKiBUaGUgY2hvc2VuIGpvYidzIHBpY2t1cCBsb2NhdGlvbiBtdXN0IGJlIGFzIGNsb3NlIGFzIHBvc3NpYmxlIHRvIHRoZSBjdXJyZW50IHRyaXAncyBkcm9wLW9mZiBsb2NhdGlvbi5cbjIuICAqKlZlaGljbGUgQ29tcGF0aWJpbGl0eToqKiBUaGUgdmVoaWNsZSB0eXBlIG11c3QgYmUgc3VpdGFibGUgZm9yIHRoZSBqb2IgKGUuZy4sIGEgcGFzc2VuZ2VyIHZlaGljbGUgZm9yIGEgcGFzc2VuZ2VyIHRyaXApLlxuMy4gICoqRWZmaWNpZW5jeToqKiBFeHBsYWluIHdoeSB0aGUgY2hvc2VuIGpvYiBpcyB0aGUgbW9zdCBlZmZpY2llbnQgbmV4dCBzdGVwLlxuXG5JZiBubyBzdWl0YWJsZSBqb2JzIGFyZSBhdmFpbGFibGUgKGUuZy4sIG5vbmUgYXJlIG5lYXJieSBvciBjb21wYXRpYmxlKSwgc3RhdGUgdGhhdCBhbmQgbGVhdmUgdGhlIG5leHRKb2JJZCBhcyBudWxsLlxuXG5DYWxjdWxhdGUgdGhlIGRpc3RhbmNlIHRvIHRoZSBuZXh0IHBpY2t1cCBhbmQgcHJvdmlkZSB5b3VyIHJlYXNvbmluZy5cbmAsXG59KTtcblxuY29uc3QgZm9yZWNhc3ROZXh0VHJpcEZsb3cgPSBhaS5kZWZpbmVGbG93KFxuICB7XG4gICAgbmFtZTogJ2ZvcmVjYXN0TmV4dFRyaXBGbG93JyxcbiAgICBpbnB1dFNjaGVtYTogRm9yZWNhc3ROZXh0VHJpcElucHV0U2NoZW1hLFxuICAgIG91dHB1dFNjaGVtYTogRm9yZWNhc3ROZXh0VHJpcE91dHB1dFNjaGVtYSxcbiAgfSxcbiAgYXN5bmMgaW5wdXQgPT4ge1xuICAgIC8vIEluIGEgcmVhbCBhcHBsaWNhdGlvbiwgeW91IHdvdWxkIGNhbGN1bGF0ZSByZWFsIGRpc3RhbmNlcyBiZXR3ZWVuIGNvb3JkaW5hdGVzLlxuICAgIC8vIEZvciB0aGlzIHNpbXVsYXRpb24sIHdlJ2xsIGxldCB0aGUgQUkgaW5mZXIgYmFzZWQgb24gdGhlIHByb3ZpZGVkIGxhdC9sbmcuXG4gICAgY29uc3Qge291dHB1dH0gPSBhd2FpdCBwcm9tcHQoaW5wdXQpO1xuICAgIHJldHVybiBvdXRwdXQhO1xuICB9XG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI0U0E2QnNCIn0=
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/alert.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Alert",
    ()=>Alert,
    "AlertDescription",
    ()=>AlertDescription,
    "AlertTitle",
    ()=>AlertTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const alertVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground", {
    variants: {
        variant: {
            default: "bg-background text-foreground",
            destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
const Alert = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, variant, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: "alert",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(alertVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert.tsx",
        lineNumber: 26,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Alert;
Alert.displayName = "Alert";
const AlertTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h5", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mb-1 font-medium leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert.tsx",
        lineNumber: 39,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = AlertTitle;
AlertTitle.displayName = "AlertTitle";
const AlertDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm [&_p]:leading-relaxed", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/alert.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c5 = AlertDescription;
AlertDescription.displayName = "AlertDescription";
;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Alert$React.forwardRef");
__turbopack_context__.k.register(_c1, "Alert");
__turbopack_context__.k.register(_c2, "AlertTitle$React.forwardRef");
__turbopack_context__.k.register(_c3, "AlertTitle");
__turbopack_context__.k.register(_c4, "AlertDescription$React.forwardRef");
__turbopack_context__.k.register(_c5, "AlertDescription");
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
"[project]/src/components/tracking/driver-card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DriverCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/tracking-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/separator.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsUpDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevrons-up-down.js [app-client] (ecmascript) <export default as ChevronsUpDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$vehicles$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/vehicles-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$trips$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/trips-store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/popover.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/command.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$728dbb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/ai/flows/data:728dbb [app-client] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/alert.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
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
function DriverCard(param) {
    let {} = param;
    var _selectedVehicle_driver, _selectedVehicle_driver1;
    _s();
    const { selectedVehicle, selectVehicle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrackingStore"])();
    const { vehicles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$vehicles$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVehiclesStore"])();
    const { trips } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$trips$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTripsStore"])();
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeVehicles, setActiveVehicles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isForecasting, setIsForecasting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [forecast, setForecast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const jobId = searchParams.get('jobId');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverCard.useEffect": ()=>{
            const filterAndSetVehicles = {
                "DriverCard.useEffect.filterAndSetVehicles": ()=>{
                    // If a jobId is present, we only want to see available vehicles. Otherwise, show all active.
                    const filtered = vehicles.filter({
                        "DriverCard.useEffect.filterAndSetVehicles.filtered": (vehicle)=>{
                            const hasActiveDriver = vehicle.driver && [
                                'ON_DUTY',
                                'AVAILABLE',
                                'ON_TRIP'
                            ].includes(vehicle.driver.currentStatus);
                            if (jobId) {
                                return vehicle.status === 'AVAILABLE' && hasActiveDriver;
                            }
                            return vehicle.status !== 'OUT_OF_SERVICE' && hasActiveDriver;
                        }
                    }["DriverCard.useEffect.filterAndSetVehicles.filtered"]);
                    setActiveVehicles(filtered);
                }
            }["DriverCard.useEffect.filterAndSetVehicles"];
            filterAndSetVehicles();
            const intervalId = setInterval(filterAndSetVehicles, 60000);
            return ({
                "DriverCard.useEffect": ()=>clearInterval(intervalId)
            })["DriverCard.useEffect"];
        }
    }["DriverCard.useEffect"], [
        jobId,
        vehicles
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DriverCard.useEffect": ()=>{
            // When the selected vehicle changes, clear any previous forecast.
            setForecast(null);
        }
    }["DriverCard.useEffect"], [
        selectedVehicle
    ]);
    const handleSelectVehicle = (vehicleId)=>{
        const foundVehicle = vehicles.find((v)=>v.id === vehicleId);
        if (foundVehicle) {
            selectVehicle(foundVehicle);
            toast({
                title: "Vehicle Found",
                description: "Now viewing ".concat(foundVehicle.plateNumber, ".")
            });
            setOpen(false);
        } else {
            toast({
                variant: "destructive",
                title: "Not Found",
                description: "No vehicle found for the selected ID."
            });
        }
    };
    const handleAssignJob = ()=>{
        if (!selectedVehicle || !selectedVehicle.driver) {
            toast({
                variant: 'destructive',
                title: 'Cannot Assign Job',
                description: 'No driver is associated with this vehicle.'
            });
            return;
        }
        if (!jobId) {
            toast({
                variant: 'destructive',
                title: 'No Job Specified',
                description: 'Cannot assign a job without a Job ID.'
            });
            return;
        }
        const currentParams = new URLSearchParams(Array.from(searchParams.entries()));
        currentParams.set('driverId', selectedVehicle.driver.id);
        currentParams.set('vehicleId', selectedVehicle.id);
        // Navigate back to the dispatch page with all the necessary info
        router.push("/dashboard/dispatch?".concat(currentParams.toString()));
    };
    const handleForecast = async ()=>{
        if (!selectedVehicle || !selectedVehicle.driver) return;
        const currentTrip = trips.find((t)=>t.driverId === (selectedVehicle === null || selectedVehicle === void 0 ? void 0 : selectedVehicle.driverId) && t.status !== 'COMPLETED' && t.status !== 'CANCELLED');
        if (!currentTrip) {
            toast({
                variant: 'destructive',
                title: 'No Active Trip',
                description: 'Cannot forecast without an active trip to complete first.'
            });
            return;
        }
        setIsForecasting(true);
        setForecast(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$ai$2f$flows$2f$data$3a$728dbb__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["forecastNextTrip"])(selectedVehicle, currentTrip);
            setForecast(result);
        } catch (e) {
            console.error(e);
            toast({
                variant: 'destructive',
                title: 'Forecasting Failed',
                description: 'The AI model could not generate a forecast.'
            });
        } finally{
            setIsForecasting(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 h-full flex flex-col",
        children: !selectedVehicle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col items-center justify-center h-full text-center p-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    className: "w-full max-w-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                    children: jobId ? 'Find & Assign Driver' : 'Find Vehicle'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 129,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                    children: jobId ? 'Select an available vehicle to assign this job to.' : 'Search by plate number, driver, or type.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 130,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 128,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popover"], {
                                open: open,
                                onOpenChange: setOpen,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            role: "combobox",
                                            "aria-expanded": open,
                                            className: "w-full justify-between",
                                            children: [
                                                selectedVehicle ? selectedVehicle.plateNumber : activeVehicles.length > 0 ? "Select from ".concat(activeVehicles.length, " vehicles...") : "No available vehicles",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$up$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsUpDown$3e$__["ChevronsUpDown"], {
                                                    className: "ml-2 h-4 w-4 shrink-0 opacity-50"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 137,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/tracking/driver-card.tsx",
                                        lineNumber: 136,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$popover$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PopoverContent"], {
                                        className: "w-[300px] p-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Command"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandInput"], {
                                                    placeholder: "Search vehicles..."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                    lineNumber: 151,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandList"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandEmpty"], {
                                                            children: "No vehicle found."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                            lineNumber: 153,
                                                            columnNumber: 33
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandGroup"], {
                                                            children: activeVehicles.map((vehicle)=>{
                                                                var _vehicle_driver, _vehicle_driver1;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$command$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CommandItem"], {
                                                                    value: "".concat(vehicle.plateNumber, " ").concat((_vehicle_driver = vehicle.driver) === null || _vehicle_driver === void 0 ? void 0 : _vehicle_driver.user.name, " ").concat(vehicle.type),
                                                                    onSelect: ()=>{
                                                                        handleSelectVehicle(vehicle.id);
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("mr-2 h-4 w-4", (selectedVehicle === null || selectedVehicle === void 0 ? void 0 : selectedVehicle.id) === vehicle.id ? "opacity-100" : "opacity-0")
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                                            lineNumber: 163,
                                                                            columnNumber: 41
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex flex-col",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: vehicle.plateNumber
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                                                    lineNumber: 170,
                                                                                    columnNumber: 45
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    className: "text-xs text-muted-foreground",
                                                                                    children: ((_vehicle_driver1 = vehicle.driver) === null || _vehicle_driver1 === void 0 ? void 0 : _vehicle_driver1.user.name) || 'Unassigned'
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                                                    lineNumber: 171,
                                                                                    columnNumber: 45
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                                            lineNumber: 169,
                                                                            columnNumber: 41
                                                                        }, this)
                                                                    ]
                                                                }, vehicle.id, true, {
                                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                                    lineNumber: 156,
                                                                    columnNumber: 37
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 33
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                    lineNumber: 152,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 150,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/tracking/driver-card.tsx",
                                        lineNumber: 149,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/tracking/driver-card.tsx",
                                lineNumber: 135,
                                columnNumber: 26
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 134,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                    lineNumber: 127,
                    columnNumber: 18
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 text-muted-foreground",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"], {
                            className: "h-12 w-12 mb-4 mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 183,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold",
                            children: "No Vehicle Selected"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 184,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: "Select a vehicle from the dropdown above to see its details."
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 185,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                    lineNumber: 182,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/tracking/driver-card.tsx",
            lineNumber: 126,
            columnNumber: 13
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                children: selectedVehicle.plateNumber
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                lineNumber: 194,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                                                children: selectedVehicle.type
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                lineNumber: 195,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/tracking/driver-card.tsx",
                                        lineNumber: 193,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        onClick: ()=>selectVehicle(undefined),
                                        children: "Clear Selection"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/tracking/driver-card.tsx",
                                        lineNumber: 197,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/tracking/driver-card.tsx",
                                lineNumber: 192,
                                columnNumber: 21
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 191,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Status:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                    lineNumber: 202,
                                                    columnNumber: 28
                                                }, this),
                                                " ",
                                                selectedVehicle.status
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 202,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: "Fuel:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                    lineNumber: 203,
                                                    columnNumber: 28
                                                }, this),
                                                " ",
                                                selectedVehicle.currentFuel,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 203,
                                            columnNumber: 25
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 201,
                                    columnNumber: 21
                                }, this),
                                selectedVehicle.driver && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 208,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-semibold mb-2",
                                                    children: "Driver Details"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm space-y-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "Name:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                                    lineNumber: 212,
                                                                    columnNumber: 40
                                                                }, this),
                                                                " ",
                                                                selectedVehicle.driver.user.name
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                            lineNumber: 212,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "Phone:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                                    lineNumber: 213,
                                                                    columnNumber: 40
                                                                }, this),
                                                                " ",
                                                                selectedVehicle.driver.user.phone || 'N/A'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 37
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: "Fatigue Level:"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                                    lineNumber: 214,
                                                                    columnNumber: 40
                                                                }, this),
                                                                " ",
                                                                selectedVehicle.driver.fatigueLevel
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                            lineNumber: 214,
                                                            columnNumber: 37
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                    lineNumber: 211,
                                                    columnNumber: 33
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 209,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$separator$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {}, void 0, false, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 220,
                                    columnNumber: 21
                                }, this),
                                jobId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "w-full",
                                    onClick: handleAssignJob,
                                    disabled: !selectedVehicle.driver,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 224,
                                            columnNumber: 29
                                        }, this),
                                        "Assign Job to Driver"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 223,
                                    columnNumber: 25
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            asChild: true,
                                            disabled: !((_selectedVehicle_driver = selectedVehicle.driver) === null || _selectedVehicle_driver === void 0 ? void 0 : _selectedVehicle_driver.user.phone),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "tel:".concat((_selectedVehicle_driver1 = selectedVehicle.driver) === null || _selectedVehicle_driver1 === void 0 ? void 0 : _selectedVehicle_driver1.user.phone),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        className: "mr-2 h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                        lineNumber: 231,
                                                        columnNumber: 33
                                                    }, this),
                                                    " Call"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                lineNumber: 230,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 229,
                                            columnNumber: 29
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            asChild: true,
                                            disabled: !selectedVehicle.driverId,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                href: "/dashboard/sms?driverId=".concat(selectedVehicle.driverId),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                                        className: "mr-2 h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                        lineNumber: 236,
                                                        columnNumber: 33
                                                    }, this),
                                                    " Message"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                lineNumber: 235,
                                                columnNumber: 29
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 234,
                                            columnNumber: 29
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 228,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 200,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                    lineNumber: 190,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-grow p-4 mt-4 border rounded-lg bg-muted/50",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "w-full mb-4",
                            onClick: handleForecast,
                            disabled: isForecasting,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                    className: "mr-2 h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 246,
                                    columnNumber: 21
                                }, this),
                                isForecasting ? "Forecasting..." : "Forecast Next Trip"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 245,
                            columnNumber: 18
                        }, this),
                        isForecasting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
                            className: "w-full h-24"
                        }, void 0, false, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 250,
                            columnNumber: 35
                        }, this),
                        forecast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Alert"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 254,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertTitle"], {
                                    children: "AI Recommendation"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 255,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDescription"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-2",
                                            children: forecast.reasoning
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 257,
                                            columnNumber: 29
                                        }, this),
                                        forecast.nextJobId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold",
                                            children: [
                                                "Suggested Next Job: ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-primary",
                                                    children: forecast.nextJobId
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                                    lineNumber: 259,
                                                    columnNumber: 82
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 259,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 256,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 253,
                            columnNumber: 22
                        }, this),
                        !forecast && !isForecasting && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center text-muted-foreground text-sm py-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                    className: "font-semibold mb-2 flex items-center justify-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "mr-2 h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                                            lineNumber: 267,
                                            columnNumber: 94
                                        }, this),
                                        " Activity Log"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 267,
                                    columnNumber: 26
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "No recent activity."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 268,
                                    columnNumber: 25
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4",
                                    children: 'Click "Forecast" to get an AI-powered job recommendation.'
                                }, void 0, false, {
                                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                                    lineNumber: 269,
                                    columnNumber: 25
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/tracking/driver-card.tsx",
                            lineNumber: 266,
                            columnNumber: 22
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/tracking/driver-card.tsx",
                    lineNumber: 244,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/tracking/driver-card.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_s(DriverCard, "AVUKHC91qRhYe9RJj+mwRUDaQHw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrackingStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$vehicles$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVehiclesStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$trips$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTripsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = DriverCard;
var _c;
__turbopack_context__.k.register(_c, "DriverCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/fleet/tracking/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TrackingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$tracking$2f$top$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/tracking/top-bar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$tracking$2f$driver$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/tracking/driver-card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/skeleton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/tracking-store.ts [app-client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
// Dynamically import the LeafletTrackingMap with SSR disabled. This is critical.
const LeafletTrackingMap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(()=>__turbopack_context__.A("[project]/src/components/map/leaflet-tracking-map.tsx [app-client] (ecmascript, next/dynamic entry, async loader)"), {
    loadableGenerated: {
        modules: [
            "[project]/src/components/map/leaflet-tracking-map.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    loading: ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
            className: "h-full w-full"
        }, void 0, false, {
            fileName: "[project]/src/app/fleet/tracking/page.tsx",
            lineNumber: 17,
            columnNumber: 20
        }, ("TURBOPACK compile-time value", void 0)),
    ssr: false
});
_c = LeafletTrackingMap;
function TrackingPageContent() {
    _s();
    const { selectedVehicle } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrackingStore"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const queryLat = searchParams.get('lat');
    const queryLng = searchParams.get('lng');
    const queryJobId = searchParams.get('jobId');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TrackingPageContent.useEffect": ()=>{
            const handleKeyDown = {
                "TrackingPageContent.useEffect.handleKeyDown": (event)=>{
                    // Don't navigate if the user is typing in an input, textarea, or contenteditable element
                    const target = event.target;
                    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
                        return;
                    }
                    if (event.key === 'Backspace' || event.key === 'ArrowLeft') {
                        // If there's a jobId, it means we are in assignment mode, so go back to dispatch
                        if (queryJobId) {
                            router.push('/dashboard/dispatch');
                        } else {
                            router.push('/dashboard');
                        }
                    }
                }
            }["TrackingPageContent.useEffect.handleKeyDown"];
            window.addEventListener('keydown', handleKeyDown);
            // Cleanup the event listener on component unmount
            return ({
                "TrackingPageContent.useEffect": ()=>{
                    window.removeEventListener('keydown', handleKeyDown);
                }
            })["TrackingPageContent.useEffect"];
        }
    }["TrackingPageContent.useEffect"], [
        router,
        queryJobId
    ]);
    // Memoize the center coordinates to prevent unnecessary re-renders of the map component.
    const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TrackingPageContent.useMemo[center]": ()=>{
            if (queryLat && queryLng) {
                const lat = parseFloat(queryLat);
                const lng = parseFloat(queryLng);
                if (!isNaN(lat) && !isNaN(lng)) {
                    return [
                        lat,
                        lng
                    ];
                }
            }
            return selectedVehicle ? [
                selectedVehicle.currentLocation.lat,
                selectedVehicle.currentLocation.lng
            ] : [
                24.7136,
                46.6753
            ]; // Default to Riyadh if no vehicle is selected
        }
    }["TrackingPageContent.useMemo[center]"], [
        selectedVehicle,
        queryLat,
        queryLng
    ]);
    const zoom = selectedVehicle || queryLat && queryLng ? 14 : 6;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$tracking$2f$top$2d$bar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/src/app/fleet/tracking/page.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeafletTrackingMap, {
                        vehicles: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["vehicles"],
                        center: center,
                        zoom: zoom
                    }, void 0, false, {
                        fileName: "[project]/src/app/fleet/tracking/page.tsx",
                        lineNumber: 82,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/fleet/tracking/page.tsx",
                lineNumber: 80,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "w-[360px] border-l bg-background hidden md:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$tracking$2f$driver$2d$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/fleet/tracking/page.tsx",
                    lineNumber: 86,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/fleet/tracking/page.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/fleet/tracking/page.tsx",
        lineNumber: 79,
        columnNumber: 5
    }, this);
}
_s(TrackingPageContent, "jG8QdCZIbg8BViACa334w0bLs7w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$tracking$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTrackingStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c1 = TrackingPageContent;
function TrackingPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skeleton"], {
            className: "h-screen w-screen"
        }, void 0, false, {
            fileName: "[project]/src/app/fleet/tracking/page.tsx",
            lineNumber: 95,
            columnNumber: 25
        }, void 0),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TrackingPageContent, {}, void 0, false, {
            fileName: "[project]/src/app/fleet/tracking/page.tsx",
            lineNumber: 96,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/fleet/tracking/page.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c2 = TrackingPage;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "LeafletTrackingMap");
__turbopack_context__.k.register(_c1, "TrackingPageContent");
__turbopack_context__.k.register(_c2, "TrackingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_ab1b58a4._.js.map