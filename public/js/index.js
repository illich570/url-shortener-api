const postUrl = async () => {
  const data ={
    url: document.getElementById('url-input').value
  }

  const postData = await fetch('/api/shorturl/new',
  {
    method: "POST",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
   const response = await postData.json();
   const modal = document.getElementById('modal');
   const buttonModal = document.getElementsByClassName('close')[0];
   const dataModal = document.getElementById('modal-data');
   if(response.error){
     dataModal.textContent = `Eror en el guardado de datos, conexión incorrecta o URL invalida, intente de nuevo`;
   }else{
    dataModal.textContent = `Guardado exitoso, la url valida almacenada es: ${response.original_url}
      y su id es ${response.short_url}, pruebalo en la url!`;  
   }

   modal.classList.add('active');
   buttonModal.onclick = () => modal.classList.remove('active')
   window.onclick = (event) => event.target == modal ? modal.classList.remove('active') : '';
}