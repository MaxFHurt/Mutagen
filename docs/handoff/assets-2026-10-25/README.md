# MUTAGEN Assets — GitHub-ready folders (each <25 MB)

These are the complete files extracted from:
- `MUTAGEN-Assembled-Assets-Part-1-of-2.zip`
- `MUTAGEN-Assembled-Assets-Part-2-of-2.zip`

All **145 original files** are included once, with their **original filenames and directory paths preserved inside each numbered batch**. Five top-level reference/metadata files remain at the root. PNGs and previews are fully extracted, not fragments of a ZIP.

## Upload layout

The **eight numbered folders** are deliberately kept under **25,000,000 bytes each** (decimal MB), with no single contained file anywhere close to the limit. Each can be uploaded separately to GitHub. Keep the numbered folder names, because some asset paths repeat across batches at different levels. The individual batch ZIPs supplied alongside the master download are also under 25 MB each.

| Folder | Files | Original bytes | Size (decimal MB) |
|---|---:|---:|---:|
| 01-iPhone-and-Branding | 51 | 22,743,754 | 22.74 MB |
| 02-iPad-Game-Actions-Assembled | 12 | 18,262,388 | 18.26 MB |
| 03-iPad-Game-Actions-Animation | 12 | 18,337,368 | 18.34 MB |
| 04-iPad-Home-Assembled | 7 | 13,454,975 | 13.45 MB |
| 05-iPad-Home-Animation | 7 | 13,586,904 | 13.59 MB |
| 06-iPad-Navigation | 12 | 15,984,524 | 15.98 MB |
| 07-UI-Components | 12 | 10,524,828 | 10.52 MB |
| 08-Labels | 27 | 14,302,722 | 14.30 MB |

Total source files: **145**. Asset/reference data: **127,689,619 bytes**.

## Accessing the assets

- Within each batch, the paths after the batch folder follow the original `ui/...` layout.
- `UPLOAD-MANIFEST.json` maps every original path to the exact batch folder and stores SHA-256 hashes and sizes for verification.
- To reassemble the original `ui/...` directory as one coherent tree, run `python MERGE-ORIGINAL-LAYOUT.py` from the extracted master folder. No new artwork or source files are generated; it only copies the existing originals into one common tree.
- The original five top-level metadata/reference files are in this top folder. They are included in the manifest.

**No changes were made to GitHub.** These files are prepared for download and manual upload.
