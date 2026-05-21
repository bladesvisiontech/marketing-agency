// Root layout — locale-specific layout is in app/[locale]/layout.tsx
// This file satisfies Next.js requirement for a root layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
