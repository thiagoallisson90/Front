function Layout({ children }) {
  return (
    <>
      <div className="bg-gray-100 flex flex-col min-h-screen">{children}</div>
    </>
  );
}

export default Layout;
