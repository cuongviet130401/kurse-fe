export interface Comment {
    id: number;
    author: string;
    content: string;
    timestamp: Date;
  }
  
  export const fakeComments: Comment[] = [
    { id: 1, author: 'John Doe', content: 'Great video!', timestamp: new Date() },
    { id: 2, author: 'Jane Smith', content: 'Thanks for the info!', timestamp: new Date() },
    { id: 3, author: 'Alice Johnson', content: 'Very helpful.', timestamp: new Date() },
  ];