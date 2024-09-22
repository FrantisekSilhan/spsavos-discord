import os, json, discord
from discord.ext import commands, tasks
import asyncio

from dotenv import load_dotenv
load_dotenv()

statusy = ["Znáš pojem vysoká bílá papírová čepice?", "{} zmatených", "Namazat... teda vymazat, na chleba si ji namažu", "Tohle už není slovíčkaření, to je mezerkování", "Když už tak spoluvole, když je to spolužák", "nespim"]

intents = discord.Intents().all()
client = commands.Bot(intents = intents, activity=discord.Game(name=statusy[0], status=discord.Status.idle))

for filename in os.listdir("./cogs"):
    if filename.endswith(".py"):
        client.load_extension(f"cogs.{filename[:-3]}")

client.run(os.environ["TOKEN"])