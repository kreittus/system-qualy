import { z } from "zod";

// Obtém a data atual no formato "YYYY-MM-DD"
const today = new Date().toISOString().split("T")[0];

export const notifySchema = z.object({
  dateOccurrence: z.string().min(1, "A data de ocorrência é obrigatória.")
    .refine(
      (value) => value <= today,
      { message: "A data de ocorrência nao pode ser maior que a data atual." }
    ),
  timeOccurrence: z.string().min(1, "A hora de ocorrência é obrigatória."),
  typeNotify: z.number().min(1, "O tipo de notificação é obrigatório."),
  patientName: z.string().min(1, "O nome do paciente é obrigatório."),
  patientSex: z.string().min(1, "O sexo do paciente é obrigatório."),
  patientRace: z.string().optional(),
  patientAge: z.string().optional()
    .refine((age) => !age || /^\d+$/.test(age), {
      message: "A idade do paciente deve ser um número.",
    })
    .refine((age) => !age || parseInt(age) <= 120, {
      message: "A idade do paciente não pode ser maior que 120 anos.",
    }),
  admissionDate: z
    .string()
    .refine(
      (value) => value <= today,
      { message: "A data de internação não pode ser maior que a data atual." }
    )
    .optional(),
  diagnostic: z.string().min(1, "O diagnóstico é obrigatório."),
  registerPatient: z.string()
    .regex(/^\d+$/, "O registro do paciente deve ser um número.")
    .min(1, "O registro do paciente é obrigatório."
    ),
  eventType: z.number().min(1, "O tipo de evento é obrigatório."),
  damageDegree: z.string().optional(),
  title: z.string().min(1, "O título é obrigatório."),
  description: z.string().min(1, "A descrição é obrigatória."),
  sectorNotify: z.number().min(1, "O setor notificador é obrigatório."),
  sectorNotified: z.number().min(1, "O setor notificado é obrigatório."),
  involved: z.string()
    //The value in form is a string "yes" or "no"
    .transform((value) => value === "yes"),
  anonymous: z.string()
    //The value in form is a string "yes" or "no"
    .transform((value) => value === "yes"),
  status: z.number(),
  id_task: z.number().optional(),
  id_user: z.number().optional(),
});

export type NotifySchema = z.infer<typeof notifySchema>;

export const defaultValuesNotifySchema: NotifySchema = {
  dateOccurrence: today,
  timeOccurrence: "00:00",
  typeNotify: 0,
  patientName: "",
  patientSex: "",
  patientRace: "", //optional
  patientAge: "", //optional
  admissionDate: today, //optional
  diagnostic: "",
  registerPatient: "",
  eventType: 0,
  damageDegree: "",
  title: "",
  description: "",
  sectorNotify: 0,
  sectorNotified: 0,
  involved: false,
  anonymous: false,
  status: 1, //Initial state sent to quality control
  id_task: 0,
  id_user: 0,
};
