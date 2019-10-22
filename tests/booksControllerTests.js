require('should');
const sinon = require('sinon');
const bookController = require('../controllers/booksController');

describe('book controller tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      // eslint-disable-next-line no-unused-vars
      const Book = function (book) { this.save = () => {}; };

      const req = {
        body: {
          author: 'Ian'
        }
      };

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = bookController(Book);
      controller.post(req, res);
      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true);
    });
  });
});
