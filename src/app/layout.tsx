import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Today Movie",
  description: "오늘의 영화, 오늘 영화 뭐 볼까?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
