// server/api/register.ts
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const { firstName, lastName, email, phone, password, confirmPassword } = body;

  // 🛡️ Validate cơ bản
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Vui lòng điền đầy đủ thông tin.",
      })
    );
  }

  if (password !== confirmPassword) {
    return sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: "Mật khẩu không trùng khớp.",
      })
    );
  }

  // 📦 Giả lập lưu user (có thể ghi vào DB thật nếu dùng Prisma, MongoDB...)
  console.log("✅ User đăng ký:", {
    firstName,
    lastName,
    email,
    phone,
    password,
  });

  return {
    status: "ok",
    message: "Đăng ký thành công!",
    user: {
      name: `${firstName} ${lastName}`,
      email,
      phone,
    },
  };
});
