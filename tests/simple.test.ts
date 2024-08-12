describe('Testing Jest', () => {
  beforeAll(() => {
    console.log('Before All!');
  });

  afterAll(() => {
    console.log('After All!');
  });

  test('Sample Test', () => {
    const num = 2 * 2;
    expect(num).toBe(4);
  });
});
