const base_URL = "https://collections-management-server.onrender.com";

export const POST = async (api, value) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${base_URL}/${api}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // credentials: "include",
      body: JSON.stringify(value),
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Failed:", data.message || "Unknown error");
      return { success: false, message: data.message || "Unknown error" };
    }
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error submitting:", error.message);
    return { success: false, message: error.message };
  }
};
