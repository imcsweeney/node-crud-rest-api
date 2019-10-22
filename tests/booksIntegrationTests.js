require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const app = require('../app.js');

const book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book crud test', () => {
  it('should allow a book to be posted amd then return read and _id', (done) => {
    const bookPost = { title: 'My Book', author: 'Ian', genre: 'Finction' };

    agent.post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // console.log(results);
        results.body.read.should.not.equal(true);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach((done) => {
    book.deleteMany({}).exec();
    done();
  });

  after((done) => {
    mongoose.connection.close();
    app.server.close(done());
  });
});
