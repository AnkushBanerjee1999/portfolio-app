const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    // Ensure useSearch is imported
    if (!content.includes('useSearch')) {
        content = content.replace(
            /import \{ ([^}]+) \} from '\.\.\/SearchContext';/,
            (match, p1) => {
                if (p1.includes('useSearch')) return match;
                return `import { ${p1}, useSearch } from '../SearchContext';`;
            }
        );
        // If not from SearchContext, maybe it's not imported at all
        if (!content.includes('import { useSearch } from \'../SearchContext\';')) {
            content = content.replace(/import \{ ([^}]+) \} from '\.\.\/CartContext';/, match => `import { useSearch } from '../SearchContext';\n${match}`);
        }
        modified = true;
    }

    // Initialize useSearch
    if (!content.includes('const { openSearch } = useSearch()')) {
        const componentMatch = content.match(/const \w+ = \(\) => \{/);
        if (componentMatch) {
            content = content.replace(componentMatch[0], `${componentMatch[0]}\n  const { openSearch } = useSearch();`);
            modified = true;
        }
    }

    // Remove the boring search input and replace with the creative search button
    const searchPartRegex = /<div className="relative hidden lg:block group">\s*<span[^>]*>search<\/span>\s*<input[^>]*>\s*<\/div>\s*<button onClick=\{\(\) => navigate\('\/shop'\)\}[^>]*>\s*<span[^>]*>search<\/span>\s*<\/button>/;
    
    const creativeSearchButton = `<button 
              onClick={openSearch} 
              className="cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70 group flex items-center gap-2"
            >
              <span className="material-symbols-outlined group-hover:text-accent-funky transition-colors" data-icon="search">search</span>
              <span className="font-label-sm uppercase tracking-widest hidden xl:block group-hover:text-accent-funky transition-colors">Quick Search</span>
            </button>`;

    if (content.match(searchPartRegex)) {
        content = content.replace(searchPartRegex, creativeSearchButton);
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated to creative search in ${file}`);
    }
});
