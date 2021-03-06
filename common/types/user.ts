export type User = {
    id: number;
    name: string;
    bio: string;
    fellowship: "fellows" | "angels" | "writers";
    avatar_url: string;
    projects: Project[];
  }
  
  type Project = {
    id: number;
    name: string;
    icon_url: string;
  }