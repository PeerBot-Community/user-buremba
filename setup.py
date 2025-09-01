#!/usr/bin/env python3
"""
Setup script for Etsy Scraper Streamlit App
"""

import subprocess
import sys
import os

def install_requirements():
    """Install Python requirements"""
    try:
        print("Installing Python requirements...")
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], check=True)
        print("✅ Python requirements installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing requirements: {e}")
        return False
    return True

def install_playwright_browsers():
    """Install Playwright browsers"""
    try:
        print("Installing Playwright browsers...")
        subprocess.run([sys.executable, "-m", "playwright", "install", "chromium"], check=True)
        print("✅ Playwright browsers installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error installing Playwright browsers: {e}")
        return False
    return True

def main():
    print("🚀 Setting up Etsy Scraper Streamlit App...")
    
    if not install_requirements():
        sys.exit(1)
    
    if not install_playwright_browsers():
        sys.exit(1)
    
    print("\n✅ Setup completed successfully!")
    print("\n📋 To run the application:")
    print("   streamlit run app.py")

if __name__ == "__main__":
    main()