import os, json, discord
from discord.ext import commands, tasks
import asyncio

from dotenv import load_dotenv
load_dotenv()

intents = discord.Intents().all()
client = commands.Bot(intents = intents)

for filename in os.listdir("./cogs"):
    if filename.endswith(".py"):
        client.load_extension(f"cogs.{filename[:-3]}")

client.run(os.environ["TOKEN"])