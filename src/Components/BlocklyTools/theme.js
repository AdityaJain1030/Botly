import Blockly from "node-blockly/browser";

const fontStyle = {
  family: "Raleway, sans serif",
  weight: "bold",
  size: 12
};

const componentStyle = {
  workspaceBackgroundColour: "#E2E2E2",
  toolboxBackgroundColour: "#6DB2ee",
  flyoutBackgroundColor: "red",
  flyoutOpacity: "100"
};

const stone = (Blockly.Theme.defineTheme = {
  ...Blockly.Themes.Classic,
  fontStyle: fontStyle,
  componentStyles: componentStyle
});

export default stone;
