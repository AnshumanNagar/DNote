function allNote_Clicked(){
    document.getElementById("allNotes_Btn").style.backgroundColor = "black";
    document.getElementById("allNotes_Btn").style.color = "white";
    document.getElementById("favNotes_Btn").style.backgroundColor = "#EFEFEF";
    document.getElementById("favNotes_Btn").style.color = "black";

    document.getElementById("all_Screen").style.display = "block";
    document.getElementById("fav_Screen").style.display = "none";

    document.getElementById("addNote_Btn").style.visibility = "visible";
}

function favNote_Clicked(){
    document.getElementById("favNotes_Btn").style.backgroundColor = "black";
    document.getElementById("favNotes_Btn").style.color = "white";
    document.getElementById("allNotes_Btn").style.backgroundColor = "#EFEFEF";
    document.getElementById("allNotes_Btn").style.color = "black";

    document.getElementById("all_Screen").style.display = "none";
    document.getElementById("fav_Screen").style.display = "block";

    document.getElementById("addNote_Btn").style.visibility = "hidden";
}

var noteCount = 0;

setInterval(countCheck, 1);

function countCheck(){
    if(noteCount == 0){
        document.getElementById("info_Line").style.display = "block";
    }
    if(noteCount > 0){
        document.getElementById("info_Line").style.display = "none";
    }
}

var favNoteCount = 0;

setInterval(favCountCheck, 1);

function favCountCheck(){
    if(favNoteCount == 0){
        document.getElementById("info_Line2").style.display = "block";
    }
    if(favNoteCount > 0){
        document.getElementById("info_Line2").style.display = "none";
    }
}

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
const favNotes = JSON.parse(localStorage.getItem("favNotes") || "[]");

function loadNotes(){
    console.log(notes);
    document.querySelectorAll(".noteDiv").forEach(note => note.remove());
    document.querySelectorAll(".br").forEach(note => note.remove());
    noteCount = notes.length;
    notes.forEach((note, index) =>{
        var titleForCLick = note.title;
        var contentForClick = note.content;

        let adjecentHTML = `<div class="noteDiv">
                                <h4 class="noteTitle">${note.title}</h4>
                                <hr>
                                <p class="noteContent">${note.content}</p>
                                <hr>
                                <div class="function_Sec">
                                    <h5 class="noteDate">${note.date}</h5>
                                    <div class="btns_Sec">
                                        <button class="delete_Btn" onclick="deleteNote(${index})"><i class="bi-trash"></i></button>
                                        <button class="makeFav_Btn" onclick="makeFavourite(\'${titleForCLick.replaceAll('"', "'")}\', \'${contentForClick.replaceAll('"', "'")}\')"><i class="bi-heart"></i></button>
                                    </div>
                                </div>
                            </div>
                            <br class="br">`;
        document.getElementById("all_Screen").insertAdjacentHTML("beforeend", adjecentHTML);
    });
}

function favLoadNotes(){
    console.log(favNotes);
    document.querySelectorAll(".favNoteDiv").forEach(favNote => favNote.remove());
    document.querySelectorAll(".br2").forEach(favNote => favNote.remove());
    favNoteCount = favNotes.length;
    favNotes.forEach((favNote, favIndex) =>{
        let adjecentHTML2 = `<div class="favNoteDiv">
                                <h4 class="favNoteTitle">${favNote.title}</h4>
                                <hr>
                                <p class="favNoteContent">${favNote.content}</p>
                                <hr>
                                <div class="favFunction_Sec">
                                    <h5 class="favNoteDate">${favNote.date}</h5>
                                    <div class="favBtns_Sec">
                                        <button class="favDelete_Btn" onclick="favDeleteNote(${favIndex})"><i class="bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                            <br class="br2">`;
        document.getElementById("fav_Screen").insertAdjacentHTML("beforeend", adjecentHTML2);
    });
}

function deleteNote(noteId){
    console.log(noteId)
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes)); 
    loadNotes();
}

function favDeleteNote(favNoteId){
    console.log(favNoteId);
    favNotes.splice(favNoteId, 1);
    localStorage.setItem("favNotes", JSON.stringify(favNotes));
    favLoadNotes();
}

function makeFavourite(favTitle, favContent){
    loadNotes();
    const today = new Date();
    var favDate = today.toLocaleString('en-us', {weekday: 'long' }) + ", " + today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    
    let favNoteInfo = {
        title: favTitle,
        content: favContent,
        date: favDate
    }

    favNotes.push(favNoteInfo);
    localStorage.setItem("favNotes", JSON.stringify(favNotes));
    favLoadNotes();
}

function add_Clicked(){
    var titleCheckInput = document.getElementById("noteTitle_Input").value;
    var contentCheckInput = document.getElementById("noteContent_Input").value;
    if(titleCheckInput == "" || contentCheckInput == ""){
        document.getElementById("add_Btn").setAttribute("data-dismiss", "");
        document.getElementById("modal_Msg").style.display = "block";
    }else{
        document.getElementById("modal_Msg").style.display = "none";
        document.getElementById("add_Btn").setAttribute("data-dismiss", "modal");

        noteCount += 1;

        var title = document.getElementById("noteTitle_Input").value;
        var content = document.getElementById("noteContent_Input").value;

        const today = new Date();
        var date = today.toLocaleString('en-us', {weekday: 'long' }) + ", " + today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear(); 
        
        var allScreen = document.getElementById("all_Screen");
        var br = document.createElement("br");
        br.className = "br";
        var hr1 = document.createElement("hr");
        var hr2 = document.createElement("hr");

        var noteDiv = document.createElement("div");
        noteDiv.className = "noteDiv";

        var noteTitle = document.createElement("h4");
        noteTitle.className = "noteTitle";
        noteTitle.innerHTML = title;

        var noteContent = document.createElement("p");
        noteContent.className = "noteContent";
        noteContent.innerHTML = content;

        var functionSec = document.createElement("div");
        functionSec.className = "function_Sec";

        var noteDate = document.createElement("h5");
        noteDate.className = "noteDate";
        noteDate.innerHTML = date;

        var btnsSec = document.createElement("div");
        btnsSec.className = "btns_Sec";

        var deleteBtn = document.createElement("button");
        deleteBtn.className = "delete_Btn";
        deleteBtn.setAttribute("onclick", "deleteNote()");
        var deleteBtnIcon = document.createElement("i");
        deleteBtnIcon.className = "bi bi-trash";

        var makeFavBtn = document.createElement("button");
        makeFavBtn.setAttribute("onclick", "makeFavourite()");
        makeFavBtn.className = "makeFav_Btn";
        var makeFavBtnIcon = document.createElement("i");
        makeFavBtnIcon.className = "bi-heart";

        deleteBtn.appendChild(deleteBtnIcon);
        makeFavBtn.appendChild(makeFavBtnIcon);

        btnsSec.appendChild(deleteBtn);
        btnsSec.appendChild(makeFavBtn);

        functionSec.appendChild(noteDate);
        functionSec.appendChild(btnsSec);

        noteDiv.appendChild(noteTitle);
        noteDiv.appendChild(hr1);
        noteDiv.appendChild(noteContent);
        noteDiv.appendChild(hr2);
        noteDiv.appendChild(functionSec);

        allScreen.appendChild(noteDiv);
        allScreen.appendChild(br);

        document.getElementById("noteTitle_Input").value = "";
        document.getElementById("noteContent_Input").value = "";

        let noteInfo = {
            title: noteTitle.innerHTML,
            content: noteContent.innerHTML,
            date: noteDate.innerHTML
        }

        notes.push(noteInfo);
        localStorage.setItem("notes", JSON.stringify(notes));

        loadNotes(); 
    }
}