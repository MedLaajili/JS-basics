const app = ()=>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelector('time-select button');
    // Get the length of the outline
    const outlineLength = outline.getTotalLength();

    //Duration
    let fakeDuration = 600;

        outline.style.strokeDasharray = outlineLength;
        outline.style.strokeDashoffset = outlineLength;

    //create a function specific to stop and play the sounds
    const checkPlaying = song =>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src ='./svg/play.svg';
        }
    };


    //Pick different sounds 
    sounds.forEach(sound =>{
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkplaying(song);
        })
    })
    //play sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    //select sound
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
            fakeDuration = this.getAttribute('data-time');
            timeDisplay.textContent = `${math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
        });
    });
    

    // we can animate the circle
    song.ontimeupdate = () => {
        let cirrentTime = song.currentTime;
        let elapsed = fakeDuration-currentTime;
        let seconds = math.floor(elapsed % 60);
        let minutes = math.floor(elapsed / 60);

        //animate the circle
        let progress = outlineLength -(currentTime/fakeDuration)*outlineLength;
        outline.style.strokeDashoffset = progress;
        //animate the text
        timeDisplay.textContent =`${minutes}:${seconds}`;

        if (currentTime>= fakeDuration){
            song.pause();
            song.currentTime=0;
            play.src="./svg/play.svg";
            video.pause();
        }
    };
    
};

app();
