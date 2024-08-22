const base_URL = "https://collections-management-server.onrender.com";

export const GET = async (api) => {
  try {
    const response = await fetch(`${base_URL}/${api}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || "Unknown error" };
    }
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error deleting collection:", error);
    return { success: false, message: error.message };
  }
};
