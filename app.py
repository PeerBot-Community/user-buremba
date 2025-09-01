import streamlit as st
import asyncio
import pandas as pd
from etsy_scraper import EtsyScraper
import time

st.set_page_config(
    page_title="Etsy Account Dashboard",
    page_icon="🛍️",
    layout="wide"
)

st.title("🛍️ Etsy Account Dashboard")
st.markdown("Enter your Etsy credentials to view your account information, favorites, and purchase history.")

# Initialize session state
if 'scraper' not in st.session_state:
    st.session_state.scraper = None
if 'logged_in' not in st.session_state:
    st.session_state.logged_in = False
if 'account_data' not in st.session_state:
    st.session_state.account_data = {}

# Sidebar for credentials
st.sidebar.header("Login Credentials")

with st.sidebar:
    email = st.text_input("Email", type="default", placeholder="your-email@example.com")
    password = st.text_input("Password", type="password", placeholder="Your password")
    
    login_button = st.button("🔐 Login to Etsy", type="primary")
    
    if st.session_state.logged_in:
        st.success("✅ Logged in successfully!")
        logout_button = st.button("🚪 Logout")
        if logout_button:
            if st.session_state.scraper:
                try:
                    asyncio.run(st.session_state.scraper.close())
                except:
                    pass
            st.session_state.scraper = None
            st.session_state.logged_in = False
            st.session_state.account_data = {}
            st.rerun()

# Login functionality
if login_button and email and password:
    if not st.session_state.logged_in:
        with st.spinner("Logging in to Etsy... This may take a moment."):
            try:
                # Create new scraper instance
                scraper = EtsyScraper()
                
                # Run the login process
                async def login_process():
                    await scraper.start_browser(headless=True)
                    login_success = await scraper.login(email, password)
                    return login_success
                
                login_success = asyncio.run(login_process())
                
                if login_success:
                    st.session_state.scraper = scraper
                    st.session_state.logged_in = True
                    st.success("Login successful! 🎉")
                    st.rerun()
                else:
                    st.error("Login failed. Please check your credentials.")
                    if scraper:
                        try:
                            asyncio.run(scraper.close())
                        except:
                            pass
                    
            except Exception as e:
                st.error(f"An error occurred during login: {str(e)}")

# Main content area
if st.session_state.logged_in and st.session_state.scraper:
    
    # Create tabs for different sections
    tab1, tab2, tab3 = st.tabs(["📊 Account Info", "❤️ Favorites", "🛒 Purchase History"])
    
    with tab1:
        st.header("Account Information")
        
        if st.button("🔄 Refresh Account Info"):
            with st.spinner("Fetching account information..."):
                try:
                    async def get_account():
                        return await st.session_state.scraper.get_account_info()
                    
                    account_info = asyncio.run(get_account())
                    st.session_state.account_data['account_info'] = account_info
                    
                except Exception as e:
                    st.error(f"Error fetching account info: {str(e)}")
        
        if 'account_info' in st.session_state.account_data:
            account_info = st.session_state.account_data['account_info']
            
            if 'error' not in account_info:
                col1, col2 = st.columns(2)
                
                with col1:
                    st.metric("Name", account_info.get('name', 'Not available'))
                
                with col2:
                    st.metric("Email", account_info.get('email', 'Not available'))
            else:
                st.error(f"Error: {account_info['error']}")
    
    with tab2:
        st.header("Your Favorites")
        
        if st.button("🔄 Refresh Favorites"):
            with st.spinner("Fetching your favorites..."):
                try:
                    async def get_favs():
                        return await st.session_state.scraper.get_favorites()
                    
                    favorites = asyncio.run(get_favs())
                    st.session_state.account_data['favorites'] = favorites
                    
                except Exception as e:
                    st.error(f"Error fetching favorites: {str(e)}")
        
        if 'favorites' in st.session_state.account_data:
            favorites = st.session_state.account_data['favorites']
            
            if favorites and 'error' not in str(favorites[0]):
                if len(favorites) > 0:
                    df = pd.DataFrame(favorites)
                    st.dataframe(df, use_container_width=True)
                    
                    # Display favorites in a more visual way
                    for fav in favorites:
                        with st.expander(f"⭐ {fav.get('title', 'Unknown Item')}"):
                            col1, col2, col3 = st.columns(3)
                            with col1:
                                st.write(f"**Price:** {fav.get('price', 'N/A')}")
                            with col2:
                                st.write(f"**Shop:** {fav.get('shop', 'N/A')}")
                            with col3:
                                if fav.get('url'):
                                    st.link_button("View Item", fav['url'])
                else:
                    st.info("No favorites found.")
            else:
                if favorites:
                    st.error(f"Error fetching favorites: {favorites[0].get('error', 'Unknown error')}")
    
    with tab3:
        st.header("Purchase History")
        
        if st.button("🔄 Refresh Purchase History"):
            with st.spinner("Fetching your purchase history..."):
                try:
                    async def get_purchases():
                        return await st.session_state.scraper.get_purchase_history()
                    
                    purchases = asyncio.run(get_purchases())
                    st.session_state.account_data['purchases'] = purchases
                    
                except Exception as e:
                    st.error(f"Error fetching purchase history: {str(e)}")
        
        if 'purchases' in st.session_state.account_data:
            purchases = st.session_state.account_data['purchases']
            
            if purchases and 'error' not in str(purchases[0]):
                if len(purchases) > 0:
                    df = pd.DataFrame(purchases)
                    st.dataframe(df, use_container_width=True)
                    
                    # Display purchases in a timeline view
                    for purchase in purchases:
                        with st.expander(f"📦 {purchase.get('title', 'Unknown Item')}"):
                            col1, col2 = st.columns(2)
                            with col1:
                                st.write(f"**Shop:** {purchase.get('shop', 'N/A')}")
                            with col2:
                                st.write(f"**Date:** {purchase.get('date', 'N/A')}")
                else:
                    st.info("No purchase history found.")
            else:
                if purchases:
                    st.error(f"Error fetching purchases: {purchases[0].get('error', 'Unknown error')}")

else:
    # Show welcome message when not logged in
    st.info("👈 Please enter your Etsy credentials in the sidebar to get started.")
    
    st.markdown("""
    ### Features:
    - 📊 **Account Information**: View your basic account details
    - ❤️ **Favorites**: Browse your favorite items with links
    - 🛒 **Purchase History**: Review your recent purchases
    
    ### Security Notes:
    - Your credentials are only used for this session
    - Data is not stored permanently
    - The browser runs in headless mode for privacy
    """)

# Footer
st.markdown("---")
st.markdown("⚠️ **Disclaimer**: This tool is for personal use only. Use responsibly and in accordance with Etsy's Terms of Service.")