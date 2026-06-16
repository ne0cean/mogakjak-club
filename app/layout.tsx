import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI모각작 사전설문",
  description: "AI 툴로 각자 해보고 싶은 작업을 진행하고 함께 나누는 모임",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
