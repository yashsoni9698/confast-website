# Hero background videos

The home page hero (`src/components/sections/HeroSection.tsx`) looks for these
files. Drop your `.mp4` clips in this folder using these exact names:

| File                      | Slide topic                          |
| ------------------------- | ------------------------------------ |
| `hero-construction.mp4`   | Site / general construction          |
| `hero-tiling.mp4`         | Tile laying, adhesive application    |
| `hero-epoxy.mp4`          | Grouting, epoxy, finished surfaces   |
| `hero-waterproofing.mp4`  | Terrace / basement waterproofing     |

Video is opt-in so the browser never requests a file that is not there. After
dropping a clip in this folder, open `HeroSection.tsx` and uncomment the
matching `video:` line in the `FRAMES` list. Frames without a clip keep their
still image with a slow push-in, so the hero never renders blank.

## Recommended encoding

Hero videos are decorative and muted, so keep them small:

- 1920x1080 (or 1280x720 for a lighter page), H.264 / MP4
- 8–12 seconds, seamless loop
- No audio track needed
- Target under 3 MB per clip

```bash
ffmpeg -i source.mp4 -t 10 -vf "scale=1920:-2" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart hero-construction.mp4
```

## Where to get free footage

Search "construction site", "tile installation", or "concrete pouring" on
[Pexels Videos](https://www.pexels.com/videos/) or
[Coverr](https://coverr.co/) — both allow commercial use without attribution.

Download the file, rename it to match the table above, and drop it here. The
hero picks it up on the next page load.
