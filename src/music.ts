export function playMusic() {
    const audio = new Audio('/news-sound.mp3');

    audio.play().catch(() => {
    })
}