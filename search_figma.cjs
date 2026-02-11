const fs = require('fs');
const data = JSON.parse(fs.readFileSync('C:/Users/Elhanan/.claude/projects/c--Users-Elhanan-source-repos-PmadManagerUI-V2/4ef30be4-b871-4da2-a87f-a8783425510c/tool-results/mcp-figma-remote-mcp-get_design_context-1770796365786.txt', 'utf-8'));
const text = JSON.stringify(data);

// Search the ENTIRE file for login-related content
for (const kw of ['Sign in', 'sign in', 'Login', 'login', 'Email', 'Password', 'Forgot', 'PMD', 'Frame 1085', 'Sign in to']) {
    let searchPos = 0;
    let count = 0;
    while (count < 5) {
        const idx = text.indexOf(kw, searchPos);
        if (idx === -1) break;
        if (count === 0) console.log(`\n=== "${kw}" ===`);
        // Show short context
        console.log(`  pos ${idx}: ...${text.substring(Math.max(0, idx - 80), Math.min(text.length, idx + 120)).replace(/\\n/g, ' ')}...`);
        searchPos = idx + kw.length;
        count++;
    }
    if (count === 0) console.log(`\n=== "${kw}" === NOT FOUND`);
}
