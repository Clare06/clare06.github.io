from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()

        # Use http server
        page.goto("http://localhost:8000/index.html")

        print("Page loaded.")

        # Click the toggle button
        toggle_btn = page.locator("#spidey-toggle")
        if toggle_btn.is_visible():
            print("Toggle button found. Clicking...")
            toggle_btn.click()
            # Wait for transition (approx 2s + buffer)
            page.wait_for_timeout(3000)
        else:
            print("Toggle button NOT found!")
            return

        # Check for Spidey Mode class
        if "spidey-mode" in page.eval_on_selector("body", "e => e.className"):
            print("Switched to Spidey Mode.")
        else:
            print("Failed to switch to Spidey Mode.")
            return

        # 1. Verify Colors (Background #111111)
        bg_color = page.eval_on_selector("body", "e => getComputedStyle(e).backgroundColor")
        print(f"Background Color: {bg_color}")
        if "17, 17, 17" in bg_color: # rgb(17, 17, 17) is #111111
            print("Background color matches #111111.")
        else:
            print("Background color mismatch!")

        # 2. Verify Desktop CV Button
        desktop_cv = page.locator(".spidey-nav-btn")
        if desktop_cv.is_visible():
            print("Desktop CV button is visible.")
        else:
            print("Desktop CV button is MISSING!")

        # 3. Verify Web Decoration Position
        web_style = page.eval_on_selector(".spider-web-bg", "e => { const s = getComputedStyle(e); return {pos: s.position, top: s.top, right: s.right}; }")
        print(f"Web Position: {web_style}")
        if web_style['pos'] == 'fixed' and (web_style['top'] == '0px' or web_style['top'] == '0') and (web_style['right'] == '0px' or web_style['right'] == '0'):
             print("Spider web is correctly positioned at Top-Right.")
        else:
             print("Spider web positioning incorrect!")

        # 4. Verify Project Titles
        project_titles = page.locator(".spidey-card h3").all_inner_texts()
        print("Project Titles found:", project_titles)
        expected_projects = [
            "Parking Slot Allocation Service",
            "End-to-End Encrypted Chat",
            "Supermarket Microservices",
            "Route Optimization System",
            "Travel Recommendation System"
        ]

        all_found = True
        for proj in expected_projects:
            found = False
            for title in project_titles:
                if proj.upper() in title.upper(): # Titles are uppercase in CSS
                    found = True
                    break
            if not found:
                print(f"Missing Project: {proj}")
                all_found = False

        if all_found:
            print("All requested projects are present.")

        # Screenshot
        page.screenshot(path="spidey_v2_check.png")
        print("Screenshot saved to spidey_v2_check.png")

        browser.close()

if __name__ == "__main__":
    run()
