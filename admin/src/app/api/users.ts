import axios from "axios";

const fetchDiscordUserInformation = async (token?: string): Promise<DiscordUser | null> => {
    if (!token) {
        return null;
      }

    try {
        const response = await axios.get("https://discord.com/api/v10/users/@me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        return response.data as DiscordUser;
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        return null;
      }
};

export {
    fetchDiscordUserInformation
}