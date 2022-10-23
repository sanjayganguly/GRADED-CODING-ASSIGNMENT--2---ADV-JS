import "./styles.css";
import data from "../data/Data.json";

let contentEl = document.querySelector("#data");
let nameElement = document.querySelector("#name");
let positionElement = document.querySelector("#position");

const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const search = document.querySelector("#search");
const errorEl = document.querySelector("#error");
const disp = document.querySelector("#disp");

const piEl = document.querySelector("#pi");
const tsEl = document.querySelector("#ts");
const hobbiesEl = document.querySelector("#hobbies");

let transformedData = data.resume;

search.addEventListener("input", function () {
  //if (this.value.length > 2)
  //console.log(this.value, data.resume.length, "length");
  currentResumeIndex = 0;
  const t = this.value;
  if (t === "") {
    transformedData = data.resume;
  } else {
    transformedData = data.resume.filter(function (resume, index) {
      console.log(
        resume.basics.AppliedFor,
        t,
        resume.basics.AppliedFor.indexOf(t)
      );
      return resume.basics.AppliedFor.toLowerCase().indexOf(t) > -1;
    });
    console.log(transformedData);
  }
  if (transformedData.length === 0) {
    errorEl.style.display = "block";
    disp.style.display = "none";
  } else {
    errorEl.style.display = "none";
    disp.style.display = "block";
  }
  console.log(transformedData);
  updateUI();
});

prevBtn.addEventListener("click", function () {
  if (currentResumeIndex > 0) {
    currentResumeIndex--;
    updateUI();
  }
});
nextBtn.addEventListener("click", function () {
  if (currentResumeIndex < transformedData.length - 1) {
    currentResumeIndex++;
    updateUI();
  }
});
let currentResumeIndex = 0;

function displayBtns() {
  if (currentResumeIndex === 0) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline";
  } else if (currentResumeIndex === transformedData.length - 1) {
    prevBtn.style.display = "inline";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "inline";
    nextBtn.style.display = "inline";
  }
}

function updateUI() {
  let currentResume = transformedData[currentResumeIndex];
  let template = `<div>

    <h3>Work experience in previous company</h3>
  
    <b>Company name:</b>${currentResume?.work["Company Name"]}<br/>
  
    <b>Position:</b>${currentResume?.work.Position}<br/>
  
    <b>Start Date:</b>${currentResume?.work["Start Date"]}<br/>
  
    <b>End Date:</b>${currentResume?.work["End Date"]}<br/>
  
    <p>
    <b>Summary:</b>${currentResume?.work.Summary}<br/>
    </p>
  
    <h3>Projects</h3>
  
    <b>${currentResume?.projects.name}</b>: ${
    currentResume?.projects.description
  }
    <h3>Education</h3>
  
    <b>UG:</b>${
      currentResume?.education.UG.institute +
      " " +
      currentResume?.education.UG.course +
      " " +
      currentResume?.education.UG["Start Date"] +
      " " +
      currentResume?.education.UG["End Date"] +
      " " +
      currentResume?.education.UG.cgpa
    }<br/>
  
    <b>PU:</b>${
      currentResume?.education["Senior Secondary"].institute +
      " " +
      currentResume?.education["Senior Secondary"].cgpa
    }<br/>
  
    <b>High School:</b>${
      currentResume?.education["High School"].institute +
      " " +
      currentResume?.education["High School"].cgpa
    }
    <h3>Internships</h3>
  
    <b>Company name:</b>${currentResume?.Internship["Company Name"]}<br/>
  
    <b>Position:</b>${currentResume?.Internship.Position}<br/>
  
    <b>Start Date:</b>${currentResume?.Internship["Start Date"]}<br/>
  
    <b>End Date:</b>${currentResume?.Internship["End Date"]}<br/>
    <p>
    <b>Summary:</b>${currentResume?.Internship.Summary}<br/>
    </p>
  
    <h3>Achievements</h3>
    ${currentResume?.achievements.Summary}
  
    </div>`;
  nameElement.innerText = currentResume?.basics.name;
  positionElement.innerText = currentResume?.basics.AppliedFor;
  contentEl.innerHTML = template;
  piEl.innerHTML = `${currentResume?.basics.phone}<br/>${currentResume?.basics.email}<br/>${currentResume?.basics.profiles.url}`;
  tsEl.innerHTML = getkeywords(currentResume); //`${currentResume?.skills.keywords[0]}<br/>${currentResume?.skills.keywords[1]}<br/>${currentResume?.skills.keywords[2]}`;
  hobbiesEl.innerHTML = getHobbies(currentResume); //`${currentResume?.interests.hobbies[0]}<br/>${currentResume?.interests.hobbies[1]}<br/>${currentResume?.interests.hobbies[2]}`;
  displayBtns();
}
updateUI();

function getkeywords(currentResume) {
  
  return currentResume?.skills.keywords.join("<br/>");
}

function getHobbies(currentResume) {
  
  return currentResume?.interests.hobbies.join("<br/>");
}
