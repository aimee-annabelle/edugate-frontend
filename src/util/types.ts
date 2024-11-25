export type User = {
  _id: string;
  name: string;
  email: string;
};
export type Resource = {
  _id: string;
  title: string;
  description: string;
  type: string;
  subject: string;
  gradeLevel: string;
  fileUrl: string;
};

export type ResourceWithUser = Resource & {
  creator: User;
};
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
