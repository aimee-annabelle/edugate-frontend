export type User = {
  _id: string;
  name: string;
  email: string;
};
export type UserDto = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified: boolean;
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

export type Rating = {
  user: User;
  rating: number;
  comment: string;
  createdAt: string;
  _id: string;
};
export type Review = {
  rating: number;
  comment: string;
};
export type ResourceDto = {
  _id: string;
  title: string;
  description: string;
  type: string;
  subject: string;
  gradeLevel: string;
  fileUrl: string;
  creator: User;
  collaborators: User[];
  views: number;
  isActive: boolean;
  tags: string[];
  ratings: Rating[];
  createdAt: string;
  updatedAt: string;
};
