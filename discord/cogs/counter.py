import discord
from discord.ext import commands, tasks
import random

class CounterCog(commands.Cog):
  def __init__(self, client):
    self.client = client
    self.ids = {
      "guild": 984505957012873266,
      "students_channel": 1282725543871119478,
      "staff_channel": 1282725610946433207,
      "students_role": 984511812621975583,
      "staff_role": 1170079613574185052
    }
    self.counter.start()

  @tasks.loop(minutes=10)
  async def counter(self):
    if not self.client.is_ready():
      return

    guild = self.client.get_guild(self.ids["guild"])
    students_channel = self.client.get_channel(self.ids["students_channel"])
    staff_channel = self.client.get_channel(self.ids["staff_channel"])

    if not guild or not students_channel or not staff_channel:
      return

    students_role = guild.get_role(self.ids["students_role"])
    staff_role = guild.get_role(self.ids["staff_role"])

    if not students_role or not staff_role:
      return

    staff_count = len(staff_role.members) + 3
    students_count = len(students_role.members) - staff_count

    await students_channel.edit(name = f"Studentů: {students_count}")
    await staff_channel.edit(name = f"Zaměstnanců: {staff_count}")

def setup(client):
  client.add_cog(CounterCog(client))