import chai from 'chai';
import { describe, it } from 'mocha';
import database from '../db';
import Graduations from './graduation';

const expect = chai.expect;

describe('Graduations Model', () => {
  before(async () => {
    // Connect to the database before running the tests
    await database.authenticate();
  });

  after(async () => {
    // Close the database connection after running the tests
    await database.close();
  });

  beforeEach(async () => {
    // Clear the Graduations table before each test
    await Graduations.destroy({ where: {} });
  });

  it('should create a new Graduations instance', async () => {
    const graduation = await Graduations.create({
      nm_member: 'John Doe',
      color: 'Red',
      status: 'Active',
      graduation_dt: '2022-01-01',
      first_point: 'First Point',
      second_point: 'Second Point',
      third_point: 'Third Point',
      fourth_point: 'Fourth Point',
      lesson_after: 'Lesson After',
      obs: 'Observation',
      gym: 'Gym',
      nm_member_id: 1,
      GYM_ID: 'GYM001',
    });

    expect(graduation).to.be.an.instanceOf(Graduations);
    expect(graduation.nm_member).to.equal('John Doe');
    expect(graduation.color).to.equal('Red');
    expect(graduation.status).to.equal('Active');
    expect(graduation.graduation_dt).to.equal('2022-01-01');
    expect(graduation.first_point).to.equal('First Point');
    expect(graduation.second_point).to.equal('Second Point');
    expect(graduation.third_point).to.equal('Third Point');
    expect(graduation.fourth_point).to.equal('Fourth Point');
    expect(graduation.lesson_after).to.equal('Lesson After');
    expect(graduation.obs).to.equal('Observation');
    expect(graduation.gym).to.equal('Gym');
    expect(graduation.nm_member_id).to.equal(1);
    expect(graduation.GYM_ID).to.equal('GYM001');
  });

  // Add more tests for other scenarios...
});