const base_URL = "https://collections-manage.netlify.app";

export const loginApi = async (formData) => {
  try {
    const response = await fetch(`${base_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      console.error("Login Failed", data.message || "Unknown Error");
      return { success: false, message: data.message || "Unknown Error" };
    }

    console.log("Login Successful:", data.message, data.user);
    return { success: true, message: data.message, user: data.user };
  } catch (error) {
    console.error("Login Failed", error.message);
    return { success: false, message: error.message };
  }
};
