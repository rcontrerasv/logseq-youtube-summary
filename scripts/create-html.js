const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');
const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>YouTube Summary Plugin</title>
</head>
<body>
  <script src="./index.js"></script>
</body>
</html>`;

// Asegurar que el directorio dist existe
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Escribir el archivo HTML
fs.writeFileSync(path.join(distDir, 'index.html'), htmlContent, 'utf8');
console.log('✅ index.html creado en dist/');

