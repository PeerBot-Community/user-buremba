# Etsy Account Dashboard 🛍️

A Streamlit web application that uses Playwright to scrape your Etsy account data and display it in a user-friendly dashboard.

## Features

- 🔐 **Secure Login**: Enter your Etsy credentials to access your account
- 📊 **Account Information**: View your basic account details
- ❤️ **Favorites**: Browse your favorite items with direct links
- 🛒 **Purchase History**: Review your recent purchases

## Setup

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Installation

1. **Clone or download this project**

2. **Run the setup script**:
   ```bash
   python setup.py
   ```
   
   This will:
   - Install all required Python packages
   - Install Playwright browser dependencies

### Alternative Manual Setup

If the setup script doesn't work, you can install manually:

```bash
# Install Python requirements
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium
```

## Usage

1. **Start the application**:
   ```bash
   streamlit run app.py
   ```

2. **Open your browser** to the URL shown in the terminal (usually `http://localhost:8501`)

3. **Enter your Etsy credentials** in the sidebar

4. **Explore your data** using the three main tabs:
   - **Account Info**: Basic account information
   - **Favorites**: Your favorited items
   - **Purchase History**: Your recent purchases

## Security & Privacy

- ✅ Your credentials are only used for the current session
- ✅ No data is stored permanently on disk
- ✅ Browser runs in headless mode for privacy
- ✅ All web scraping respects rate limits

## Technical Details

### Dependencies
- **Streamlit**: Web application framework
- **Playwright**: Browser automation for web scraping
- **Pandas**: Data manipulation and display
- **Requests**: HTTP requests handling

### How it Works
1. Uses Playwright to launch a headless Chromium browser
2. Logs into Etsy using your provided credentials
3. Navigates to different account pages (favorites, purchases, etc.)
4. Scrapes relevant data using DOM selectors
5. Displays the data in a clean Streamlit interface

## Important Notes

⚠️ **Disclaimer**: This tool is for personal use only. Please use responsibly and in accordance with Etsy's Terms of Service.

⚠️ **Rate Limiting**: The scraper includes delays to avoid overwhelming Etsy's servers.

⚠️ **Compatibility**: Web scraping may break if Etsy changes their website structure.

## Troubleshooting

### Common Issues

1. **Login fails**: 
   - Double-check your email and password
   - Etsy may have additional security measures (2FA, captchas)

2. **Data not loading**:
   - Etsy pages may take time to load
   - Check your internet connection

3. **Playwright installation issues**:
   ```bash
   # Try installing system dependencies
   playwright install-deps chromium
   ```

### Support

If you encounter issues, check:
1. Your internet connection
2. Etsy website accessibility
3. Python and package versions

## License

This project is for educational and personal use only.