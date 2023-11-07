import { db } from '.';

interface UserData {
  firstName: string;
  lastName: string;
}

describe('db', () => {
  describe('addCollection', () => {
    it('creates a collection', () => {
      db.addCollection('test');

      const actual = db.getCollection('test');
  
      expect(Array.isArray(actual)).toBe(true);
    });
  });

  describe('addCollections', () => {
    it('creates two collections', () => {
      db.addCollections(['test1', 'test2']);

      const actual = db.getCollection('test2');
  
      expect(Array.isArray(actual)).toBe(true);
    });
  });

  describe('getCollection', () => {
    it('gets a colelction by name and returns it', () => {
      db.addCollection('test');

      const actual = db.getCollection('test');
  
      expect(Array.isArray(actual)).toBe(true);
    });

    it('throws an error when no collection found', () => {
      const fn = () => db.getCollection('yoo');

      expect(fn).toThrow('No collection found with this name');
    });
  });

  describe('collection', () => {
    it('throws an error when no collection found', () => {
      const fn = () => db.collection('wtf');

      expect(fn).toThrow('No collection found with this name');
    });

    it('returns a new instance of Db with collectionName set', () => {
      const collectionName = 'mycollection';

      db.addCollection(collectionName);

      const obj = db.collection(collectionName);

      expect(obj.collectionName).toBe(collectionName);
    });
  });

  describe('create', () => {
    it('returns a new document', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      const user = db.collection('person').create<UserData>(data);

      expect(user.firstName).toBe('Brett');
      expect(user.lastName).toBe('Sodie');
    });

    it('creates a new document in the database', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      const user = db.collection('person').create<UserData>(data);

      const document = db.collection('person').getById(user.id);

      expect(document).toStrictEqual(user);
    });

    it('sets a unique id', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      const user = db.collection('person').create<UserData>(data);

      expect(typeof user.id).toBe('string');
    });

    it('set createdAt and updatedAt', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      const user = db.collection('person').create<UserData>(data);

      expect(typeof user.createdAt).toBe('string');
      expect(typeof user.updatedAt).toBe('string');
    });

    it('throws an error when no collection set', () => {
      const fn = () => db.create({ data: 'test' });

      expect(fn).toThrow('No collection specified');
    });
  });

  describe('getById', () => {
    it('gets a document by id', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      const user = db.collection('person').create<UserData>(data);

      const foundUser = db.collection('person').getById(user.id);

      expect(foundUser).toStrictEqual(user);
    });

    it('throws an error if no document found with given id', () => {
      db.addCollection('person');

      const fn = () => db.collection('person').getById('test');

      expect(fn).toThrow('No document found with this id');
    });

    it('throws an error if no collection specified', () => {
      const fn = () => db.getById('test');

      expect(fn).toThrow('No collection specified');
    });
  });

  describe('find', () => {
    it('gets all documents in a collection', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      db.collection('person').create<UserData>(data);
      db.collection('person').create<UserData>(data);

      const documents = db.collection('person').find();

      expect(documents).toHaveLength(2);
    });

    it('throws an error if no collection specified', () => {
      const fn = () => db.getById('test');

      expect(fn).toThrow('No collection specified');
    });
  });

  describe('findByIdAndUpdate', () => {
    it('throws an error if no collection specified', () => {
      const fn = () => db.findByIdAndUpdate('test', {});

      expect(fn).toThrow('No collection specified');
    });

    it('throws an error if no document found with given id', () => {
      db.addCollection('person');

      const fn = () => db.collection('person').findByIdAndUpdate('test', {});

      expect(fn).toThrow('No document found with this id');
    });

    it('updates a document', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      const user = db.collection('person').create<UserData>(data);

      db
        .collection('person')
        .findByIdAndUpdate<UserData>(user.id, { firstName: 'Connie' });

      const updatedUser = db.collection('person').getById<UserData>(user.id);

      expect(updatedUser.firstName).toBe('Connie');
    });
  });

  describe('remove', () => {
    it('throws an error if no collection specified', () => {
      const fn = () => db.remove('test');

      expect(fn).toThrow('No collection specified');
    });

    it('throws an error if no document found with given id', () => {
      db.addCollection('person');

      const fn = () => db.collection('person').remove('test');

      expect(fn).toThrow('No document found with this id');
    });

    it('removes document from db', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      const user = db.collection('person').create<UserData>(data);

      db.collection('person').remove<UserData>(user.id);

      const fn = () => db.collection('person').getById(user.id);

      expect(fn).toThrow('No document found with this id');
    });

    it('returns removed document', () => {
      db.addCollection('person');

      const data = {
        firstName: 'Brett',
        lastName: 'Sodie',
      };

      const user = db.collection('person').create<UserData>(data);

      const removed = db.collection('person').remove<UserData>(user.id);

      expect(removed).toStrictEqual(user);
    });
  });
});
