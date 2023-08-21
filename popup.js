// popup.js

// Function to display CSS variables and their values in the popup

function isNumber(string) {
  var pattern = /^[0-9]+$/;
  return pattern.test(string);
}
function displayCSSVariables(variables) {
  const ul = document.getElementById("cssVariablesList");

  const shadow_ul = document.getElementById("cssVariablesShadow");

  const shape_ul = document.getElementById("cssVariablesSpace");

  const font_ul = document.getElementById("cssVariablesFont");

  variables.forEach((variable) => {
    const li = document.createElement("li");

    const sn = document.createElement("span");
    sn.style.height = "10px";
    sn.style.width = "10px";
    sn.style.display = "inline-block";
    sn.style.border = "1px solid #000";
    sn.style.background = variable.value;
    // int.value = `${variable.value}`;
    li.textContent = `${variable.name}: ${variable.value}`;

    li.append(sn);

    if (variable.name.includes("shadow") || variable.name.includes("Shadow")) {
      sn.style.boxShadow = variable.value;

      shadow_ul.appendChild(li);
    } else if (
      variable.value.includes("rem") ||
      variable.value.includes("px") ||
      isNumber(variable.value)
    ) {
      shape_ul.appendChild(li);
    } else if (
      variable.value.includes("monospace") ||
      variable.value.includes("Arial") ||
      variable.value.includes("Sans") ||
      variable.value.includes("sans") ||
      variable.value.includes("serif")
    ) {
      font_ul.appendChild(li);
    } else {
      ul.appendChild(li);
    }

    // ul.appendChild(int);
  });
}

// Send a message to the content script to extract CSS variables and their values
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { action: "extractCSSVariables" },
    (response) => {
      displayCSSVariables(response.variables);
    }
  );
});
