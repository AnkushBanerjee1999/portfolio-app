const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir);

files.forEach(file => {
    if (!file.endsWith('.js')) return;
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    // Check if navigate is used
    if (content.includes('navigate(')) {
        // Ensure useNavigate is imported
        if (!content.includes('useNavigate')) {
            if (content.includes('import { Link } from \'react-router-dom\';')) {
                content = content.replace('import { Link } from \'react-router-dom\';', 'import { Link, useNavigate } from \'react-router-dom\';');
            } else if (content.includes('import { Link, useSearchParams } from \'react-router-dom\';')) {
                 content = content.replace('import { Link, useSearchParams } from \'react-router-dom\';', 'import { Link, useNavigate, useSearchParams } from \'react-router-dom\';');
            } else if (content.includes('import { Link, useLocation } from \'react-router-dom\';')) {
                 content = content.replace('import { Link, useLocation } from \'react-router-dom\';', 'import { Link, useNavigate, useLocation } from \'react-router-dom\';');
            } else {
                // Fallback: just add the import if any react-router-dom import exists
                content = content.replace(/import \{ ([^}]+) \} from 'react-router-dom';/, (match, p1) => {
                    if (p1.includes('useNavigate')) return match;
                    return `import { ${p1}, useNavigate } from 'react-router-dom';`;
                });
            }
            modified = true;
        }

        // Ensure const navigate = useNavigate(); is defined
        if (!content.includes('const navigate = useNavigate();')) {
            // Find the start of the component
            const componentMatch = content.match(/const \w+ = \(\) => \{/);
            if (componentMatch) {
                content = content.replace(componentMatch[0], `${componentMatch[0]}\n  const navigate = useNavigate();`);
                modified = true;
            }
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed navigate in ${file}`);
    }
});
