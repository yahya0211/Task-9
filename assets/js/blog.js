// inisiasi array kosong
let dataProjects = [];

// buat function object

function addProject(event) {
  event.preventDefault();

  let projectTittle = document.getElementById("project-id").value;
  let descriptionContent = document.getElementById("desc").value;
  let dateContentStart = new Date(document.getElementById("date-start").value);
  let dateContentEnd = new Date(document.getElementById("date-end").value);

  let postAt = new Date();

  let dataProject = {
    dateContentStart,
    dateContentEnd,
    projectTittle,
    postAt,
    descriptionContent,
  };

  if (projectTittle == "") {
    return alert("please type your project");
  } else if (dateContentStart == "") {
    return alert("please insert your start date project");
  } else if (dateContentEnd == "") {
    return alert("please insert your end date project");
  } else if (descriptionContent == "") {
    return alert("please type your description project");
  }

  dataProjects.push(dataProject);
  console.log(dataProjects);

  renderProject();
}

function renderProject() {
  document.getElementById("container-id").innerHTML = "";

  for (let i = 0; i < dataProjects.length; i++) {
    let durationString = getDurationDate(dataProjects[i].postAt, dataProjects[i].dateContentStart, dataProjects[i].dateContentEnd);
    document.getElementById("container-id").innerHTML += `
    
        <div class="card">
          <img src="assets/img/technology.jpg" style="width: 50%" />
          <div class="tittle-project">
           <a href="blog-isi.html"> 
            <h2>${dataProjects[i].projectTittle}</h2>
          </a>
          </div>
          <div class="date" style = "color :gray">duration : ${durationString} </div>
          <div class="description">${dataProjects[i].descriptionContent}</div>
          <div class="image-grup">
            <img src="assets/img/project-tech/next.png" style="width: 5%" />
            <img src="assets/img/project-tech/library.png" style="width: 5%" />
            <img src="assets/img/project-tech/node-js.png" style="width: 5%" />
            <img src="assets/img/project-tech/typescript.png" style="width: 5%" />
          </div>
          <div class="btn-group">
            <button>edit</button>
            <button type ="button" >delete</button>
          </div>
        </div>`;
  }
}

function getDurationDate(postAt, dateContentStart, dateContentEnd) {
  let distanceDuration = dateContentEnd - dateContentStart;

  // Format milisecond to distance day

  let yearMonth = 12;
  let monthWeek = 4;
  let weekDay = 7;
  let dayHour = 24;
  let hourMinute = 60;
  let minuteSecond = 60;
  let secondMilisecond = 1000;

  let oneYear = yearMonth * monthWeek * weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneMonth = monthWeek * weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneWeek = weekDay * dayHour * hourMinute * minuteSecond * secondMilisecond;
  let oneDay = dayHour * hourMinute * minuteSecond * secondMilisecond;

  let durationYear = Math.floor(distanceDuration / oneYear);
  let durationMonth = Math.floor(distanceDuration / oneMonth);
  let durationWeek = Math.floor(distanceDuration / oneWeek);
  let durationDay = Math.floor(distanceDuration / oneDay);

  if (durationDay < 7) {
    return `${durationDay} day`;
  } else if (durationDay <= 7) {
    return `${durationWeek} Week`;
  } else if (durationWeek <= 4) {
    return `${durationMonth} Month`;
  } else if (durationMonth <= 12) {
    return `${durationMonth} Month`;
  } else {
    return `${durationYear} Year`;
  }
}
