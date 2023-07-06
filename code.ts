let hasDecimalPointPart = false;

async function loadFont() {
  await figma.loadFontAsync({ family: "Roboto", style: "Regular" });
}

async function addWarningText(node: SceneNode) {
  await loadFont();

  const box = figma.createRectangle();
  box.fills = [{ type: "SOLID", color: { r: 1, g: 0.9, b: 0 }, opacity: 1.0 }];

  const warningText = figma.createText();
  warningText.fontName = { family: "Roboto", style: "Regular" };
  warningText.characters = "DO NOT USE DECIMAL POINT";
  warningText.fontSize = 8;
  warningText.fills = [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }];

  box.resize(warningText.width + 10, warningText.height + 4);

  warningText.x = box.x + (box.width - warningText.width) / 2;
  warningText.y = box.y + (box.height - warningText.height) / 2;

  const group = figma.group([box, warningText], figma.currentPage);
  group.x = node.x;
  group.y = node.y - box.height - 2;

  if (node.parent && node.parent.type !== "PAGE") {
    node.parent.appendChild(group);
    group.name = "DO NOT USE DECIMAL POINT";
  }
}

async function traverse(node: SceneNode) {
  if ("children" in node) {
    for (const child of node.children) {
      await traverse(child);
    }
  }

  if (
    "x" in node &&
    "y" in node &&
    "width" in node &&
    "height" in node &&
    [
      "VECTOR",
      "STAR",
      "LINE",
      "ELLIPSE",
      "POLYGON",
      "RECTANGLE",
      "TEXT",
      "BOOLEAN_OPERATION",
    ].includes(node.type)
  ) {
    if (
      node.x % 1 !== 0 ||
      node.y % 1 !== 0 ||
      node.width % 1 !== 0 ||
      node.height % 1 !== 0
    ) {
      hasDecimalPointPart = true;
      await addWarningText(node);
    }
  }
}

figma.on("run", async () => {
  for (const page of figma.root.children) {
    if (page.type === "PAGE") {
      for (const child of page.children) {
        await traverse(child);
      }
    }
  }

  if (!hasDecimalPointPart) {
    figma.notify("Perfect components!");
  }

  figma.closePlugin();
});
