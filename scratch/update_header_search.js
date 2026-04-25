const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Add localSearch state if not present
    if (!content.includes('const [localSearch, setLocalSearch]')) {
        content = content.replace(
            /const \[isMobileMenuOpen, setIsMobileMenuOpen\] = useState\(false\);/,
            "const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n  const [localSearch, setLocalSearch] = useState('');"
        );
    }

    // Flexible regex for the search button in the header
    const searchPartRegex = /<button[^>]*>\s*<span[^>]*>search<\/span>\s*<\/button>/;
    
    const newSearchPart = `<div className="relative hidden lg:block group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-gray-400 z-10" data-icon="search">search</span>
              <input 
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && navigate('/shop?search=' + localSearch)}
                className="pl-10 pr-4 py-2 bg-surface-container-low dark:bg-gray-900 border-b border-outline-variant dark:border-gray-700 focus:border-primary dark:focus:border-white focus:ring-0 w-48 focus:w-64 transition-all duration-300 font-body-md text-[16px] text-on-surface dark:text-white outline-none rounded-t-sm" 
                placeholder="Search..." 
                type="text"
              />
            </div>
            <button onClick={() => navigate('/shop')} className="lg:hidden cursor-pointer transition-transform active:scale-95 transition-all duration-500 ease-in-out hover:opacity-70">
              <span className="material-symbols-outlined" data-icon="search">search</span>
            </button>`;

    if (content.match(searchPartRegex)) {
        // We only want to replace the FIRST occurrence (the one in the header)
        // If it's ProductListingPage, it might have two. But the first one is usually header.
        content = content.replace(searchPartRegex, newSearchPart);
        fs.writeFileSync(filePath, content);
        console.log(`Updated search in ${file}`);
    } else {
        console.log(`Could not find search button in ${file}`);
    }
});
