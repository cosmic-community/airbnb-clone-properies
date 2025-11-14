const fs = require('fs');
const path = require('path');

const scriptTag = '<script src="/dashboard-console-capture.js"></script>';

function injectScript(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (content.includes('dashboard-console-capture.js')) {
      return;
    }
    
    if (content.includes('</head>')) {
      content = content.replace('</head>', `  ${scriptTag}\n</head>`);
    } else if (content.includes('<body>')) {
      content = content.replace('<body>', `<body>\n  ${scriptTag}`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected console capture script into ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      injectScript(filePath);
    }
  });
}

const outDir = path.join(process.cwd(), '.next');
if (fs.existsSync(outDir)) {
  processDirectory(outDir);
  console.log('Console capture script injection complete');
} else {
  console.log('Build directory not found. Run this script after building your application.');
}