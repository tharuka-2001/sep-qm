import { registerUser, loginUser } from './api';

describe('API Service', () => {
  it('Member 4: registerUser success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: true, data: { token: 'abc' } })
      })
    );
    const res = await registerUser({ username: 'apiuser', email: 'a@b.com', password: '1234' });
    expect(res.success).toBe(true);
    expect(res.data).toHaveProperty('token');
  });

  it('Member 4: loginUser failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ success: false, message: 'Invalid username or password' })
      })
    );
    const res = await loginUser({ username: 'none', password: 'bad' });
    expect(res.success).toBe(false);
    expect(res.message).toBe('Invalid username or password');
  });
});
