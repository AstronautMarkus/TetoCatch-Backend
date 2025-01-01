import yt_dlp

def get_youtube_info(url):
    try:
        ydl_opts = {"simulate": True, "format": "best"}
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)

        # Filtrar formatos útiles
        filtered_formats = [
            {
                "format_id": fmt.get("format_id"),
                "quality": fmt.get("format_note", "unknown"),
                "extension": fmt.get("ext", "unknown"),
                "resolution": fmt.get("resolution", "unknown"),
            }
            for fmt in info.get("formats", [])
            if fmt.get("ext") in ["mp4", "m4a"]
        ]

        return {
            "title": info.get("title"),
            "formats": filtered_formats,
        }
    except Exception as e:
        return {"error": str(e)}
