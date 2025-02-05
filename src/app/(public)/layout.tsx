import Header from '@/components/Header';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-screen w-full grid-rows-[auto_1fr]">
      <Header />
      {children}
    </div>
  );
}
