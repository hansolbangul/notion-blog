export type PostStatus = "Private" | "Public";
export type PostType = "Post" | "Paper" | "Schedule";

export class Post {
  id: string;
  date: {
    start_date: string;
  };
  type: PostType[];
  slug: string;
  tags?: string[];
  summary?: string;
  author?: {
    id: string;
    name: string;
    profile_photo?: string;
  }[];
  title: string;
  status: PostStatus[];
  createdTime: string;
  fullWidth: boolean;
  thumbnail?: string;

  constructor({ id, date, type, slug, tags, summary, author, title, status, createdTime, fullWidth, thumbnail }: Post) {
    this.id = id;
    this.date = date;
    this.type = type;
    this.type = type;
    this.slug = slug;
    this.tags = tags;
    this.summary = summary;
    this.author = author;
    this.title = title;
    this.status = status;
    this.createdTime = createdTime;
    this.fullWidth = fullWidth;
    this.thumbnail = thumbnail;
  }
}
