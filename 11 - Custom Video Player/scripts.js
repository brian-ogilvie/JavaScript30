// get elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('input[type="range"]');

// build out functions
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
  updatePlayButton();
}

function updatePlayButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
  const amount = this.dataset.skip;
  video.currentTime += parseFloat(amount);
}

function updateProgressBar() {
  const currentProgress = 100 * video.currentTime/video.duration;
  progressBar.style.flexBasis = `${currentProgress}%`;
}

let rangeMouseDown = false;
function handleRangeUpdate(e) {
  if (e.type === 'mousemove' && !rangeMouseDown) {return;}
  const {name, value} = this;
  video[name] = value;
}

let progressMouseDown = false;
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('play', updatePlayButton);
video.addEventListener('timeupdate', updateProgressBar);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
  range.addEventListener('mousemove', handleRangeUpdate);
  range.addEventListener('mousedown', () => rangeMouseDown = true);
  range.addEventListener('mouseup', () => rangeMouseDown = false);
});
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => progressMouseDown && scrub(e));
progress.addEventListener('mousedown', () => progressMouseDown = true);
progress.addEventListener('mouseup', () => progressMouseDown = false);
