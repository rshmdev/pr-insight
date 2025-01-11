import NextAuth, { CredentialsSignin } from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { api } from "./lib/api";
import jwt from "jsonwebtoken";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "read:user user:email repo admin:repo_hook write:repo_hook",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(request) {
        const response = await api.post("/auth/login", {
          email: request.email,
          password: request.password,
        });
        if (!response.data) {
          throw new InvalidLoginError();
        }
        return (await response.data) ?? null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && account.provider === "github" && profile) {
        try {
          const githubUser = {
            email: profile.email,
            name: profile.name,
            githubId: profile.id,
            githubUsername: profile.login,
          };

          await api.post(`/users/github`, githubUser);
        } catch (error) {
          console.error("Erro ao salvar usuário no banco:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && account.provider === "github" && profile) {
        const githubToken = account.access_token;

        const customJwt = jwt.sign(
          { id: profile.id, email: profile.email, githubToken },
          process.env.JWT_SECRET!,
          { expiresIn: "1d" }
        );

        token.customJwt = customJwt;
      }
      return token;
    },

    async session({ session, token }) {
      (session as any).githubToken = token.githubToken || null;
      (session as any).token = token.customJwt || null;

      try {
        const response = await api.get(`/users/me`, {
          headers: { Authorization: `Bearer ${session.token}` },
        });

        const userInfo = response.data;

        session.user = {
          ...session.user,
          plan: userInfo.plan?.name || "Gratuito",
          image: userInfo.avatar || session.user.image,
        };
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
      }

      return session;
    },
  },
});
