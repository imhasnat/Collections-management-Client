const base_URL = "http://localhost:3306";

export const registerApi = async (formData) => {
  try {
    const response = await fetch(`${base_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();

    if (!response.ok) {
      console.error("Registration Failed:", data.message || "Unknown error");
      return { success: false, message: data.message || "Unknown error" };
    }

    console.log("Registration Successful:", data.message);
    return { success: true, message: data.message };
  } catch (error) {
    console.error("Error submitting form:", error.message);
    return { success: false, message: error.message };
  }
};
