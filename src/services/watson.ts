import AssistantV2, { CreateSessionParams, MessageParams, MessageResponse, SessionResponse } from 'ibm-watson/assistant/v2';

export class Watson {
  private assistant: AssistantV2;
  private sessionId: string;

  public createService(): Watson {
    this.assistant = new AssistantV2({
      version: '2018-11-08',
    });

    return this;
  }

  public createSession(): Promise<SessionResponse> {
    return new Promise((resolve, reject) => {
      const params: CreateSessionParams = {
        assistant_id: process.env.ASSISTANT_ID || '',
      };

      this.assistant.createSession(params, (err, response: SessionResponse | undefined) => {
        if (err) {
          reject(err);
        } else if (response) {
          this.sessionId = response.session_id;
          resolve(response);
        }
      });
    });
  }

  public sendMessage(message: string): Promise<MessageResponse> {
    return new Promise((resolve, reject) => {
      const params: MessageParams = {
        assistant_id: process.env.ASSISTANT_ID || '',
        input: {
          message_type: 'text',
          text: message,
        },
        session_id: this.sessionId,
      };

      this.assistant.message(params, (err, response: MessageResponse | undefined) => {
        if (err) {
          reject(err);
        } else if (response) {
          resolve(response);
        }
      });
    });
  }
}
