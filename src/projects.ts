export interface Project {
  title: string;
  summary: string;
  tags: string[];
  link?: string;
  image?: string;
}

export const projects: Project[] = [
  { title: 'Placeholder', summary: 'Replaced in step 10.', tags: ['php'] },
];
