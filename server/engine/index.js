const manifest = require("../../dist/client/manifest.json");

const vendorCss = [manifest["vendors.css"], manifest["browser.css"]];
const vendorJs = [manifest["vendors.js"], manifest["browser.js"]];

export default ({ html, helmet, bundles }) => {
  let styles = bundles.filter(bundle => bundle.file.endsWith(".css"));
  let scripts = bundles.filter(bundle => bundle.file.endsWith(".js"));

  return `<!doctype html>
<html lang="en" ${helmet.htmlAttributes.toString()}>
<head>
    <meta charset="UTF-8">
    <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, minimum-scale=1, user-scalable=0"
    />
    <meta name="author" content="Huynh Minh Tu [React - NodeJS]">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon" href="/assets/images/icw.png">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <link rel="manifest" href="/assets/manifest.json">
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Montserrat:300,300i,400&amp;subset=vietnamese"
    />
    ${helmet.title.toString()}
    ${helmet.link.toString()}
    ${helmet.meta.toString()}
    ${vendorCss
      .map(style => {
        return `<link href="${style}" rel="stylesheet">`;
      })
      .join("\n")}
    ${styles
      .map(style => {
        return `<link href="/client/${style.file}" rel="stylesheet">`;
      })
      .join("\n")}
    <link rel="shortcut icon" href="/assets/favicon.ico">
</head>
<body ${helmet.bodyAttributes.toString()}>
    <div id="root">${html}</div>
    ${scripts
      .map(script => {
        return `<script type="text/javascript" src="/client/${script.file}"></script>`;
      })
      .join("\n")}
    ${vendorJs
      .map(style => {
        return `<script type="text/javascript" src="${style}"></script>`;
      })
      .join("\n")}
    <script>
    if ("serviceWorker" in navigator) {
        window.addEventListener("load", () => {
            navigator.serviceWorker.register("/sw.js");
        });
    }
    </script>
</body>
</html>`;
};
