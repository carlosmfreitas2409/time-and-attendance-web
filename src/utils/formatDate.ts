import { format as formatDateFns } from 'date-fns-tz';
import { formatDistance as formatDistanceFns } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatDate = (date: number | Date, format: string) => {
  return formatDateFns(date, format, {
    locale: ptBR,
    timeZone: 'America/Sao_Paulo'
  });
};

export const formatDistance = (date: number | Date, baseDate: Date | number) => {
  return formatDistanceFns(date, baseDate, {
    locale: ptBR,
    includeSeconds: true,
  });
};