
// Interface para o formato interno das notificações no componente
export interface NotificationTypes_APIResponse {
    id: string;
    usuario_responsavel: number;
    dt_ocorrencia: string;
    hr_ocorrencia: string;
    nomePaciente: string;
    id_evento: number;
    sexo: string;
    raca_cor?: string;
    idade?: number;
    dt_internacao?: string;
    status: number;
    id_tarefa: number;
    id_setor_notificante: number;
    id_setor_notificado: number;
    diagnostico: string;
    registro: number;
    grau_dano: string;
    titulo: string;
    descricao: string;
    envolvimento: boolean;
    anonimato: boolean;
  }