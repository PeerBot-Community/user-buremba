class TestButtonController {
  constructor() {
    this.isLoading = false;
  }

  async handleClick() {
    if (this.isLoading) return;

    this.isLoading = true;
    try {
      const response = await fetch('/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'test' })
      });

      const data = await response.json();
      console.log('Test response:', data);
      
      return data;
    } catch (error) {
      console.error('Test failed:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }
}

module.exports = new TestButtonController();