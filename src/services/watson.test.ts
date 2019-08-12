import { assert, expect, should } from 'chai';
import { config } from 'dotenv';
import { before, it } from 'mocha';

import { Watson } from './watson';

const assistant = new Watson();

describe('Watson', () => {
  // Read from dotenv
  before(() => {
    config();
  });

  // Create a Session
  describe('#createSession()', () => {
    // Create the service first
    before(() => {
      assistant.createService();
    });

    it('should create a new session and contain a session id', function () {
      this.timeout(5000);
      return assistant.createSession().then((session) => {
        expect(session).to.have.property('session_id');
      }).catch((err) => {
        assert.fail(err);
      });
    });
  });

  describe('#sendMessage(message: string)', () => {
    // Create the service and session
    before(() => {
      assistant.createService().createSession();
    });

    it('should respond with a message', function () {
      this.timeout(5000);
      return assistant.sendMessage('Hello There').then((response) => {
        return expect(response.output.generic).to.be.an('array').that.is.not.empty;
      });
    });
  });
});
