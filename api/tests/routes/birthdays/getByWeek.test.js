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

describe("getByWeek", () => {
  describe("GET /api/birthdays", () => {
    context("When Week and Year are not present as query params", () => {
      it("should get all the users that have birthday on the current week", () => {
        const today = moment();
        chai.request(server)
          .get('/api/birthdays')
          .end((err, res) => {
            expect(res.status).to.equal(200);

            const {body } = res;
            expect(body).to.be.an.instanceof(Array);
            expect(body.length).to.equal(7);
            expect(moment(body[0].date).isSame(today.day(0), 'day')).to.be.true;
            expect(moment(body[6].date).isSame(today.day(6), 'day')).to.be.true;
          });
      });
    });

    context("When a week and a year are present as query params", () => {
      it("should get all the users that have birthday of said week of year", () => {
        const date = moment("2000-07-10");
        chai.request(server)
          .get(`/api/birthdays?week=${date.week()}&year=${date.weekYear()}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);

            const {body } = res;
            expect(body).to.be.an.instanceof(Array);
            expect(body.length).to.equal(7);
            expect(moment(body[0].date).isSame(date.day(0), 'day')).to.be.true;
            expect(moment(body[6].date).isSame(date.day(6), 'day')).to.be.true;
          });
      });
    });

    context("When week or year are not valid values", () => {
      it("should return error status 400", () => {
        chai.request(server)
          .get('/api/birthdays?week=week&year=week')
          .end((err, res) => {
            expect(res.status).to.equal(400);
          });
      });
    });
  });
});
