
function Jukebox() {
	this.songs = [];
	this.currentSong = 0;
	this.music = document.getElementById("music");
	this.songTitle = document.getElementById("songTitle");
	this.controls = document.getElementById("controls");
	this.play = document.querySelector(".fa-play");
	this.pause = document.querySelector(".fa-pause");
	this.prev = document.querySelector(".fa-step-backward");
	this.next = document.querySelector(".fa-step-forward");
	this.jukeSong = document.getElementById("jukeSong");
	this.seekSlider = document.getElementById("seekSlider");
	this.volumeSlider = document.getElementById("volumeSlider");
	//this.options = document.getElementsByTagName("option");
	
	//this.loadSong();
	this.search = document.getElementById("search");
	this.art = document.getElementById("art");
	this.info = document.getElementById("info");
	this.artistName = document.getElementById("artistName");
	this.profile = document.getElementById("profile");
	this.trackPage = document.getElementById("trackPage");
	this.description = document.getElementById("description");
	this.genre = document.getElementById("genre");
	this.release = document.getElementById("release");
	

	let that = this;
	this.controls.addEventListener("click", function(event) {
		if(event.target == that.play) {
			music.play();
		} else if(event.target == that.pause) {
			music.pause();
		} else if(event.target == that.prev) {
			that.prevSong();
		} else if(event.target == that.next) {
			that.nextSong();
		}
	})

	SC.initialize( {
	  client_id: "fd4e76fc67798bfa742089ed619084a6",
	})
	
	SC.get("/tracks", {
	  		q: "commercial"
		}).then(function(response) {
			that.songs.push(...response);
			//that.songs = that.songs[that.currentSong].title;
			console.log(that.songs);
			that.selectList();
	  		//that.songs = response;
	  		that.loadSong();
	  		//this.songTitle.innerHTML = this.songs[this.currentSong].title;
		}) .then(function() {
	  		that.playSong();	  	
	})


	this.jukeSong.addEventListener("change", function() {
		that.selectSong();
	})
	
	this.seekSlider.addEventListener("change", function() {
		that.seek();
	})

	this.volumeSlider.addEventListener("change", function() {
		that.setVolume();
	})

//	this.music.on("finish", function() {
//		that.nextSong();
//	})

	//this.music.addEventListener("ended", function() {
	//	that.nextSong();

	//})
};

Jukebox.prototype.loadSong = function() {
	this.songTitle.innerHTML = this.songs[this.currentSong].title;
	this.art.style.backgroundImage = "url(" + this.songs[this.currentSong].artwork_url + ")";
	this.artistName.innerHTML = "Artist Name:  " + this.songs[this.currentSong].user.username;
	this.profile.innerHTML = "Profile:  " + this.songs[this.currentSong].user.permalink_url;
	this.trackPage.innerHTML = "Track Page:  " + this.songs[this.currentSong].permalink_url;
	this.description.innerHTML = "Description:  " + this.songs[this.currentSong].description;
	this.genre.innerHTML = "Genre:  " + this.songs[this.currentSong].genre;
	this.release.innerHTML = "Release Date:  " + this.songs[this.currentSong].release_month + "/" + this.songs[this.currentSong].release_day + "/" + this.songs[this.currentSong].release_year;
}
	//this.music.volume = 0.1;
	//}

Jukebox.prototype.playSong = function() {
	if(this.songs[this.currentSong].music) {
		this.songs[this.currentSong].music.play();
		this.music.on("finish", function() {
		this.nextSong();
		})
	} else {
	SC.stream( "/tracks/"+ this.songs[this.currentSong].id ).then(function(response) {
 	this.music = response;
 	this.music.play();
  	//} .then(function() {
    this.music.on("finish", function() {
    this.nextSong();
    })
//})
	})
}
}

Jukebox.prototype.endSong = function() {
	if ((this.currentSong + 1) < this.songs.length) {
		this.nextSong();
	} else {
	 this.music.stop();
	}
}


Jukebox.prototype.prevSong = function() {
	this.currentSong = this.currentSong - 1
	if (this.currentSong < 0) {
		this.currentSong = this.songs.length - 1;
		} else {
			this.currentSong = this.currentSong;
		} 
		this.music.pause();
		this.loadSong();
		this.playSong();
}	


Jukebox.prototype.nextSong = function() {
	this.currentSong = (this.currentSong + 1) % this.songs.length;
	this.music.pause();
	this.loadSong();
	//this.music.play();
	this.playSong();
}

Jukebox.prototype.selectList = function() {	
	for (index in this.songs) {
		this.jukeSong.options[this.jukeSong.options.length] = new Option (this.songs[index].title, index);
	}
};


Jukebox.prototype.selectSong = function() {
	this.currentSong = this.jukeSong.options[this.jukeSong.selectedIndex].value;
	this.loadSong();
	this.playSong();
};

Jukebox.prototype.seek = function(){
	console.log(this.music.duration, this.seekSlider.value, this.music.currentTime);

	this.music.seek( this.music.currentTime() * this.seekSlider.value / 100);
	//currentTime.textContent = convertTime(this.music.currentTime);
};


Jukebox.prototype.setVolume = function() {
	console.log(this.volumeSlider.value);
   	this.music.setVolume(this.volumeSlider.value);
   	console.log(this.music.volume);
};
//function setVolume(volume) {
//	this.songVolume.addEventListener("change", function() {
//   	this.music.volume = volume;
//   	this.music.volume = 0.1;
//	})
//}

let myJukebox;

document.addEventListener("DOMContentLoaded", function() {
	myJukebox = new Jukebox(document.getElementById("jukebox"));
	
});

//	loadSong();
//	controls.addEventListener("click", function(event) {
//		if(event.target == play) {
//			music.play();
//		} else if(event.target == pause) {
//			music.pause();
//		} else if(event.target == prev) {
//			prevSong();
//		} else if(event.target == next) {
//			nextSong();
//		}
//	})
//});

//function selectList() {	
//	for (index in songs) {
//		chooseSong.options[chooseSong.options.length] = new Option (songs[index], index);
//	}
//}
//
//function selectSong() {
//	let chosenSong = jukeSong.options[jukeSong.selectedIndex].innerHTML;
//	currentSong = songs.indexOf(chosenSong);
//	loadSong();
//	music.play();
//}

//function loadSong() {
//	music.src = "music/" + songs[currentSong];
//	songTitle.innerHTML = songs[currentSong];
//	music.volume = 0.1;
//	//music.play();
//}

//function nextSong() {
//	currentSong = (currentSong + 1) % songs.length;
//	loadSong();
//	music.play();
//
//}

//function prevSong() {
//	currentSong = currentSong - 1
//	if (currentSong < 0) {
//		currentSong = songs.length - 1;
//		} else {
//			currentSong = currentSong;
//		} loadSong();
//		music.play();
//
//}


//play.addEventListener("click", function() {
//	music.play();
//
////	playPause.classList.remove("fa", "fa-play");
////	playPause.classList.add("fa", "fa-pause");
//
//
//})
//
//pause.addEventListener("click", function() {
//	music.pause();
//})
//
//next.addEventListener("click", function() {
//	nextSong();
//})
//
//prev.addEventListener("click", function() {
//	prevSong();
//})

//music.addEventListener("ended", function() {
//	if ((currentSong + 1)< songs.length) {
//		nextSong();
//		} else {
//		 music.stop();
//		}
//})
//
//function setVolume(volume) {
//   music.volume = volume;
//}







