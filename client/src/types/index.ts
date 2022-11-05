export interface IPost {
  id: string;
  userId: string;
  createdAt: string;
  title: string;
  body: string;
  agree: string[];
  disagree: string[];
}
