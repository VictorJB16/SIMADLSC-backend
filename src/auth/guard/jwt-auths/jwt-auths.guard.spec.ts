import { JwtAuthsGuard } from './jwt-auths.guard';

describe('JwtAuthsGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthsGuard()).toBeDefined();
  });
});
