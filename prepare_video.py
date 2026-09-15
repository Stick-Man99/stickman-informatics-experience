"""Create browser-compatible local copies; never modify or upload the PPT video."""
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT / '.tools' / 'media'))
import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
source = ROOT / 'assets' / 'infosci-course.mp4'
mode = sys.argv[1] if len(sys.argv) > 1 else 'inspect'
if mode == 'inspect':
    subprocess.run([ffmpeg, '-hide_banner', '-i', str(source)], check=False)
elif mode == 'webm':
    subprocess.run([
        ffmpeg, '-hide_banner', '-loglevel', 'error', '-nostats', '-y', '-i', str(source),
        '-map', '0:v:0', '-map', '0:a:0?',
        '-vf', 'scale=1280:-2', '-c:v', 'libvpx-vp9',
        '-b:v', '0', '-crf', '31', '-deadline', 'realtime',
        '-cpu-used', '6', '-row-mt', '1', '-threads', '4',
        '-pix_fmt', 'yuv420p', '-c:a', 'libopus', '-b:a', '128k',
        str(ROOT / 'assets' / 'infosci-course-browser.webm')
    ], check=True)
elif mode == 'mp4':
    subprocess.run([
        ffmpeg, '-hide_banner', '-loglevel', 'error', '-nostats', '-y', '-i', str(source),
        '-map', '0:v:0', '-map', '0:a:0?',
        '-c', 'copy', '-movflags', '+faststart',
        str(ROOT / 'assets' / 'infosci-course-browser.mp4')
    ], check=True)
elif mode == 'poster':
    subprocess.run([
        ffmpeg, '-hide_banner', '-n', '-ss', '5', '-i', str(source),
        '-frames:v', '1', '-vf', 'scale=1280:-2', '-q:v', '2',
        '-update', '1', str(ROOT / 'assets' / 'infosci-poster.jpg')
    ], check=True)
elif mode == 'pages-webm':
    # A GitHub Pages friendly copy: small enough for browser upload, still with audio.
    subprocess.run([
        ffmpeg, '-hide_banner', '-loglevel', 'error', '-nostats', '-y', '-i', str(source),
        '-map', '0:v:0', '-map', '0:a:0?',
        '-vf', 'scale=854:-2', '-c:v', 'libvpx-vp9', '-b:v', '420k', '-crf', '34',
        '-deadline', 'good', '-cpu-used', '5', '-row-mt', '1', '-threads', '4',
        '-pix_fmt', 'yuv420p', '-c:a', 'libopus', '-b:a', '64k',
        str(ROOT / 'assets' / 'infosci-course-pages.webm')
    ], check=True)
else:
    raise SystemExit('Use inspect, webm, mp4 or poster')
