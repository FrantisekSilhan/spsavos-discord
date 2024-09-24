CREATE TABLE IF NOT EXISTS "DiscordBotConfigs" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"bot_id" smallint,
	"guild" bigint NOT NULL,
	"welcome_message" text,
	CONSTRAINT "DiscordBotConfigs_bot_id_unique" UNIQUE("bot_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DiscordBots" (
	"id" "smallserial" PRIMARY KEY NOT NULL,
	"api_key" text NOT NULL,
	CONSTRAINT "DiscordBots_api_key_unique" UNIQUE("api_key")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "DiscordCounters" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"discord_bot_config_id" bigint NOT NULL,
	"channel_id" bigint NOT NULL,
	"role_id" bigint NOT NULL,
	"placeholder" text NOT NULL,
	CONSTRAINT "DiscordCounters_channel_id_unique" UNIQUE("channel_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DiscordBotConfigs" ADD CONSTRAINT "DiscordBotConfigs_bot_id_DiscordBots_id_fk" FOREIGN KEY ("bot_id") REFERENCES "public"."DiscordBots"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "DiscordCounters" ADD CONSTRAINT "DiscordCounters_discord_bot_config_id_DiscordBotConfigs_id_fk" FOREIGN KEY ("discord_bot_config_id") REFERENCES "public"."DiscordBotConfigs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
