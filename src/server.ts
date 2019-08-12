import { config } from 'dotenv';

import app from './app';

config();

app.listen(8080, () => {
  // tslint:disable-next-line: no-console
  console.log('Server is listening on port 8080');
});
