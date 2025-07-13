import { createProjectInputSchema } from "@/zod/project.schema";
import z from "zod";

export type CreateProjectInputType = z.infer<typeof createProjectInputSchema>;
