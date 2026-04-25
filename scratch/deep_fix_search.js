const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    // 1. Ensure correct imports
    if (!content.includes('useSearch')) {
        if (content.includes('import { useTheme } from \'../ThemeContext\';')) {
            content = content.replace('import { useTheme } from \'../ThemeContext\';', 'import { useTheme } from \'../ThemeContext\';\nimport { useSearch } from \'../SearchContext\';');
        } else if (content.includes('import { useCart } from \'../CartContext\';')) {
            content = content.replace('import { useCart } from \'../CartContext\';', 'import { useSearch } from \'../SearchContext\';\nimport { useCart } from \'../CartContext\';');
        }
        modified = true;
    }

    // 2. Ensure openSearch is defined
    if (!content.includes('const { openSearch } = useSearch()')) {
        const componentMatch = content.match(/const \w+ = \(\) => \{/);
        if (componentMatch) {
            content = content.replace(componentMatch[0], `${componentMatch[0]}\n  const { openSearch } = useSearch();`);
            modified = true;
        }
    }

    // 3. Robust replacement of the search block
    // We look for the div containing trailing icons and replace the search-related parts
    
    // Find the start of the trailing icons div
    const trailingIconsStart = content.indexOf('flex gap-6 items-center text-black dark:text-white');
    if (trailingIconsStart !== -1) {
        // Look for the search button/input within a reasonable range from here
        const searchPattern = /<div className="relative hidden lg:block group">[\s\S]*?<\/div>\s*<button onClick=\{\(\) => navigate\('\/shop'\)\}[^>]*>\s*<span[^>]*>search<\/span>\s*<\/button>/;
        
        const creativeSearchButton = `<button 
              onClick={openSearch} 
              className="cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70 group flex items-center gap-2"
            >
              <span className="material-symbols-outlined group-hover:text-accent-funky transition-colors" data-icon="search">search</span>
              <span className="font-label-sm uppercase tracking-widest hidden xl:block group-hover:text-accent-funky transition-colors">Quick Search</span>
            </button>`;

        if (content.match(searchPattern)) {
            content = content.replace(searchPattern, creativeSearchButton);
            modified = true;
        } else {
            // Try another variation (without data-icon or different attributes)
             const searchPattern2 = /<div className="relative hidden lg:block group">[\s\S]*?<\/div>\s*<button [^>]*onClick=\{\(\) => navigate\('\/shop'\)\}[^>]*>[\s\S]*?<\/button>/;
             if (content.match(searchPattern2)) {
                content = content.replace(searchPattern2, creativeSearchButton);
                modified = true;
             }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Deep fixed search in ${file}`);
    }
});
