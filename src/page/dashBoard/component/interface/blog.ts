export interface Blog {
    isAuthor?: boolean;
    author: { 
      picture: string;
      firstName: string;
      lastName: string;
      email: string;
      dateOfBirth: string;
      password: string;
      id: string;
    };
    category: {
      id: string;
      name: string;
    };
    postDate: string;
    title: string;
    description: string;
    likes: number;
    shares: number;
    _id: string;
    contents:[{
      header:string;
      smallDescription:string;
      body:string
  }]
    publicationDate: string;
    image?: string;
    video?: string;
    views?: number;
    sendBlog?: number;
    likesIp?: string[];
    isHeadLine?: boolean;
    pulicationDate: Date;
    status?: string; 
  }