
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const AUTH_HEAD = "cpanel benlowre:TR0R4XKBZUJR22GR2GCTL7COI6D2KX7W";
const CPANEL_HOST = "https://pikkon-lon.krystal.uk:2083";
const PUBLIC_HOST = "https://benlowrey.com";
const BASE_REMOTE_DIR = "public_html/wp-content/uploads";
const LOCAL_DIR = path.join(__dirname, '../src/assets/uploads');

if (!fs.existsSync(LOCAL_DIR)) {
    fs.mkdirSync(LOCAL_DIR, { recursive: true });
}

async function listDir(dir) {
    console.log(`Listing ${dir}...`);
    try {
        const url = `${CPANEL_HOST}/execute/Fileman/list_files?dir=${encodeURIComponent(dir)}`;
        const cmd = `curl -s -H "Authorization: ${AUTH_HEAD}" "${url}"`;
        const output = execSync(cmd).toString();
        const json = JSON.parse(output);

        if (json.errors) {
            console.error(`Error listing ${dir}:`, json.errors);
            return [];
        }
        return json.data || [];
    } catch (e) {
        console.error(`Exception listing ${dir}`, e.message);
        return [];
    }
}

async function downloadFile(remotePath, localPath) {
    const relativePath = remotePath.replace('public_html/', '');
    const url = `${PUBLIC_HOST}/${relativePath}`;

    // Ensure local dir exists
    const dir = path.dirname(localPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    if (fs.existsSync(localPath)) {
        console.log(`Skipping existing: ${localPath}`);
        return;
    }

    console.log(`Downloading ${url} -> ${localPath}`);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(localPath);
        https.get(url, response => {
            if (response.statusCode !== 200) {
                fs.unlink(localPath, () => { });
                console.error(`Failed to download ${url}: ${response.statusCode}`);
                resolve(false);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(true);
            });
        }).on('error', err => {
            fs.unlink(localPath, () => { });
            console.error(`Error downloading ${url}: ${err.message}`);
            resolve(false);
        });
    });
}

async function processDir(dir) {
    const items = await listDir(dir);
    for (const item of items) {
        if (item.type === 'dir') {
            // Basic exclude
            if (item.file === '.' || item.file === '..' || item.file === 'et_temp') continue;
            await processDir(item.fullpath.replace('/home/benlowre/', ''));
        } else if (item.type === 'file') {
            const ext = path.extname(item.file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
                const localRel = item.fullpath.replace('/home/benlowre/public_html/wp-content/uploads', '');
                const localPath = path.join(LOCAL_DIR, localRel);
                await downloadFile(item.fullpath.replace('/home/benlowre/', ''), localPath);
            }
        }
    }
}

(async () => {
    console.log("Starting recovery...");
    await processDir(BASE_REMOTE_DIR);
    console.log("Done!");
})();
