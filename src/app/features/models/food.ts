export interface Food {
  name?: string;
  img_url?: string;
  category?: string;
  subcategory?: string;
  // comments?: Comment[];
  comments?: string[];
  desc_en?: string;
  desc_jp?: string;
  // or just give it a list of string?
}