export type ClassResponseType = {
  _id: string;

  image: string;

  name: string;

  description: string;

  about: string;

  type: string;

  price: string;

  infos: ClassInfo[];

  teacher: ClassTeacher;
};

type ClassInfo = {
  name?: string;
  image?: string;
};

type ClassTeacher = {
  _id: string;
  name: string;
  image: string;
  surname: string;
};
