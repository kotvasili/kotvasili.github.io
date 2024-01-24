module.exports = {
  presets: ["next/babel", "@linaria"],
  plugins: [
    [
      "inline-react-svg",
      {
        //make sure to use svgomg manually for best result instead
        "svgo": false,
      }
    ]
  ],
};
