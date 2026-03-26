import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const assetsDir = path.resolve("public/assets");
const supportedExtensions = new Set([".jpg", ".jpeg", ".png"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();

    if (!supportedExtensions.has(extension)) {
      continue;
    }

    await generateWebp(fullPath);
  }
}

async function generateWebp(sourcePath) {
  const outputPath = sourcePath.replace(/\.(png|jpe?g)$/i, ".webp");
  const sourceStats = await stat(sourcePath);

  try {
    const outputStats = await stat(outputPath);

    if (outputStats.mtimeMs >= sourceStats.mtimeMs) {
      return;
    }
  } catch {
    await mkdir(path.dirname(outputPath), { recursive: true });
  }

  await sharp(sourcePath)
    .webp({ quality: 82 })
    .toFile(outputPath);

  console.log(`generated ${path.relative(process.cwd(), outputPath)}`);
}

await walk(assetsDir);
