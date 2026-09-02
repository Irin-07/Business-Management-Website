const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await api.post("/auth/register", formData);

    alert("Registration successful! Please login.");

    navigate("/login");
  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
  }
};