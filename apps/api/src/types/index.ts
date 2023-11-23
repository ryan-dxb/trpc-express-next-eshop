import { UserRole } from "@/models/user.model";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
};
