# Next.js App Router - Production Patterns

**Version**: Next.js 16.1.1
**React Version**: 19.2.3
**Node.js**: 20.9+
**Last Verified**: 2026-01-09

---

## Technical Core

### Next.js 16 App Router Best Practices
- **Async Route Parameters**: In Next.js 16, `params` and `searchParams` are now Promises and MUST be awaited or unwrapped using React's `use()` hook.
- **Cache Components**: Use the new `"use cache"` directive to explicitly cache Server Components and their data fetching.
- **Parallel Routes**: All parallel route segments (@folder) now REQUIRE a `default.js` or `default.tsx` file for consistent rendering across navigation.
- **Proxy Middleware**: Use `proxy.ts` (new in Next.js 16) for handling cross-origin requests and custom header injections, replacing certain legacy middleware patterns.

### Production Patterns
- **Caching Strategies**: Leverage `revalidateTag()`, `updateTag()`, and `refresh()` for granular cache invalidation.
- **Image Optimization**: Default image caching TTL is now more aggressive; use `minimumCacheTTL` in `next.config.ts` if needed.
- **Turbopack**: Use `--turbopack` for significantly faster development cycles (now stable and default in v16).

---

## When to Use This Skill
- Troubleshooting or migrating to Next.js 16.
- Addressing issues with async `params` or `searchParams`.
- Implementing advanced caching with the `"use cache"` directive.
- Setting up parallel or intercepted routes requiring `default.js`.

## When NOT to Use This Skill
- Legacy Pages Router applications.
- Deployment to Cloudflare Workers (use `cloudflare-nextjs` skill).
- General UI styling or component library integration.
