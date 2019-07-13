const chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment');

chai.use(chaiHttp);
const { expect } = chai;

let server;

before(async () => {
  server = require('../../../server');
})

after(async () => {
  require('../../../server').stop();
})

describe("addBirnthday", () => {
  describe("POST /api/birthdays", () => {
    context("When name and date are valid", () => {
      it("should return the same user", () => {
        const birthday = {
          date: moment().format("MM-DD-YYYY"),
          name: 'Leonardo Kalyn',
        }
        chai.request(server)
          .post('/api/birthdays')
          .send({...birthday})
          .end((err, res) => {
            expect(res.status).to.equal(200);

            const {body } = res;
            expect(body).to.be.an.instanceof(Object);
            expect(body.date).to.equal(birthday.date);
            expect(body.name).to.equal(birthday.name);
          });
      });
    });

    context("When name is invalid", () => {
      it("should return error status 400", () => {
        const birthday = {
          date: moment().format("MM-DD-YYYY"),
          name: {},
        }
        chai.request(server)
          .post('/api/birthdays')
          .send({...birthday})
          .end((err, res) => {
            expect(res.status).to.equal(400);
          });
      });
    });

    context("When date is invalid", () => {
      it("should return error status 400", () => {
        const birthday = {
          date: 'invalid',
          name: 'Name',
        }
        chai.request(server)
          .post('/api/birthdays')
          .send({...birthday})
          .end((err, res) => {
            expect(res.status).to.equal(400);
          });
      });
    });

    context("When name or date is missing", () => {
      it("should return error status 400", () => {
        chai.request(server)
          .post('/api/birthdays')
          .end((err, res) => {
            expect(res.status).to.equal(400);
          });
      });
    });
  });
});
