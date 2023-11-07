import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { BadRequestError, NotFoundError } from '@/errors';

type Document<T> = T & {
  id: string;
  createdAt: string;
  updatedAt: string;
}

class Db {
  public collectionName?: string;

  public init() {
    try {
      fs.readFileSync('./src/db/data.json', 'utf-8');
    } catch {
      fs.writeFileSync('./src/db/data.json', JSON.stringify({}));
    }
  }

  private getData() {
    const data = fs.readFileSync('./src/db/data.json', 'utf-8');

    return JSON.parse(data);
  }

  public addCollection(name: string): void {
    const data = fs.readFileSync('./src/db/data.json', 'utf-8');

    const obj = JSON.parse(data);

    obj[name] = [];

    fs.writeFileSync('./src/db/data.json', JSON.stringify(obj));
  }

  public addCollections(collections: string[]): void {
    collections.forEach(this.addCollection);
  }

  public getCollections() {

  }

  public getCollection(name: string): any[] {
    const data = fs.readFileSync('./src/db/data.json', 'utf-8');

    const obj = JSON.parse(data);

    if (!obj[name]) {
      throw new NotFoundError('No collection found with this name');
    }

    return obj[name];
  }

  public collection(name: string) {
    this.getCollection(name);

    const obj = new Db();
    obj.collectionName = name;

    return obj;
  }

  public create<T>(data: T): Document<T> {
    if (!this.collectionName) {
      throw new BadRequestError('No collection specified');
    }

    const id = uuid();
    const createdAt = new Date(Date.now()).toISOString();

    const document = {
      id,
      ...data,
      createdAt,
      updatedAt: createdAt,
    };

    const obj = this.getData();

    obj[this.collectionName].push(document);

    fs.writeFileSync('./src/db/data.json', JSON.stringify(obj));

    return document;
  }

  public getById<T>(id: string): Document<T> {
    if (!this.collectionName) {
      throw new BadRequestError('No collection specified');
    }

    const documents = this.getCollection(this.collectionName);

    if (!Array.isArray(documents)) {
      throw new BadRequestError('Invalid collection');
    }

    const document = documents.find(d => d.id === id);

    if (!document) {
      throw new NotFoundError('No document found with this id');
    }

    return document;
  }

  public find<T>(): Document<T>[] {
    if (!this.collectionName) {
      throw new BadRequestError('No collection specified');
    }

    const documents = this.getCollection(this.collectionName);

    if (!Array.isArray(documents)) {
      throw new BadRequestError('Invalid collection');
    }

    return documents;
  }

  public findByIdAndUpdate<T>(id: string, data: Partial<T>): Document<T> {
    if (!this.collectionName) {
      throw new BadRequestError('No collection specified');
    }

    const obj = this.getData();

    const documents = obj[this.collectionName];

    if (!Array.isArray(documents)) {
      throw new BadRequestError('Invalid collection');
    }

    const document = documents.find(d => d.id === id);

    if (!document) {
      throw new NotFoundError('No document found with this id');
    }

    const updatedDocument = {
      ...document,
      ...data,
    };

    const updatedDocuments = documents.map(d => {
      if (d.id === updatedDocument.id) {
        return updatedDocument;
      }

      return d;
    });

    obj[this.collectionName] = updatedDocuments;

    fs.writeFileSync('./src/db/data.json', JSON.stringify(obj));

    return updatedDocument;
  }

  public remove<T>(id: string): Document<T> {
    if (!this.collectionName) {
      throw new BadRequestError('No collection specified');
    }

    const obj = this.getData();

    const documents = obj[this.collectionName];

    if (!Array.isArray(documents)) {
      throw new BadRequestError('Invalid collection');
    }

    const document = documents.find(d => d.id === id);

    if (!document) {
      throw new NotFoundError('No document found with this id');
    }

    const updatedDocuments = documents.filter(d => d.id !== document.id);

    obj[this.collectionName] = updatedDocuments;

    fs.writeFileSync('./src/db/data.json', JSON.stringify(obj));

    return document;
  }

  public clearDb() {
    fs.writeFileSync('./src/db/data.json', JSON.stringify({}));
  }
  
}

export const db = new Db();
