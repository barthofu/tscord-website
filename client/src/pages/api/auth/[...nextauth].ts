import { tokenToCSSVar } from "@chakra-ui/react";
import { botsConfig } from "@config/bots";
import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord";


export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: botsConfig[0].id,
            clientSecret: botsConfig[0].secret
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (account?.access_token) token.access_token = account.access_token;
            return token;
        },
        async session({ session, user, token }) {
            if(token.access_token) session.access_token = token.access_token;
            return session;
        }
    }
}
export default NextAuth(authOptions)