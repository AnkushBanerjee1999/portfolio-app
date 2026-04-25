const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    // Check if openSearch or useSearch is used
    if (content.includes('openSearch') || content.includes('useSearch(')) {
        // Ensure useSearch is imported
        if (!content.includes('import { useSearch } from \'../SearchContext\';')) {
            // Find a good place to insert (after useTheme or useCart)
            if (content.includes('import { useTheme } from \'../ThemeContext\';')) {
                content = content.replace('import { useTheme } from \'../ThemeContext\';', 'import { useTheme } from \'../ThemeContext\';\nimport { useSearch } from \'../SearchContext\';');
                modified = true;
            } else if (content.includes('import { useCart } from \'../CartContext\';')) {
                content = content.replace('import { useCart } from \'../CartContext\';', 'import { useSearch } from \'../SearchContext\';\nimport { useCart } from \'../CartContext\';');
                modified = true;
            } else {
                // Fallback: after first import
                content = content.replace(/(import .*;\n)/, `$1import { useSearch } from '../SearchContext';\n`);
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Verified useSearch import in ${file}`);
    }
});
