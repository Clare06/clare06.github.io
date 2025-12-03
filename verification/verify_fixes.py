from playwright.sync_api import sync_playwright

def verify_fixes():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Mobile view
        context_mobile = browser.new_context(viewport={"width": 375, "height": 812})
        page_mobile = context_mobile.new_page()
        page_mobile.goto("file:///app/index.html")

        # Screenshot Top (Menu)
        page_mobile.screenshot(path="verification/mobile_menu_fix.png")

        # Open Menu
        page_mobile.click(".dropbtn")
        page_mobile.wait_for_timeout(500)
        page_mobile.screenshot(path="verification/mobile_menu_open.png")

        # Scroll to Footer
        page_mobile.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page_mobile.wait_for_timeout(500)
        page_mobile.screenshot(path="verification/mobile_footer_fix.png")

        # Check for horizontal scroll (whitespace)
        scroll_width = page_mobile.evaluate("document.body.scrollWidth")
        client_width = page_mobile.evaluate("document.documentElement.clientWidth")
        if scroll_width > client_width:
            print(f"FAIL: Horizontal scroll detected on mobile. Scroll: {scroll_width}, Client: {client_width}")
        else:
            print("PASS: No horizontal scroll on mobile.")

        # Desktop View
        context_desktop = browser.new_context(viewport={"width": 1920, "height": 1080})
        page_desktop = context_desktop.new_page()
        page_desktop.goto("file:///app/index.html")
        page_desktop.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page_desktop.wait_for_timeout(500)
        page_desktop.screenshot(path="verification/desktop_footer_fix.png")

        browser.close()

if __name__ == "__main__":
    verify_fixes()
