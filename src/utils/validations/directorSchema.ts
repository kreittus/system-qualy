import { z } from "zod";

export const directorSchema = z.object({
  siglaDiretoria: z.string()
    .min(1, "A sigla da diretoria é obrigatória."),
  NomeDiretoria: z.string()
    .min(1, "O nome da diretoria é obrigatória."),
  responsavelDiretoria: z.number()
    .min(1, "O responsável da diretoria é obrigatório."),
});

export const defaultValuesDirectorSchema = {
  siglaDiretoria: "",
  NomeDiretoria: "",
  responsavelDiretoria: 0,
}

export type directorSchema = z.infer<typeof directorSchema>;