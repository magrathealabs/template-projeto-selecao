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

describe("getSharedBirnthdays", () => {
  describe("GET /api/birthdays/:date", () => {
    context("When :date is valid", () => {
      it("should return the same user", () => {
        const today = moment();
        chai.request(server)
          .get(`/api/birthdays/${today.format("MM-DD-YYYY")}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);

            const {body } = res;
            expect(body).to.be.an.instanceof(Object);
            expect(body).to.have.property('sameAge');
            expect(body.sameAge).to.be.an.instanceof(Array);
            expect(body).to.have.property('sameBirthday');
            expect(body.sameBirthday).to.be.an.instanceof(Array);
          });
      });
    });

    context("When :date is invalid", () => {
      it("should return error status 400", () => {
        chai.request(server)
          .get(`/api/birthdays/invalid`)
          .end((err, res) => {
            expect(res.status).to.equal(400);
          });
      });
    });
  });
});
