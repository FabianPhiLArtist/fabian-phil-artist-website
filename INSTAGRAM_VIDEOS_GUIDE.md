# 📱 Instagram Video Integration Guide

## How to Add Your Instagram Videos to the Website

### Step 1: Get Your Instagram Video URLs

1. **Open Instagram** on your phone or computer
2. **Find your video post** that showcases the artwork
3. **Copy the link** by:
   - **Mobile**: Tap the three dots (...) → Copy Link
   - **Desktop**: Click the three dots (...) → Copy Link
4. **The URL will look like**: `https://www.instagram.com/p/ABC123DEF456/`

### Step 2: Add Videos to Your Artworks

1. **Open the file**: `src/data/artworks.ts`
2. **Find the artwork** you want to add a video to
3. **Add the video field** like this:

```typescript
{
  id: 1,
  title: "Wanted for Racing Life",
  series: "Mugshot Collection",
  image: "/images/artworks/Fabian PhiL Wanted for Racing Life 2024 B&W.jpg",
  video: "https://www.instagram.com/p/YOUR_ACTUAL_VIDEO_ID/", // Replace with your Instagram URL
  year: "2024",
  // ... rest of the artwork data
}
```

### Step 3: Video Features Available

✅ **Instagram Video Embedding** - Videos play directly in the website
✅ **Fullscreen Mode** - Click to expand videos
✅ **Mobile Responsive** - Works on all devices
✅ **Video Controls** - Play, pause, mute, fullscreen
✅ **External Link** - Option to open in Instagram
✅ **Artwork Details** - Shows title, series, year below video

### Step 4: Recommended Videos to Add

**Priority artworks for videos:**
1. **Moving Hair Collection** - Show the kinetic movement
2. **100 USD Bill Collection** - Display the tryptic structure
3. **Luminous Vision Collection** - Demonstrate the glowing effect
4. **Digital Fusion Collection** - Show the mixed media process
5. **Mugshot Collection** - Display the LED lighting effects

### Step 5: Video Quality Tips

- **Use high-quality videos** that show the artwork clearly
- **Keep videos under 60 seconds** for better loading
- **Show different angles** of the artwork
- **Include close-ups** of interesting details
- **Demonstrate special effects** (LED, movement, glowing)

### Example Video URLs to Replace:

```typescript
// Current placeholder URLs (replace these):
video: "https://www.instagram.com/p/example1/" // Wanted for Racing Life
video: "https://www.instagram.com/p/example2/" // Old Man in Peace  
video: "https://www.instagram.com/p/example3/" // 100 USD Mick Jagger

// Replace with your actual Instagram URLs:
video: "https://www.instagram.com/p/ABC123DEF456/" // Your actual video
```

### Step 6: Test Your Videos

1. **Save the file** after adding video URLs
2. **Refresh your website** (http://localhost:3000)
3. **Click on an artwork** with a video
4. **Click the video button** (play icon) to test
5. **Verify the video plays** correctly

### Troubleshooting

**Video not playing?**
- Check the Instagram URL is correct
- Make sure the post is public
- Try refreshing the page

**Video not showing?**
- Verify you added the `video:` field correctly
- Check for typos in the URL
- Make sure the artwork has `isVideo: true`

**Need help?**
- The video player automatically detects Instagram URLs
- Videos will embed directly from Instagram
- No need to download or upload videos

---

## 🎬 Video Player Features

### For Art Collectors:
- **Professional presentation** of your kinetic artworks
- **Easy sharing** with potential buyers
- **Mobile-friendly** viewing experience
- **Fullscreen mode** for detailed examination

### For Your Art Business:
- **Showcase movement** and special effects
- **Demonstrate value** of kinetic art
- **Professional gallery** experience
- **Easy updates** by just changing URLs

**Ready to add your Instagram videos? Start with your most impressive kinetic artworks!**





