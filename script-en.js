
window.onload = function () {
    CKEDITOR.replace('leftTextArea', {
        // Load the German interface.
        language: 'en'
    });
    CKEDITOR.replace('rightTextArea', {
        // Load the German interface.
        language: 'en'
    });


    // const langEl = document.querySelector('.langWrap');
    //     const container = document.querySelector('.container');
    //     const link = document.querySelectorAll('a');
    //     const langLabel = document.querySelector('.langLabel');

    //     const pasteLabel = document.querySelector('#pasteLabel');
    //     const typeLabel = document.querySelector('#typeLabel');

    //     const startButton = document.querySelector('#startButton');


    //     link.forEach(el=>{
    //         el.addEventListener('click',()=>{
    //             const attr= el.getAttribute('language');

    //             langLabel.textContent = data[attr].lan;
    //             container.setAttribute("dir",data[attr].dir);

    //             pasteLabel.textContent = data[attr].pastHere;
    //             typeLabel.textContent = data[attr].typeHere;

    //             startButton.textContent = data[attr].typeHere;
    //         });
    //     });


    //     var data={

    //         "english":{
    //             "dir":"ltr",
    //             "lan":"Language",
    //             "startMemo":"Start Memorizing",
    //             "pastHere":"Paste here:",
    //             "typeHere":"Type here:",
    //             "showPaste":"Show Paste Text"
    //         },
    //         "arabic":{
    //             "dir":"rtl",
    //             "lan":"اللغة",
    //             "startMemo":"ابدأ في الحفظ",
    //             "pastHere":"الصق هنا:",
    //             "typeHere":"أكتب هنا:",
    //             "showPaste":"إظهار النص"
    //         }

    //     };


};


function startProcessing() {


    if (typeof startProcessing.isShown == 'undefined') {
        startProcessing.isShown = true;
    }

    var pastTextArea = CKEDITOR.instances.leftTextArea;    //document.getElementById("leftTextArea");
    var startButton = document.getElementById("startButton");
    var typingTextArea = CKEDITOR.instances.rightTextArea;//document.getElementById("rightTextArea");
    var wordRD = document.getElementById("word");

    if (startProcessing.isShown) {

        startProcessing.isShown = false;

        var text2 = pastTextArea.getData();
        var dom2 = document.createElement("DIV");
        dom2.innerHTML = text2;

        startProcessing.pastText = (dom2.textContent || dom2.innerText);


        //startProcessing.pastText = pastTextArea.editable().getText();



        //delete string from text area
        // pastTextArea.value = "";
        document.getElementById("cke_" + "leftTextArea").style.display = 'none';
        //pastTextArea.style.display = "none";

        startButton.innerText = "Show Paste Text"


        if (wordRD.checked) {
            typingTextArea.removeListener("change", checkSent);
            typingTextArea.on("change", checkWords);
        } else {
            var characterFiled = document.getElementById("characterFiled");
            if (characterFiled.value.length > 0) {
                typingTextArea.removeListener("change", checkWords);
                typingTextArea.on("change", checkSent);
            }else{
                typingTextArea.removeListener("change", checkSent);
                typingTextArea.on("change", checkWords);
            }

        }



    } else {

        startProcessing.isShown = true;
        // pastTextArea.value = startProcessing.pastText

        document.getElementById("cke_" + "leftTextArea").style.display = 'block'; //pastTextArea.style.display = "block";
        startButton.innerText = "Start Memorizing"

        if (wordRD.checked) {
            typingTextArea.removeListener("change", checkWords);
        } else {
            typingTextArea.removeListener("change", checkSent);
        }
    }


}

function checkWords() {

    var typingTextArea = CKEDITOR.instances.rightTextArea; //document.getElementById("rightTextArea");

    var text1 = typingTextArea.getData();
    var dom1 = document.createElement("DIV");
    dom1.innerHTML = text1;
    var typingText = (dom1.textContent || dom1.innerText);
    typingText = typingText.slice(0, -1);

    //var typingText = typingTextArea.editable().getText();


    var endSpace = /\s$/;
    var isSpace = endSpace.test(typingText); //typingText.endsWith(" ");
    console.log(typingText);
    console.log(isSpace);
    console.log("checkWords");


    if (isSpace) {
        console.log("isSpace");


        var pastTextArr = startProcessing.pastText.trim().split(/(\s+)/);
        var typingTextArr = typingText.trim().split(/(\s+)/);
        var i = typingTextArr.length - 1;//index of last typing word

        console.log("typingTextArr[i]");
        console.log(typingTextArr[i]);

        if (pastTextArr[i] === typingTextArr[i]) {
            console.log("correct");
        } else {
            typingTextArea.removeListener("change", checkWords);

            console.log("wrong");
            //remove last word from typing textarea
            //var temp =  typingText.trim().replace(/\w+[.!?]?$/, '');
            // var tempArr = temp.split(" ");
            // tempArr.pop();
            // temp = tempArr.join(" ");
            // console.log(temp);


            var text3 = typingTextArea.getData();
            var dom3 = document.createElement("DIV");
            dom3.innerHTML = text3;
            var temp = (dom3.textContent || dom3.innerText);
            temp = temp.slice(0, -1);

            // var temp = typingTextArea.editable().getText();
            var lastIndex = temp.lastIndexOf(typingTextArr[i]);


            // var isNewLine = false;

            // if (lastIndex < 0) {
            //     lastIndex = temp.lastIndexOf('\n');
            //     isNewLine = true;

            // }

            console.log(lastIndex);
            temp = temp.substring(0, lastIndex);

            console.log(temp);
            typingTextArea.setData("", function () {
                typingTextArea.focus();
                typingTextArea.insertText(temp + "");
                typingTextArea.on("change", checkWords);
            });

            // if (!isNewLine) {
            //     typingTextArea.setData("", function () {
            //         typingTextArea.focus();
            //         typingTextArea.insertText(temp + " ");
            //         typingTextArea.on("change", checkWords);
            //     });
            // }else{
            //     typingTextArea.setData("", function () {
            //         typingTextArea.focus();
            //         typingTextArea.insertText(temp + "");
            //         typingTextArea.on("change", checkWords);
            //     });

            // }




        }



    }



}

function displayInputFiled() {

    var charDiv = document.getElementById("charDiv");
    var wordRD = document.getElementById("word");

    if (wordRD.checked) {
        console.log("checked");
        charDiv.style.display = "none";
    } else {
        charDiv.style.display = "block";
        console.log("unchecked");
    }

}




function checkSent() {


    console.log("checkSent");
    var typingTextArea = CKEDITOR.instances.rightTextArea; //document.getElementById("rightTextArea");

    var text1 = typingTextArea.getData();
    var dom1 = document.createElement("DIV");
    dom1.innerHTML = text1;
    var typingText = (dom1.textContent || dom1.innerText);
    typingText = typingText.slice(0, -1);

    //var typingText = typingTextArea.editable().getText();

    var characterFiled = document.getElementById("characterFiled");

    var isSpace = false;
    var endSpace = "";
    if (characterFiled.value.length <= 0) {

        endSpace = /\s$/;
        isSpace = endSpace.test(typingText);
    } else {
        endSpace = characterFiled.value;
        isSpace = typingText.endsWith(endSpace);
    }


    console.log(endSpace);
    console.log(typingText);
    console.log(isSpace);


    if (isSpace) {
        console.log("isSpace");


        var pastTextArr = startProcessing.pastText.trim().split(endSpace);
        var typingTextArr = typingText.trim().split(endSpace);

        var i = typingTextArr.length - 2;//index of last typing word
        // if (endSpace === /\s$/) {
        //     pastTextArr = startProcessing.pastText.trim().split(endSpace);
        //     typingTextArr = typingText.trim().split(endSpace);
        //     i = typingTextArr.length - 1;//index of last typing word

        // } else {
        //     i = typingTextArr.length - 2;//index of last typing word
        // }


        console.log(typingTextArr);
        console.log(pastTextArr);
        console.log(i);
        console.log("typingTextArr[i]");
        console.log(typingTextArr[i]);

        console.log("pastTextArr[i] ");
        console.log(pastTextArr[i]);

        if (pastTextArr[i].trim() === typingTextArr[i].trim()) {
            console.log("correct");
        } else {
            typingTextArea.removeListener("change", checkSent);

            console.log("wrong");
            //remove last word from typing textarea
            //var temp =  typingText.trim().replace(/\w+[.!?]?$/, '');
            // var tempArr = temp.split(" ");
            // tempArr.pop();
            // temp = tempArr.join(" ");
            // console.log(temp);


            var text3 = typingTextArea.getData();
            var dom3 = document.createElement("DIV");
            dom3.innerHTML = text3;
            var temp = (dom3.textContent || dom3.innerText);
            temp = temp.slice(0, -1);

            // var temp = typingTextArea.editable().getText();
            var lastIndex = temp.lastIndexOf(typingTextArr[i]);


            // var isNewLine = false;

            // if (lastIndex < 0) {
            //     lastIndex = temp.lastIndexOf('\n');
            //     isNewLine = true;

            // }

            console.log(lastIndex);
            temp = temp.substring(0, lastIndex);

            console.log(temp);
            typingTextArea.setData("", function () {
                typingTextArea.focus();
                typingTextArea.insertText(temp + "");
                typingTextArea.removeListener("change", checkWords);
                typingTextArea.on("change", checkSent);
            });

            // if (!isNewLine) {
            //     typingTextArea.setData("", function () {
            //         typingTextArea.focus();
            //         typingTextArea.insertText(temp + " ");
            //         typingTextArea.on("change", checkWords);
            //     });
            // }else{
            //     typingTextArea.setData("", function () {
            //         typingTextArea.focus();
            //         typingTextArea.insertText(temp + "");
            //         typingTextArea.on("change", checkWords);
            //     });

            // }




        }



    }



}