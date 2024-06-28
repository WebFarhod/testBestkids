export type NewResponseType = {
  _id: string;

  image: string;

  title: string;

  type: string;

  body: string;

  author: string;

  new: string;

  views: string;
  createdAt: Date;
};

export type SortNews = {
  image: string;
  title: string;
  type: string;
  body: string;
  // comment: number;
  author: string;
  views: number;
  createdAt: Date;
};
