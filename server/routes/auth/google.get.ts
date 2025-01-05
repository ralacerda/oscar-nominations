import { users } from "~~/database/schema/users";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {
    await db
      .insert(users)
      .values({
        name: user.name,
        picture: user.picture,
        email: user.email,
      })
      .onConflictDoNothing();

    await setUserSession(event, {
      user,
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
