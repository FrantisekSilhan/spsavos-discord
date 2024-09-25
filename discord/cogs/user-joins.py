import discord
from discord.ext import commands
import random

class UserJoinsCog(commands.Cog):
  def __init__(self, client):
    self.client = client
    self.ids = {
      "verified_role": 1147959883157737592
    }

  @commands.Cog.listener()
  async def on_member_join(self, member):
    if discord.utils.get(member.roles, id=self.ids["verified_role"]):
      return
    
    await member.send(
f"""
📢 **Pro studenty školy: Ověření a přístup na server** 📢

Abychom zajistili bezpečnost a soukromí školního Discord serveru, **přístup do celého serveru je omezen pouze pro studenty**. Pro získání plného přístupu je nutné ověření pomocí školního e-mailu.
## 🔗 Postup:
- Přejdi na tento [odkaz](<https://pslib.app/>).
- Následuj pokyny na stránce (přihlášení přes váš školní e-mail a Discord účet).
- Po ověření se ti automaticky přiřadí role třídy, role "verified" a získáš přístup do školní části serveru.

❗️ **Upozornění**: Tento proces ověření je **výhradně pro studenty** školy. Pokud nejsi student a nemáš školní e-mail, nebude možné tímto způsobem získat přístup.

🔍 **Pro ostatní uživatele**: I když nemáš školní e-mail a nemůžeš získat plný přístup, stále můžeš vidět a účastnit se kategorie "**pro všechny**", kde najdeš veřejné informace a diskuse.
"""
    )

def setup(client):
  client.add_cog(UserJoinsCog(client))