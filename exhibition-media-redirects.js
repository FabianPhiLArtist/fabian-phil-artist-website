// Old exhibition, studio and press media filenames mapped to their SEO filenames.
const renames = [
    ["/images/exhibitions", "Alliance Francaise 1.jpeg", "fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-01.jpeg"],
    ["/images/exhibitions", "Alliance 4.jpg", "fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-04.jpg"],
    ["/images/exhibitions", "Alliance 5.jpg", "fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-05.jpg"],
    ["/images/exhibitions", "Alliance 6.jpg", "fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-06.jpg"],
    ["/images/exhibitions", "Alliance 7.jpg", "fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-07.jpg"],
    ["/images/exhibitions", "Alliance 8.jpg", "fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-08.jpg"],
    ["/images/exhibitions", "Alliance 9.jpg", "fabian-phil-alliance-francaise-dubai-beyond-the-gaze-2026-09.jpg"],
    ["/images/about", "Art Magazine picture.png", "fabian-phil-artmosphere-magazine-2024-feature.png"],
    ["/images/exhibitions", "DIFC Christies.jpg", "fabian-phil-difc-art-night-2025-christies.jpg"],
    ["/images/exhibitions", "DIFC Maybe I will see him.jpg", "fabian-phil-difc-art-night-2025-maybe-i-will-see-him-pop-art.jpg"],
    ["/images/exhibitions", "DIFC Wanted for Stealing the Blues 2.jpg", "fabian-phil-difc-art-night-2025-wanted-for-stealing-the-blues-pop-art.jpg"],
    ["/images/exhibitions", "DIFC Wanted Smoking Rock Star.jpg", "fabian-phil-difc-art-night-2025-wanted-smoking-rock-star-pop-art-01.jpg"],
    ["/images/exhibitions", "DIFC Wanted Smoking Rock Star 2.jpg", "fabian-phil-difc-art-night-2025-wanted-smoking-rock-star-pop-art-02.jpg"],
    ["/images/exhibitions", "DIFC you call this Art.jpg", "fabian-phil-difc-art-night-2025-you-call-this-art-pop-art.jpg"],
    ["/images/exhibitions", "Fabian Studio Dubai.jpg", "fabian-phil-artist-studio-dubai.jpg"],
    ["/images/exhibitions", "Noor 1.jpg", "fabian-phil-noor-royal-gallery-dubai-2026-01.jpg"],
    ["/images/exhibitions", "Noor 2.jpg", "fabian-phil-noor-royal-gallery-dubai-2026-02.jpg"],
    ["/images/exhibitions", "Noor 4.jpg", "fabian-phil-noor-royal-gallery-dubai-2026-04.jpg"],
    ["/images/exhibitions", "Noor 5.jpg", "fabian-phil-noor-royal-gallery-dubai-2026-05.jpg"],
    ["/images/exhibitions", "Noor 7.jpg", "fabian-phil-noor-royal-gallery-dubai-2026-07.jpg"],
    ["/images/exhibitions", "WAD_photos all paintings.jpg", "fabian-phil-world-art-dubai-2024-artworks.jpg"],
    ["/videos/exhibitions", "DIFC Christies.MOV", "fabian-phil-difc-art-night-2025-christies.mov"],
    ["/videos/exhibitions", "DIFC Opera Gallery.mov", "fabian-phil-difc-art-night-2025-opera-gallery.mov"],
    ["/videos/exhibitions", "Noor Gallery 1.mp4", "fabian-phil-noor-royal-gallery-dubai-2026-02.mp4"],
    ["/videos/exhibitions", "WAD24_exhibition catwalk.MOV", "fabian-phil-world-art-dubai-2024-exhibition-catwalk.mov"],
    ["/videos/exhibitions", "WAD24_exhibition May2024.MOV", "fabian-phil-world-art-dubai-2024-exhibition.mov"],
]

const encodeStrict = (value) =>
  encodeURIComponent(value).replace(/[!'()*]/g, (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`)

// Old paths are matched both as browsers usually send them (spaces as %20) and fully
// encoded ($ & ' as %24 %26 %27).
module.exports = renames.flatMap(([dir, from, to]) => {
  const destination = `${dir}/${to}`
  const sources = new Set([encodeURI(`${dir}/${from}`), `${dir}/${encodeStrict(from)}`])
  return [...sources].map((source) => ({ source, destination, statusCode: 301 }))
})
