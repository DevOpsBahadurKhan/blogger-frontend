export interface Blog {
  id: number;
  title: string;
  content?: string;
  author?: { id: number; username: string } | null;
  createdAt?: string;
  updatedAt?: string;
}
