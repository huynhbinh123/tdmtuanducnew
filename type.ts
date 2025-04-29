export interface MetaSeo {
  title: string | null;
  desc: string | null;
  image: string | null;
}


export interface BaseFormType {
  name: string;
  slug: string;
  meta_title: string;
  meta_desc: string;
  meta_image: string;
}
export interface Tag {
  id?: number;
  name: string;
  slug: string;
  meta: MetaSeo;
  created_at?: string;
  updated_at?: string;
}
export interface BlogCategory {
  id?: number;
  parent_id: number | null;
  ord: number;
  is_show: boolean;
  is_highlight: boolean;
  icon: string | null;
  image: string | null;
  banner_image: string | null;
  created_at?: string;
  updated_at?: string;
  translations?: BlogCategoryTranslation[];
  parent?: BlogCategory | null;
  children?: BlogCategory[];
}
export type BlogCategoryTranslation = {
  id?: number;
  blog_category_id?: number;
  locale: string; // 'vi', 'en', etc.
  name: string;
  slug: string;
  desc?: string | null;
  content?: string | null;
  meta_image?: string | null;
  meta_title?: string | null;
  meta_desc?: string | null;
  created_at?: string;
  updated_at?: string;
};








export interface Post {
  id?: number;
  image: string | null;
  banner_image: string | null;
  is_show: boolean;
  is_highlight: boolean;
  name: string;
  slug: string;
  desc: string | null;
  content: string | null;
  author_id: number | null;
  views: number;
  meta: MetaSeo;

  created_at?: string; // assuming timestamp is in string format
  updated_at?: string; // assuming timestamp is in string format
}
export interface PostComment {
  id?: number;
  post_id: number;
  user_id: number | null;
  parent_id: number | null;
  guest_name: string | null;
  guest_email: string | null;
  content: string;
  is_approved: boolean;
  created_at?: string;
  updated_at?: string;
}
export interface PostReaction {
  id?: number;
  post_id: number;
  user_id: number | null;
  reaction: 'like' | 'dislike' | null;
  created_at?: string;
  updated_at?: string;
}

export interface TreeNode {
  id: number
  name: string
  children: TreeNode[]
  parent?: TreeNode | null
}
