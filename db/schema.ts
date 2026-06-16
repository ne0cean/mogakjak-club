import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const surveyResponses = sqliteTable("survey_responses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  desiredWork: text("desired_work").notNull(),
  blocker: text("blocker").notNull(),
  experience: text("experience").notNull(),
  tools: text("tools", { mode: "json" }).$type<string[]>().notNull(),
  toolsOther: text("tools_other").notNull().default(""),
  goals: text("goals", { mode: "json" }).$type<string[]>().notNull(),
  goalsOther: text("goals_other").notNull().default(""),
  firstSessionTopics: text("first_session_topics", { mode: "json" })
    .$type<string[]>()
    .notNull(),
  firstSessionTopicsOther: text("first_session_topics_other")
    .notNull()
    .default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
