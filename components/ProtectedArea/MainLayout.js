function MainLayout({ children }) {
  return (
    // Set max width and paddings for all content on the pages in the protected area
    <main className="mx-auto max-w-2xl bg-white px-4 pt-10 pb-24 sm:px-6 sm:pt-12 sm:pb-32 lg:max-w-5xl lg:px-8 xl:max-w-6xl">
      {children}
    </main>
  );
}

export default MainLayout;
