const userService = {
  setUserInfo: ({ jwt }: { jwt: string }) =>
    fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jwt }),
    }),
};

export default userService;
