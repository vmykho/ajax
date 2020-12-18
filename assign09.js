function clearCityTable()
{
    do {
        document.getElementById("cityTable").deleteRow(1);
    } while (document.getElementById("cityTable").rows.length > 0);
}

function getCities()
{
    var xhttpCountry = new XMLHttpRequest();
    xhttpCountry.onreadystatechange =
            function ()
            {

                if (this.readyState == 4 && this.status == 200)
                {
                    var dataString = this.responseText;
                    var replaceSpaces = dataString.replace(/\n/g, "    ");
                    var cityArray = replaceSpaces.match(/(\S+\s{0,1}\S+)/g);
                    var table = document.getElementById("cityTable");
                    var j = 1;
                    for (var i = 0; i < cityArray.length; i++)
                    {
                        var row = table.insertRow(j);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        cell1.innerHTML = cityArray[i];
                        cell2.innerHTML = cityArray[i + 1];
                        i++;
                        j++;
                    }
                }

            };
    var countryChoice = Number(document.getElementById('countrytxt').value);
    
    var cityTxt = 0;
    
    switch (countryChoice) {
        case 1:
            cityTxt = "usa.txt";
            break;
        case 2:
            cityTxt = "canada.txt";
            break;
        case 3:
            cityTxt = "mexico.txt";
            break;
        case 4:
            cityTxt = "russia.txt";
            break;
        default:
            cityTxt = "Invalid country";
            break;
    }

    xhttpCountry.open("GET", cityTxt, true);
    xhttpCountry.send(null);
}

function resetFileName() {
    
    document.getElementById('parseJSON').value = 'json.txt';
}

function validateFileName(fileName)
{
    if (fileName == "json.txt" || fileName == "json1.txt")
    { 
        document.getElementById('parseJSON').style.border = 'thin solid black';
    } 
    else
    {   
        document.getElementById('parseJSON').value = 'Invalid File Name';
        document.getElementById('parseJSON').style.border = 'thik solid red';
    }
}

function clearStudentTable()
{
    do {
        document.getElementById("studentTable").deleteRow(1);
    } while (document.getElementById("studentTable").rows.length > 0);
}

function getStudents()
{
    var xhttpStudents = new XMLHttpRequest();
    xhttpStudents.onreadystatechange =
            function ()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                   
                    
                    var parseStudent = JSON.parse(this.responseText);
                    
                    var table = document.getElementById("studentTable");
                    var j = 1;
    
                    for (var i = 0; i < parseStudent.students.length; i++)
                    {
                        var row = table.insertRow(j);
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
                        cell1.innerHTML = parseStudent.students[i].first;
                        cell2.innerHTML = parseStudent.students[i].last;
                        cell3.innerHTML = 
                                parseStudent.students[i].address.city + ", " +
                                parseStudent.students[i].address.state +  "  " +
                                parseStudent.students[i].address.zip;
                        cell4.innerHTML = parseStudent.students[i].major;
                        cell5.innerHTML = parseStudent.students[i].gpa;
                       
                        j++;
                    }
                }
            };
            
    var studentTxt = document.getElementById("parseJSON").value;
    var studentTxt2 = "../" + studentTxt;
    xhttpStudents.open("GET", studentTxt2, true);
    xhttpStudents.send(null);
}