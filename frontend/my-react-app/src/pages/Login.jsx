const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

    alert("Login successful!");

    navigate("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Invalid email or password");
  }
};