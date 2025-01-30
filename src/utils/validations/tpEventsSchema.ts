import { z } from "zod";


export const tpEventsSchema = z.object({

  codigoTpNotificacao: z.string()
  .min(1, "O código do tipo de notificação é obrigatório."),

  tituloTpNotificacao: z.string()
  .min(1, "O titulo do tipo de notificação é obrigatório."),

  descTipo: z.string(),

  gestor: z.number()
  .min(1, "É necessário atribuir um gestor a esse tipo se notificação."),
 
});

export type tpEventsSchema = z.infer<typeof tpEventsSchema>;

export const defaultValuesTpEventsSchema: tpEventsSchema = {
  codigoTpNotificacao: "",
  tituloTpNotificacao: "",
  descTipo: "",
  gestor: 0,
};
