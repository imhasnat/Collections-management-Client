const base_URL = "https://collections-management-server.onrender.com";

export const GET = async (api) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${base_URL}/${api}`, {
      method: "GET",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { success: false, message: error.message };
  }
};
