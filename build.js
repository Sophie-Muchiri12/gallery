const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy static assets (CSS, JS, images) from public directory
const copyDirectory = (src, dest) => {
    if (!fs.existsSync(src)) return;
    
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
        const srcFile = path.join(src, file);
        const destFile = path.join(dest, file);
        
        if (fs.statSync(srcFile).isDirectory()) {
            copyDirectory(srcFile, destFile);
        } else {
            fs.copyFileSync(srcFile, destFile);
        }
    });
};

// Copy public assets to dist
if (fs.existsSync('public')) {
    copyDirectory('public', distDir);
}

// Render EJS to HTML
const renderEJSToHTML = async () => {
    try {
        // Path to your EJS file
        const ejsFile = path.join(__dirname, 'views', 'index.ejs');
        // Or if it's in root: const ejsFile = path.join(__dirname, 'index.ejs');
        
        // Data to pass to your EJS template (customize as needed)
        const templateData = {
            title: "Sophie's Gallery - DevOps Milestones",
            milestones: [
                { id: 2, name: "MILESTONE 2", status: "completed", description: "Pipeline Setup" },
                { id: 3, name: "MILESTONE 3", status: "current", description: "Slack Integration" },
                { id: 4, name: "MILESTONE 4", status: "completed", description: "Static Deployment" }
            ],
            buildInfo: {
                repository: "Sophie-Muchiri12/gallery",
                buildTool: "Jenkins Pipeline",
                hosting: "Render Static"
            }
        };
        
        // Render EJS to HTML
        const html = await ejs.renderFile(ejsFile, templateData);
        
        // Write the rendered HTML to dist/index.html
        fs.writeFileSync(path.join(distDir, 'index.html'), html);
        
        console.log('✅ Successfully built static site!');
        console.log('📁 Files generated in dist/ directory');
        
    } catch (error) {
        console.error('❌ Error building static site:', error);
        process.exit(1);
    }
};

// Run the build
renderEJSToHTML();