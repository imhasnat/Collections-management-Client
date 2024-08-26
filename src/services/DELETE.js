const base_URL = "http://localhost:3306";

export const DELETE = async (api) => {
  try {
    const response = await fetch(`${base_URL}/${api}`, {
      method: "DELETE",
      credentials: "include",
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
