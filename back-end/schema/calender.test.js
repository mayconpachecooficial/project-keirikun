import chai from 'chai';
import { describe, it } from 'mocha';
import Calender from './calender';

const expect = chai.expect;

describe('Calender Model', () => {
  it('should create a new Calender instance', () => {
    const calender = Calender.build({
      gymId: 'gym1',
      day: 'Monday',
      startTime: '09:00 AM',
      finishTime: '10:00 AM',
      lineNo: 1,
      description1: 'Description 1',
      description2: 'Description 2',
      image: 'image.jpg',
      color: 'red',
      graduationFlag: 0,
    });

    expect(calender).to.be.an.instanceOf(Calender);
    expect(calender.gymId).to.equal('gym1');
    expect(calender.day).to.equal('Monday');
    expect(calender.startTime).to.equal('09:00 AM');
    expect(calender.finishTime).to.equal('10:00 AM');
    expect(calender.lineNo).to.equal(1);
    expect(calender.description1).to.equal('Description 1');
    expect(calender.description2).to.equal('Description 2');
    expect(calender.image).to.equal('image.jpg');
    expect(calender.color).to.equal('red');
    expect(calender.graduationFlag).to.equal(0);
  });

  // Add more tests for other scenarios...
});