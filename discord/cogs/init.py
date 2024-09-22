import discord
from discord.ext import commands


class InitCog(commands.Cog):
  def __init__(self, client):
    self.client = client
  
  @commands.Cog.listener()
  async def on_ready(self):
    print(f"Logged in as {self.client.user} #{self.client.user.id}")

  @commands.slash_command(name="ping", description="Sends the bot's latency", integration_types={discord.IntegrationType.guild_install,discord.IntegrationType.user_install})
  async def ping(self, ctx):
    await ctx.respond(f"pong {round(self.client.latency, 3)*1000}ms")

def setup(client):
  client.add_cog(InitCog(client))