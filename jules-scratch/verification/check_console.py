from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch()
    page = browser.new_page()

    # Collect console messages
    messages = []
    page.on("console", lambda msg: messages.append(msg.text))

    page.goto("http://localhost:5174/")

    # Print all console messages
    for msg in messages:
        print(msg)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
