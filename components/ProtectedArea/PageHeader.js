function PageHeader({ children }) {
  return (
    <h2 className="flex items-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
      {children}
    </h2>
  );
}

export default PageHeader;
