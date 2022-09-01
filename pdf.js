const form = document.getElementById("form")
const commentsDIV = document.getElementById("comments")
const pdfCheckBox = document.getElementById("pdfCheckbox")
const txtCheckBox = document.getElementById("txtCheckbox")
const saveButton = document.getElementById("saveButton")

let state = []

form.addEventListener('keypress',(e) => {
  if(e.key === 'Enter'){
    e.preventDefault()
    const value = form['value'].value
    if(!value){
      alert('Please type something')
    }
    state.push({value})
    form['value'].value = ''
    eventFunction.render()
  }
})

saveButton.onclick = (e) => {
  e.preventDefault()
  if(pdfCheckBox.checked){
    eventFunction.toPdf()
  }else if(txtCheckBox.checked){
    eventFunction.toTxt()
  } else{
    alert('I cant download anything if you dont choose')
  }
}



const eventFunction = {
  render: () => {
    let comments = ''
    state.forEach( comment => {
      comments += `
        <div>${comment.value}</div>
      `
    })
    commentsDIV.innerHTML = comments
  },
  toPdf: () => {
    let opt = {
      margin:       0,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait'},
    }
    html2pdf().from(commentsDIV).set(opt).save();
  },

  toTxt: () => {
    let blob = new Blob([JSON.stringify(state)], {type:'text/plain'})
    saveAs(blob, 'mentes')
  }
}




        
