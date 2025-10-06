# 🎬 Local Video Files Integration Guide

## How to Add Your .MOV and .MP4 Videos to the Website

### Step 1: Prepare Your Video Files

1. **Convert to MP4** (recommended for best compatibility):
   - Use HandBrake, VLC, or any video converter
   - Resolution: 1920x1080 or 1280x720 (HD quality)
   - Format: MP4 (H.264 codec)
   - File size: Keep under 50MB for fast loading

2. **Optimize for Web**:
   - Compress videos to reduce file size
   - Duration: 30-60 seconds works best
   - Remove audio if not needed (saves space)

### Step 2: Add Videos to Your Website

1. **Copy your video files** to: `public/videos/artworks/`
2. **Use descriptive filenames** like:
   - `wanted-for-racing-life.mp4`
   - `old-man-in-peace.mp4`
   - `100-usd-mick-jagger.mp4`
   - `i-have-a-dream.mp4`

### Step 3: Update Video Paths in Database

1. **Open**: `src/data/artworks.ts`
2. **Find the artwork** you want to add video to
3. **Add video field** like this:

```typescript
{
  id: 1,
  title: "Wanted for Racing Life",
  series: "Mugshot Collection",
  image: "/images/artworks/Fabian PhiL Wanted for Racing Life 2024 B&W.jpg",
  video: "/videos/artworks/wanted-for-racing-life.mp4", // Your video file
  year: "2024",
  // ... rest of artwork data
}
```

### Step 4: Video File Naming Convention

**Use this pattern for consistency:**
- **Mugshot Collection**: `wanted-for-[description].mp4`
- **Moving Hair Collection**: `[artwork-name].mp4`
- **100 USD Bill Collection**: `100-usd-[person].mp4`
- **Expressive Emotion Collection**: `[emotion-name].mp4`
- **Luminous Vision Collection**: `[artwork-name].mp4`

### Step 5: Test Your Videos

1. **Start your website**: `npm run dev`
2. **Go to Gallery** page
3. **Look for red "Video Available" badges**
4. **Click video button** to test playback
5. **Check on mobile** to ensure compatibility

---

## 🎯 Current Video Setup

### **Videos Already Configured:**
1. **"Wanted for Racing Life"** → `wanted-for-racing-life.mp4`
2. **"Wanted for Racing in Monaco"** → `wanted-for-racing-in-monaco.mp4`
3. **"100 USD Mick Jagger"** → `100-usd-mick-jagger.mp4`
4. **"Old Man in Peace"** → `old-man-in-peace.mp4`
5. **"I have a Dream"** → `i-have-a-dream.mp4`

### **Add These Video Files:**
```
public/videos/artworks/
├── wanted-for-racing-life.mp4
├── wanted-for-racing-in-monaco.mp4
├── 100-usd-mick-jagger.mp4
├── old-man-in-peace.mp4
└── i-have-a-dream.mp4
```

---

## 🚀 Benefits of Local Videos

### **Performance:**
- **Faster loading** - No external API calls
- **Better reliability** - No Instagram dependency
- **Full control** - You own the content
- **Offline capable** - Works without internet

### **User Experience:**
- **Instant playback** - No loading delays
- **Professional controls** - Play, pause, mute, fullscreen
- **Mobile optimized** - Works on all devices
- **Consistent quality** - Same experience everywhere

### **For Your Business:**
- **No external dependencies** - Instagram can't break your videos
- **Better SEO** - Search engines can index your content
- **Analytics** - Track video engagement
- **Custom branding** - Your videos, your brand

---

## 📱 Video Player Features

### **Controls Available:**
- **Play/Pause** - Click video or play button
- **Mute/Unmute** - Audio control
- **Fullscreen** - Expand to full screen
- **Loop** - Videos repeat automatically
- **Hover effects** - Controls appear on hover

### **Mobile Support:**
- **Touch controls** - Tap to play/pause
- **Responsive design** - Adapts to screen size
- **Auto-play** - Videos start when opened
- **Optimized loading** - Fast on mobile networks

---

## 🛠️ Troubleshooting

### **Video Not Playing?**
- Check file path is correct
- Ensure file is in `public/videos/artworks/`
- Verify file format (MP4 recommended)
- Check file size (under 50MB)

### **Video Not Showing?**
- Verify video field exists in artwork data
- Check filename matches exactly
- Ensure file uploaded successfully
- Refresh browser cache

### **Slow Loading?**
- Compress video file size
- Use MP4 format
- Consider shorter duration
- Optimize video resolution

---

## 📋 Quick Checklist

- [ ] Video files converted to MP4
- [ ] Files copied to `public/videos/artworks/`
- [ ] Filenames follow naming convention
- [ ] Video paths updated in `artworks.ts`
- [ ] Website tested with videos
- [ ] Mobile compatibility checked
- [ ] File sizes optimized

**Ready to showcase your kinetic artworks with professional video integration!**




