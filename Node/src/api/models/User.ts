import { ObjectId } from "mongodb";

interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  createAt: Date;
}

export default User;
