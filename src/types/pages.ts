export interface Page {
  id: number;
  title: string;
  icon?: React.ReactNode;
  subPages?: Page[];
}