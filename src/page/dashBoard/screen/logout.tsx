
const Logout = () => {
  const handleLogout = () => {
    // Logic to log out the user
    console.log("User logged out");
  };

  const handleCancel = () => {
    // Logic to cancel logout
    console.log("Logout canceled");
  };

  return (
    <div className="min-h-screen bg-[#191919] flex items-center justify-center">
      <div className="bg-[#0f0e0e] p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-text-colour text-2xl font-bold mb-4">Are you sure you want to log out?</h1>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-500 transition"
          >
            Log Out
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-700 text-text-colour px-6 py-2 rounded-md shadow-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
