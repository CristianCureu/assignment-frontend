export const calculateInitialRows = () => {
  const cardHeight = 50; // Approximate height of each card (you can tweak this value)
  const headerHeight = 64; // Height of your header (Navbar)
  const windowHeight = window.innerHeight;

  const availableHeight = windowHeight - headerHeight;
  const estimatedRowsPerPage = Math.floor(availableHeight / cardHeight);

  return estimatedRowsPerPage;
};
