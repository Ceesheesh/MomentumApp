let logoff = document.getElementById('sign_out');
logoff.addEventListener('click', function(){
    clearStorage();
    window.location.reload();
})  

function clearStorage() {
    localStorage.clear();
  }

  console.log(logoff)