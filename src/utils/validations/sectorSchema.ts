import { z } from "zod";

export const sectorsSchema = z.object({
  description: z
    .string()
    .max(20, "A descrição não pode ter mais de 100 caracteres.")
    .nonempty("A descrição é obrigatória."),
  id_user_responsible: z
    .number().positive("O ID do usuário responsável deve ser um número positivo."),
  id_director: z
    .number().positive("O diretório deve ser um número positivo.")
});

export type Sectors = z.infer<typeof sectorsSchema>;