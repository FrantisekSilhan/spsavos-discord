import { bigint, bigserial, pgTable, smallint, smallserial, text } from "drizzle-orm/pg-core";

const DiscordBots = pgTable('DiscordBots', {
    id: smallserial('id').primaryKey(),
    api_key: text('api_key').notNull().unique()
});

const DiscordBotConfigs = pgTable('DiscordBotConfigs', {
    id: smallserial('id').primaryKey(),
    bot_id: smallint('bot_id').unique().references(() => DiscordBots.id),
    guild: bigint('guild', { mode: 'bigint' }).notNull(),
    welcome_message: text('welcome_message')
});

const DiscordCounters = pgTable('DiscordCounters', {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    discord_bot_config_id: bigint('discord_bot_config_id',{ mode: 'bigint' }).notNull().references(() => DiscordBotConfigs.id),
    channel_id: bigint('channel_id', {mode: 'bigint'}).unique().notNull(),
    role_id: bigint('role_id', {mode: 'bigint'}).notNull(),
    placeholder: text('placeholder').notNull()
});