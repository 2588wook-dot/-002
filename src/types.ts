export interface Project {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  detailImages: string[];
  order: number;
  isCustom?: boolean; // to indicate if it was uploaded/added by user
}
