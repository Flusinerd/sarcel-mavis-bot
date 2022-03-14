import { AccessTokenMiddleware } from './access-token.middleware';

describe('AccessTokenMiddleware', () => {
  it('should be defined', () => {
    expect(new AccessTokenMiddleware()).toBeDefined();
  });
});
