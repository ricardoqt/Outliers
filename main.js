function triggerinputError(inputBoxArr, errorReportMsg, toggleableClass, timeoutInSeconds)
{

    document.getElementById('error-report').style.visibility = 'visible';
    document.getElementById('error-report').innerHTML = errorReportMsg;

    inputBoxArr.forEach((inputBox) =>
    {
        inputBox.querySelector('input').value = '';
        inputBox.style.animation = `shake ${timeoutInSeconds}s linear`;
        inputBox.classList.add(toggleableClass);
    });

    setTimeout(function() 
    {
        inputBoxArr.forEach((inputBox) =>
        {
            inputBox.style.animation = '';
            inputBox.classList.remove(toggleableClass);
        });
    }, timeoutInSeconds * 1000);
}

function setHandlers()
{
    document.getElementById('login_button').addEventListener('click', function(e)
    {
        e.preventDefault();
        var [usernameInputBox, passwordInputBox] = [document.querySelector('.input-box.username'), document.querySelector('.input-box.password')];
        var [username, password] = [usernameInputBox.querySelector('input').value, passwordInputBox.querySelector('input').value];
        if (! username) {triggerinputError([usernameInputBox, passwordInputBox], 'O campo de username está vazio', 'error', 0.5);}
        else if (! password) {triggerinputError([usernameInputBox, passwordInputBox], 'O campo de senha está vazio', 'error', 0.5);}
        else
        {
            (async () => {fetch("/auth/login/", {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, method: "POST", body: JSON.stringify({username: username, password: password})}).then(response => response.json()).then(data => 
            {
                if (data['success'] === undefined) {triggerinputError([usernameInputBox, passwordInputBox], 'Bad request, tente novamente', 'error', 0.5);}
                else if (! data['success'])
                {

                }
                else
                {
                    window.location.href = "/search.html";
                }
            });})();
        }
    });
}