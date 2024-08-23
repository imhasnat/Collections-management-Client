const base_URL = "https://collections-manage.netlify.app";

export const GET = async (api) => {
  try {
    const response = await fetch(`${base_URL}/${api}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return { success: false, message: error.message };
  }
};
