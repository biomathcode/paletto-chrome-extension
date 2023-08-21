// contentScript.js

// Function to extract CSS variables from a stylesheet
function extractCSSVariables(styleSheet) {
  const variables = [];
  const value = [];
  const cssRules = styleSheet.cssRules || styleSheet.rules;

  for (const rule of cssRules) {
    if (rule instanceof CSSStyleRule) {
      const style = rule.style;
      for (let i = 0; i < style.length; i++) {
        const property = style[i];
        if (property.startsWith("--")) {
          const value = style.getPropertyValue(property).trim();
          variables.push({ name: property, value: value });
        }
      }
    }
  }

  return variables;
}

// Extract and send CSS variables to the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "extractCSSVariables") {
    const styleSheets = document.styleSheets;
    const variables = [];

    for (const sheet of styleSheets) {
      const extractedVariables = extractCSSVariables(sheet);
      variables.push(...extractedVariables);
    }

    sendResponse({ variables });
  }
});

// Send a message to the background script to initiate extraction
chrome.runtime.sendMessage({ action: "initiateExtraction" });
