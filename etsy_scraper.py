import asyncio
from playwright.async_api import async_playwright
import pandas as pd
from typing import Dict, List, Optional
import time

class EtsyScraper:
    def __init__(self):
        self.browser = None
        self.page = None
        self.is_logged_in = False
    
    async def start_browser(self, headless: bool = True):
        """Initialize the browser and page"""
        self.playwright = await async_playwright().start()
        self.browser = await self.playwright.chromium.launch(headless=headless)
        self.page = await self.browser.new_page()
        
        # Set viewport and user agent to avoid detection
        await self.page.set_viewport_size({"width": 1920, "height": 1080})
        await self.page.set_extra_http_headers({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    async def login(self, email: str, password: str) -> bool:
        """Login to Etsy account"""
        try:
            # Navigate to Etsy sign-in page
            await self.page.goto('https://www.etsy.com/signin', wait_until='networkidle')
            
            # Wait for and fill email
            await self.page.wait_for_selector('#join_neu_email_field')
            await self.page.fill('#join_neu_email_field', email)
            
            # Fill password
            await self.page.fill('#join_neu_password_field', password)
            
            # Click sign in button
            await self.page.click('button[type="submit"]')
            
            # Wait for navigation or error
            await self.page.wait_for_load_state('networkidle')
            
            # Check if login was successful
            current_url = self.page.url
            if 'signin' not in current_url and 'error' not in current_url.lower():
                self.is_logged_in = True
                return True
            else:
                return False
                
        except Exception as e:
            print(f"Login error: {str(e)}")
            return False
    
    async def get_account_info(self) -> Dict:
        """Get basic account information"""
        if not self.is_logged_in:
            return {"error": "Not logged in"}
        
        try:
            # Navigate to account page
            await self.page.goto('https://www.etsy.com/your/account', wait_until='networkidle')
            
            account_info = {}
            
            # Try to get account name
            try:
                name_element = await self.page.query_selector('.shop2-account-review-name')
                if name_element:
                    account_info['name'] = await name_element.inner_text()
            except:
                account_info['name'] = 'Not found'
            
            # Try to get email
            try:
                email_element = await self.page.query_selector('[data-test-id="email-address"]')
                if email_element:
                    account_info['email'] = await email_element.inner_text()
            except:
                account_info['email'] = 'Not found'
            
            return account_info
            
        except Exception as e:
            return {"error": f"Failed to get account info: {str(e)}"}
    
    async def get_favorites(self) -> List[Dict]:
        """Get user's favorite items"""
        if not self.is_logged_in:
            return [{"error": "Not logged in"}]
        
        try:
            # Navigate to favorites
            await self.page.goto('https://www.etsy.com/your/favorites', wait_until='networkidle')
            
            favorites = []
            
            # Wait for favorites to load
            await self.page.wait_for_timeout(2000)
            
            # Get favorite items
            favorite_items = await self.page.query_selector_all('.favorite-item')
            
            for item in favorite_items[:10]:  # Limit to first 10 items
                try:
                    title_element = await item.query_selector('.favorite-item-title a')
                    price_element = await item.query_selector('.currency-value')
                    shop_element = await item.query_selector('.shop-name')
                    
                    favorite = {}
                    
                    if title_element:
                        favorite['title'] = await title_element.inner_text()
                        favorite['url'] = await title_element.get_attribute('href')
                    
                    if price_element:
                        favorite['price'] = await price_element.inner_text()
                    
                    if shop_element:
                        favorite['shop'] = await shop_element.inner_text()
                    
                    if favorite:
                        favorites.append(favorite)
                        
                except Exception as item_error:
                    continue
            
            return favorites
            
        except Exception as e:
            return [{"error": f"Failed to get favorites: {str(e)}"}]
    
    async def get_purchase_history(self) -> List[Dict]:
        """Get recent purchase history"""
        if not self.is_logged_in:
            return [{"error": "Not logged in"}]
        
        try:
            # Navigate to purchase history
            await self.page.goto('https://www.etsy.com/your/purchases', wait_until='networkidle')
            
            purchases = []
            
            # Wait for purchases to load
            await self.page.wait_for_timeout(2000)
            
            # Get purchase items
            purchase_items = await self.page.query_selector_all('.purchase-review-wrapper')
            
            for item in purchase_items[:5]:  # Limit to first 5 purchases
                try:
                    title_element = await item.query_selector('.listing-link')
                    shop_element = await item.query_selector('.shop-name')
                    date_element = await item.query_selector('.purchase-date')
                    
                    purchase = {}
                    
                    if title_element:
                        purchase['title'] = await title_element.inner_text()
                    
                    if shop_element:
                        purchase['shop'] = await shop_element.inner_text()
                    
                    if date_element:
                        purchase['date'] = await date_element.inner_text()
                    
                    if purchase:
                        purchases.append(purchase)
                        
                except Exception as item_error:
                    continue
            
            return purchases
            
        except Exception as e:
            return [{"error": f"Failed to get purchase history: {str(e)}"}]
    
    async def close(self):
        """Close browser and cleanup"""
        if self.browser:
            await self.browser.close()
        if hasattr(self, 'playwright'):
            await self.playwright.stop()