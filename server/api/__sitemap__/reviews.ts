export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);

  if (!form) {
    return { status: "error", message: "No form data received." };
  }

  const name = form.find((f) => f.name === "name")?.data?.toString() || "";
  const email = form.find((f) => f.name === "email")?.data?.toString() || "";
  const message =
    form.find((f) => f.name === "message")?.data?.toString() || "";
  const rating = parseInt(
    form.find((f) => f.name === "rating")?.data?.toString() || "0"
  );

  const imageFiles = form.filter(
    (f) => f.name === "images" && f.type?.startsWith("image/")
  );

  console.log("📩 Review nhận được:", {
    name,
    email,
    message,
    rating,
    imageFiles,
  });

  return { status: "ok", message: "Gửi thành công!" };
});
