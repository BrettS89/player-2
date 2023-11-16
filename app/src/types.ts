interface Document {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Player2File extends Document {
  name: string;
  type: string;
  extension: string;
}

export interface Track extends Document{
  title: string;
  artist: string;
  fileId: string;
  file?: Player2File;
}
